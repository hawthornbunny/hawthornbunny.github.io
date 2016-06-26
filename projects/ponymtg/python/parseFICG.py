import mtgJson, re, sys
# coding=utf-8

# Given a text file containing a dump of card text from FanOfMostEverything's Friendship is Card Games posts, attempt to
# parse this into a structured format and output the result as JSON.

# Define a long dash, just so we don't have to keep copy-pasting it.
EM_DASH = '—'

# Use a global dictionary to keep track of meta-information about the set. There are some things, such as which cards
# transform into which others, that we can only determine by keeping track of previously-seen cards.

META = {}
META['previous_card_data_entry'] = None
META['previous_card_was_a_transformer'] = False
META['previous_card_was_reverse_side'] = False
META['set_name'] = 'Friendship is Card Games'

# When typos appear in the type line, this causes problems for the parser as it uses that line to determine where a card
# starts and ends. For this reason, we are going to perform simple text correction of known typos before processing the
# dump.
SPELLING_CORRECTIONS = {}
SPELLING_CORRECTIONS['Enchatment'] = 'Enchantment'

# Returns True if we can identify `line` as being a card's type line.
def is_type_line(line):
    # An empty line never matches.
    if line.strip() == '':
        return False

    # If the line exactly matches a number of well-known strings that we are sure will always indicate a type line, then
    # we will confirm this as being a type line.
    exact_strings = ['Artifact', 'Artifact — Equipment', 'Basic Land', 'Enchantment', 'Enchantment — Aura', 'World Enchantment', 'Instant', 'Instant — Trap', 'Land', 'Sorcery', 'Legendary Artifact', 'Legendary Enchantment', 'Legendary Instant', 'Legendary Land', 'Legendary Sorcery'] 
    if line in exact_strings:
        return True

    # If the line doesn't contain at least one of a small set of strings, then it is not a type line.
    type_words = ['Artifact', 'Basic', 'Creature', 'Enchantment', 'Instant', 'Land', 'Legendary', 'Planeswalker', 'Sorcery', 'Scheme', 'Plane', 'Conspiracy', 'Tribal', 'Snow']
    contains_type_word = False
    for type_word in type_words:
        if type_word in line:
            contains_type_word = True
            break
    if not contains_type_word:
        return False

    line_words = line.split()
    first_word_of_line = line_words[0]

    # If the line contains one of the type-relevant words, that's a good indication that this is the type line, but we 
    # still want more evidence (it might be card text that happens to begin with the word "Instant", for example). We
    # can now do some more checks to improve our confidence.

    # At this point, we'll check for the presence of a color indicator. A color indicator is a set of mana color symbols
    # (ie. W, U, B, R, G) enclosed in parentheses. If present, we expect this to be at the start of the type line.

    # The presence of a color indicator is a hint that this is the type line, but it is not conclusive enough for us to
    # make that judgement; only the type words can really clue us in. For this reason, we will disregard the color
    # indicator from our deliberations if we find one.

    color_indicator_regex = r'^\([WUBRG]+\) '
    line = re.sub(color_indicator_regex, '', line, 1, re.IGNORECASE)

    # If the first word is "Legendary", then it must be followed by one of a small set of strings. If it doesn't, this
    # is not a type line.
    # If the line contains the word "Legendary", then it must meet one of the following conditions:
    # - "Legendary" is succeeded by one of: Artifact, Creature, Enchantment, Instant, Land, Sorcery.
    if 'Legendary' in line:
        legendary_successors = ['Artifact', 'Creature', 'Enchantment', 'Instant', 'Land', 'Sorcery']
        
        contains_legendary_successor = False
        for legendary_successor in legendary_successors:
            if 'Legendary '+legendary_successor in line:
                contains_legendary_successor = True
                break
        if not contains_legendary_successor:
            return False

    # If the line contains the word "Snow", then it must meet one of the following conditions:
    # - "Snow" is succeeded by the word "Creature".
    # - "Snow" is succeeded by the word "Artifact".
    # - "Snow" is succeeded by the word "Enchantment".
    # - "Snow" is succeeded by the word "Land".
    if 'Snow' in line:
        if 'Snow Creature' not in line and 'Snow Artifact' not in line and 'Snow Enchantment' not in line and 'Snow Land' not in line and 'Snow Instant' not in line:
            return False
            
    # If the line contains the word "Tribal", then it must meet one of the following conditions:
    # - "Tribal" is succeeded by the word "Instant" and a long dash.
    # - "Tribal" is succeeded by the word "Sorcery" and a long dash.
    # - "Tribal" is succeeded by the word "Artifact" and a long dash.
    # - "Tribal" is succeeded by the word "Enchantment" and a long dash.
    if 'Tribal' in line:
        if 'Tribal Instant —' not in line and 'Tribal Sorcery —' not in line and 'Tribal Artifact —' not in line and 'Tribal Enchantment —' not in line:
            return False
            
    # If the line contains the word "Creature", then it must meet one of the following conditions:
    # - The word "Creature" must be followed by a long dash. We'll be a little lenient about this and say that there
    # doesn't have to be a space between "Creature" and the dash. This is due to the misprinted card "Chrysalis,
    # Changeling Queen", which has a minor error in its type line.
    if 'Creature' in line:
        if not 'Creature —' in line and not 'Creature—' in line:
            return False

    # If the line contains the word "Instant", then it must meet one of the following conditions:
    # - The line must contain only the word "Instant".
    # - The line must contain only the words "Legendary Instant".
    # - "Instant" must be preceded by "Tribal".
    # - "Instant" must be preceded by "Snow".
    # - The line must begin with a bracket, which means that it begins with a color indicator.
    # - The line must contain only the words "Trope Instant". ("Trope" is a custom supertype created by
    #   FanOfMostEverything).
    # - The line must contain a double slash (//), which indicates that this is a split card for which one of the
    #   halves is an Instant.
    if 'Instant' in line:
        if line not in ['Instant', 'Legendary Instant', 'Trope Instant'] and 'Tribal Instant' not in line and 'Snow Instant' not in line and '//' not in line:
            return False

    # If the line contains the word "Sorcery", then it must meet one of the following conditions:
    # - The line must contain only the word "Sorcery".
    # - The line must contain only the words "Legendary Sorcery".
    # - "Sorcery" must be preceded by "Tribal".
    # - "Sorcery" must be preceded by "Snow".
    # - The line must also contain a double slash (//), which indicates that this is a split card for which one of the
    #   halves is an Sorcery.
    if 'Sorcery' in line:
        if line not in ['Sorcery', 'Legendary Sorcery'] and 'Tribal Sorcery' not in line and 'Snow Sorcery' not in line and '//' not in line:
            return False

    # If the line contains the word "Enchantment", then it must meet one of the following conditions:
    # - The line contains only the word "Enchantment" and nothing else.
    # - "Enchantment" is preceded by the word "Legendary".
    # - "Enchantment" is preceded by the word "Snow".
    # - "Enchantment" is succeeded by the word "Creature".
    # - "Enchantment" is succeeded by the word "Artifact".
    # - "Enchantment" is succeeded by a long dash.
    # - The line begins with an open parenthesis ("("). This is to account for type lines that begin with a color
    #   indicator.
    if 'Enchantment' in line_words:
        if line != 'Enchantment' and 'Legendary Enchantment' not in line and 'Snow Enchantment' not in line and 'Enchantment Creature' not in line and 'Enchantment Artifact' not in line and 'Enchantment —' not in line and line[0] != '(':
            return False
            
    # If the line contains the word "Artifact", then it must meet one of the following conditions:
    # - The line contains only the word "Artifact" and nothing else.
    # - "Artifact" is preceded by the word "Legendary".
    # - "Artifact" is preceded by the word "Snow".
    # - "Artifact" is preceded by the word "Enchantment".
    # - "Artifact" is succeeded by a long dash.
    # - "Artifact" is succeeded by the word "Creature".
    if 'Artifact' in line:
        if line != 'Artifact' and 'Legendary Artifact' not in line and 'Snow Artifact' not in line and 'Artifact Creature' not in line and 'Enchantment Artifact' not in line and 'Artifact —' not in line:
            return False
            
    # If the line contains the word "Conspiracy", then it must meet one of the following conditions:
    # - The line contains only the word "Conspiracy" and nothing else.
    if 'Conspiracy' in line:
        if line != 'Conspiracy':
            return False
            
    # If the line contains the word "Plane", then it must meet one of the following conditions:
    # - "Plane" is succeeded by a long dash.
    if 'Plane' in line:
        if 'Planeswalker' not in line:
            if 'Plane —' not in line:
                return False
            
    # If the line contains the word "Scheme", then it must meet one of the following conditions:
    # - The line contains only the word "Scheme" and nothing else.
    # - The line contains "Ongoing Scheme" and nothing else.
    if 'Scheme' in line:
        if line not in ['Scheme', 'Ongoing Scheme']:
            return False
            
    # If the line contains the word "Land", then it must meet one of the following conditions:
    # - The line contains only the word "Land" and nothing else.
    # - "Land" is preceded by the word "Legendary".
    # - "Land" is preceded by the word "Basic".
    # - "Land" is preceded by the word "Snow".
    if 'Land' in line:
        if line != 'Land' and 'Legendary Land' not in line and 'Basic Land' not in line and 'Snow Land' not in line:
            return False
            
    # At this point, we're reasonably sure that we're ruled out a lot of false positives, so we will identify this as a
    # type line.
    return True



def split_name_and_cost_line_into_name_and_cost(name_and_cost_line):
    # There are two situations that we need to consider:
    #
    # 1. The name and cost line consists of the card's name followed by the cost.
    #
    #    Example: "Applejack, Element of Honesty 4GG"
    #
    # 2. The name and cost line is for a split card, and thus consists of two name-cost pairs, separated by a
    #    double-slash.
    #
    #    Example: "Bait 3G//Switch 5U"


    if '//' in name_and_cost_line:
        # The name and cost line contains a double slash, so we will assume that it is a split card.
        name_and_cost_line_halves = [half.strip() for half in name_and_cost_line.split('//')]

        # We should now have two name-and-cost pairs. We can treat these as if they were regular individual
        # name-and-cost lines to extract the names and costs from each.

        name_and_cost_1 = split_name_and_cost_line_into_name_and_cost(name_and_cost_line_halves[0])
        name_and_cost_2 = split_name_and_cost_line_into_name_and_cost(name_and_cost_line_halves[1])

        # For split cards, the way the database deals with them is to display their name as a combined name (eg.
        # "Bait // Switch", and to use an extra cost parameter (`cost2`) to hold the second cost.
        name = name_and_cost_1['name']+' // '+name_and_cost_2['name']
        cost = name_and_cost_1['cost']
        cost2 = name_and_cost_2['cost']
        return {'name': name, 'cost': cost, 'cost2': cost2}
    else:
        # This is not a split card, so we assume that it is a regular name-and-cost line. In this case, we take the last
        # word of the line to be the cost.
        name_and_cost_line_pieces = name_and_cost_line.split()
        name = ' '.join(name_and_cost_line_pieces[0:-1])
        cost = name_and_cost_line_pieces[-1]
        return {'name': name, 'cost': cost}



# Given a type line, returns a dictionary containing the component parts of the type line. The component parts may be:
# color indicator, supertype, and subtype. Of these, only supertype is guaranteed to be present; not all cards have a
# subtype, and very few have color indicators.
#
# There is also a special case to look out for: split cards. These could have _two_ supertype-subtype pairs. For
# example: "Instant//Enchantment — Aura".
def split_type_line(type_line):
    type_line_parts = {}
    if '//' in type_line:
        # We'll deal with the rare split card situation first. If the type line contains a double slash, we will assume
        # this to be a split card.
        
        type_line_halves = [half.strip() for half in type_line.split('//')]

        # We should now have what are essentially two separate type lines. So we'll split them as if they were each a
        # separate type line.
        type_pieces_1 = split_type_line(type_line_halves[0])
        type_pieces_2 = split_type_line(type_line_halves[1])

        # We now have the individual pieces of both halves of the type line. So for example, we might have two
        # supertype-subtype pairs. Or, we might have a supertype and subtype for the first half, and just a supertype
        # for the second half. Whichever it is, we'll use `supertype2` and `subtype2` for supertypes and subtypes that
        # appear in the second half.

        type_line_parts['supertype'] = type_pieces_1['supertype']
        if 'subtype' in type_pieces_1:
            type_line_parts['subtype'] = type_pieces_1['subtype']

        type_line_parts['supertype2'] = type_pieces_2['supertype']
        if 'subtype' in type_pieces_2:
            type_line_parts['subtype2'] = type_pieces_2['subtype']
    else:
        # This isn't a split type line, so we'll treat it as a normal type line.

        # Search for a color indicator first. This will be a set of mana symbols (ie. W, U, B, R, G) enclosed in
        # parentheses, and will be the first thing on the line if present.
        color_indicator_regex = r'^\([WUBRG]+\) '
        color_indicator_match = re.match(color_indicator_regex, type_line, re.IGNORECASE)

        type_line_remainder = type_line

        if color_indicator_match:
            # If we found a color indicator, store it and remove it from the string.
            type_line_parts['colorIndicator'] = color_indicator_match.group(0)
            # The regex looks for a trailing space at the end, so we need to slice that off.
            type_line_parts['colorIndicator'] = type_line_parts['colorIndicator'][:-1]

            # For the rest of this function, we'll operate on the stuff after the color indicator, which will be the
            # supertype and (if present) the subtype.
            type_line_remainder = type_line[len(type_line_parts['colorIndicator'])+1:]

        # Attempt to split the line on a long dash.
        type_line_remainder_pieces = type_line_remainder.split(EM_DASH)


        if len(type_line_remainder_pieces) == 2:
            # If the line split into two pieces, then the first piece is the supertype, and the second piece is the subtype.
            type_line_parts['supertype'] = type_line_remainder_pieces[0].strip()
            type_line_parts['subtype'] = type_line_remainder_pieces[1].strip()
        else:
            # Otherwise, we'll assume it's just one piece, which must be the supertype.
            type_line_parts['supertype'] = type_line_remainder_pieces[0].strip()

    return type_line_parts



# Given a dump `dump` of raw FICG data, break it into a list of sub-dumps, each of which should represent a single card.
def split_ficg_dump_into_individual_card_dumps(dump):
    # Split the dump into lines.
    dump_lines = dump.split('\n')

    # Because text files often end with a newline, this means that `dump_lines` ends up with one empty string as the
    # last element. We don't want that, so we'll get rid of it if it's there.

    if dump_lines[-1] == '':
        dump_lines = dump_lines[0:-1]

    # Go through the lines and identify which of them are type lines.
    type_line_indices = []
    for i in range(len(dump_lines)):
        dump_line = dump_lines[i]
        if is_type_line(dump_line):
            # NOTE: If the parser has failed, this is a good place to look to see where the problem is. Usually it fails
            # because the type line has been misidentified.
            # print dump_line
            type_line_indices.append(i)

    # Since the name and cost line is always directly above the type line, we can get the indices of all name-and-cost
    # lines, too.
    name_and_cost_line_indices = []
    for type_line_index in type_line_indices:
        name_and_cost_line_indices.append(type_line_index-1)

    # Since each card always begins with the name-and-cost line, we can use those indices to figure out which ranges of
    # lines represent single, distinct cards.
    card_line_ranges = []

    # This loop just hops through the list of name-and-cost line indices, a pair at a time, to figure out the ranges
    # between each pair of indices. A range is expresses as a tuple (start_line, end_line).
    for i in range(len(name_and_cost_line_indices)-1):
        line_range_start = name_and_cost_line_indices[i]
        line_range_end = name_and_cost_line_indices[i+1]-1
        card_line_range = (line_range_start, line_range_end)
        card_line_ranges.append(card_line_range)

    # There will be one final range on the end that we didn't get (as there isn't an index for the end of the lines).
    # We'll account for that too.
    card_line_ranges.append((name_and_cost_line_indices[-1], len(dump_lines)-1))

    # Having determined the ranges of lines that we need to extract, we can now do so, which will split the dump into
    # sub-dumps that each represent one card.
    sub_dumps = []
    for card_line_range in card_line_ranges:
        line_range_start = card_line_range[0]
        line_range_end = card_line_range[1]
        sub_dump_lines = dump_lines[line_range_start:line_range_end+1]
        sub_dump = '\n'.join(sub_dump_lines)
        sub_dumps.append(sub_dump)

    return sub_dumps



# Given a dump of text which represents a single FICG card, extract and return a dictionary of the card's properties.
def parse_individual_card_dump_into_card_data_entry(individual_card_dump):
    card_data_entry = {}

    # Before starting, perform a replacement to replace decorative double quotes (”) with regular ones ("). Just to keep
    # things consistent.
    individual_card_dump = individual_card_dump.replace('”', '"')
    individual_card_dump = individual_card_dump.replace('“', '"')

    # Split the individual dump into lines.
    individual_card_dump_lines = individual_card_dump.split('\n')

    # Identify the name-and-cost line, and the type line. These, we assume, will always be the first and second lines
    # respectively.
    name_and_cost_line = individual_card_dump_lines[0]
    type_line = individual_card_dump_lines[1]

    # Extract the supertype (and subtype, and color indicator, if present) first. We need this because we want to make a decision about how
    # to interpret the name-and-cost line, and that decision depends on the card's supertype.
    type_line_properties = split_type_line(type_line)

    for property_name in type_line_properties:
        card_data_entry[property_name] = type_line_properties[property_name]
    
    # Now that we have the supertype, check what kind of card this is. If it's a land, scheme, or plane, we will assume
    # that the card has no cost for us to extract, and just take the entirety of the name-and-cost line to be the card's name.
    if 'Land' in card_data_entry['supertype'] or 'Scheme' in card_data_entry['supertype'] or 'Conspiracy' in card_data_entry['supertype'] or ('Plane' in card_data_entry['supertype'] and 'Planeswalker' not in card_data_entry['supertype']):
        card_data_entry['name'] = name_and_cost_line
    else:
        # Otherwise, if not a land, we will assume that the line contains a name and a cost, and will split it
        # accordingly.
        name_and_cost_line_properties = split_name_and_cost_line_into_name_and_cost(name_and_cost_line)
        card_data_entry['name'] = name_and_cost_line_properties['name']
        card_data_entry['cost'] = name_and_cost_line_properties['cost']
        if 'cost2' in name_and_cost_line_properties:
            # If the card was a split card, we should have gotten back a second cost (`cost2`), so we'll include that in
            # the card data.
            card_data_entry['cost2'] = name_and_cost_line_properties['cost2']

    # META CASE: If the card before this one made reference to "transforming" itself, then we can surmise that this card
    # is the transformed version of it; that is, it is the reverse side of a double-sided card. Reverse sides of
    # double-sided cards generally do not have a mana cost, which means we should take the entirety of the name-and-cost
    # line to be the card's name.
    if META['previous_card_was_a_transformer']:
        # There is one exception to this meta case: if we were able to identify the _previous_ card as being a
        # reverse side (as well as one that wants to transform itself), then this card is _not_ the reverse side of
        # that card. What's happened there is that the previous card is able to transform back to its original form,
        # so any references it makes to transformation do not apply to this card.
        if not META['previous_card_was_reverse_side']:
            # Since this is the reverse side of a double-sided card, disregard the mana cost.
            card_data_entry['name'] = name_and_cost_line
            if 'cost' in card_data_entry:
                del card_data_entry['cost']
            # We can also record which card this actually transforms from, since we know what the previous card was.
            # We should be more specific than just the card name (as that is not guaranteed to be unique), but for now
            # we'll just use the name.
            card_data_entry['transformsFrom'] = META['previous_card_data_entry']['name']

    # We can now use the supertype to make some further decisions:
    if 'Creature' in card_data_entry['supertype']:
        # If the card is a creature, we expect that the last line in the dump will be the creature's power/toughness,
        # and everything else will be card text.
        card_data_entry['pt'] = individual_card_dump_lines[-1]
        text_lines = individual_card_dump_lines[2:-1]

        if card_data_entry['pt'].split()[0] == 'Level':
            # Special exception to the above: Leveler cards don't end with a power/toughness line. Instead, they have
            # multiple lines in their rules text which end in a power/toughness.
            # We're going to assume that if the power/toughness we obtained begins with the word "Level", then this is
            # obviously not a power/toughness line, but a leveler line. In this case, we will not give this card a
            # power/toughness, and just let the rules text speak for it.
            del card_data_entry['pt']
            text_lines = individual_card_dump_lines[2:]
    elif 'Planeswalker' in card_data_entry['supertype']:
        # If the card is a planeswalker, we expect that the last line in the dump will be the planeswalker's loyalty,
        # and everything else will be card text.
        card_data_entry['loyalty'] = individual_card_dump_lines[-1]
        text_lines = individual_card_dump_lines[2:-1]

        # SPECIAL CASE: "Discord Released" has no loyalty box, due to a quirk of it being the reverse side of a
        # double-sided card. For this card, all lines after the first two are the card text, and we won't set a loyalty.
        if card_data_entry['name'] == 'Discord Released':
            del card_data_entry['loyalty']
            text_lines = individual_card_dump_lines[2:]
            
    else:
        # In all other cases (ie. enchantments, instants, artifacts), we expect that everything after the first two
        # lines is card text.
        text_lines = individual_card_dump_lines[2:]
        
    rules_text_lines = text_lines
    flavor_text_lines = []

    # We've assumed, by default, that all text lines are the card's rules text, and that it has no flavor text. This is
    # because, in most cases, we cannot distinguish rules text from flavor text. However, there are a couple of tricks
    # which we'll now try.
    #
    # FanOfMostEverything often uses a fairly well-defined format for character quotes, like this:
    #
    # "Something said by a character"
    # — the character
    #
    # It's a good bet that if the second-to-last of the text lines is in double quotes, and the last line begins with a
    # long dash, that those two lines are flavor text.

    # A note of explanation here: up to this point, we've been working with byte strings, which is usually fine. Even
    # though the FICG dump is in UTF-8 encoding, we haven't needed to worry about what bytes are actually in our
    # strings.
    #
    # At this point, however, we want to detect whether the first character is a long dash. In UTF-8, the long dash (em
    # dash) is three bytes long. Because we're using byte strings, this means that in order to test for a long dash, we
    # would need to look at the first _three_ characters of the string (ie. string[0:3]). This is just how Python strings
    # work.
    #
    # So we could do that, or we could decode our byte string into a proper Unicode string and examine the characters as
    # actual characters, rather than bytes. The latter option is preferable, so we'll do that.
    if len(text_lines) >= 2 and text_lines[-2][0] == '"' and text_lines[-2][-1] == '"' and text_lines[-1].decode('utf-8')[0] == EM_DASH.decode('utf-8'):
        rules_text_lines = text_lines[0:-2]
        flavor_text_lines = text_lines[-2:]

    # Another pattern we can search for is the presence of one or more fully-quoted strings at the end of the card text.
    # These usually represent unattributed character dialogue, which makes them flavor text. To check for this, we'll
    # search backward through the lines of card text until we find one that is not dialogue (ie. not fully enclosed in
    # double quotes). If the first non-dialogue line is the last line of the text, then there _is_ no dialogue, and thus
    # we cannot use this trick. If, however, the first non-dialogue line is not the last line of the text (or, more
    # rarely, we don't find any non-dialogue lines, which would indicate a card that is _all_ dialogue), then we know
    # that the card has dialogue, and will capture that as the flavor text.

    index_of_first_nondialogue_line = None
    for i in range(len(text_lines)-1, -1, -1):
        text_line = text_lines[i]
        if not (text_line[0] == '"' and text_line[-1] == '"'):
            index_of_first_nondialogue_line = i
            break
    if index_of_first_nondialogue_line < len(text_lines)-1 or index_of_first_nondialogue_line is None:
        rules_text_lines = text_lines[0:index_of_first_nondialogue_line+1]
        flavor_text_lines = text_lines[index_of_first_nondialogue_line+1:]
        
    rules_text = '\\n\\n'.join(rules_text_lines)
    # We'll only join flavor text with one newline, not two. FanOfMostEverything leaves the exact number of newlines a
    # little ambiguous, but it looks better this way.
    flavor_text = '\\n'.join(flavor_text_lines)

    if rules_text:
        card_data_entry['text'] = rules_text
    if flavor_text:
        card_data_entry['flavorText'] = flavor_text

    # Finally, add the creator attribution; the set and creator will be the same in all cases.
    card_data_entry['set'] = META['set_name']
    card_data_entry['creator'] = 'FanOfMostEverything'

    # Sometimes, the card after this one will need to refer back to it, because it's related to it in some way (usually,
    # by being the transformed version of it). We store any such meta-information in the global `META` dictionary.
    META['previous_card_data_entry'] = card_data_entry

    # If this card referred to "transforming" itself, store that in the meta dictionary. The next card will need to
    # know about that, because it's probably the transformed version of this card (and that will affect how we interpret
    # it).
    #
    # The following condition checks the card text for any of the following:
    # - "transform {FULL NAME OF CARD}"
    # - "transform {FIRST WORD OF CARD NAME}"
    # - "transform it"
    first_word_of_card_name = card_data_entry['name'].split(' ')[0]
    if 'transform '+card_data_entry['name'].lower() in card_data_entry['text'].lower() or 'transform '+first_word_of_card_name.lower() in card_data_entry['text'].lower() or 'transform it' in card_data_entry['text']:
        if META['previous_card_was_a_transformer']:
            if not META['previous_card_was_reverse_side']:
                # If this card is a transformer, and the previous card was _also_ a transformer, _and_ the previous card
                # wasn't a reverse side, then we can safely say that this card is the reverse side of the previous card.
                # The next card needs to know that, because otherwise it will think that _it_ is the reverse side of
                # _this_ card (which isn't possible; a card only has 2 sides).
                META['previous_card_was_reverse_side'] = True
            else:
                # If this card is a transformer, and the previous card was also a transformer, but we know that the
                # previous card was the reverse side of the card before it, then we can safely say that this card is
                # _not_ a reverse side (it's the front side). The next card needs to know that.
                META['previous_card_was_reverse_side'] = False
        META['previous_card_was_a_transformer'] = True
    else:
        # If this card didn't make any reference to transformation, then it's not a transformer, and it's not the
        # reverse side of anything.
        META['previous_card_was_a_transformer'] = False
        META['previous_card_was_reverse_side'] = False

    return card_data_entry



def parse_ficg_dump_into_card_data_entries(ficg_dump):
    # Break up the dump into a number of sub-dumps, each of which (we hope) is a chunk of text that represents a single
    # card.

    individual_card_dumps = split_ficg_dump_into_individual_card_dumps(ficg_dump)
    card_data_entries = []
    for individual_card_dump in individual_card_dumps:
        card_data_entry = parse_individual_card_dump_into_card_data_entry(individual_card_dump)
        card_data_entries.append(card_data_entry)

    # Before we return it, we can do a second pass on this data; if we identified any "transformsFrom" properties, we
    # can now also add "transformsInto" on the cards that they transform from.
    transformsIntoDict = {}
    for card_data_entry in card_data_entries:
        if 'transformsFrom' in card_data_entry:
            transformsIntoDict[card_data_entry['transformsFrom']] = card_data_entry['name']

    for card_data_entry in card_data_entries:
        if card_data_entry['name'] in transformsIntoDict:
            card_data_entry['transformsInto'] = transformsIntoDict[card_data_entry['name']]

    return card_data_entries

ficg_raw_path = sys.argv[1]
js_variable_name = sys.argv[2]
set_name = sys.argv[3]

ficg_raw_file = open(ficg_raw_path, 'r')
ficg_raw_dump = ficg_raw_file.read()

# Correct some known typos.
for typo in SPELLING_CORRECTIONS:
    ficg_raw_dump = ficg_raw_dump.replace(typo, SPELLING_CORRECTIONS[typo])

# The set name is the same for all cards, so store it in the global meta dictionary.
META['set_name'] = set_name

card_data_entries = parse_ficg_dump_into_card_data_entries(ficg_raw_dump)
card_properties = ['name', 'image', 'set', 'creator', 'cost', 'cost2', 'colorIndicator', 'supertype', 'subtype', 'supertype2', 'subtype2', 'text', 'flavorText', 'pt', 'loyalty', 'transformsInto', 'transformsFrom']

print mtgJson.encapsulate_dict_list_in_js_variable(card_data_entries, card_properties, js_variable_name)
