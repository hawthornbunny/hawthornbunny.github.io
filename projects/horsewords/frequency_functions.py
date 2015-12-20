# ----------------------------------------------------------------------------------------------------------------------
# Functions for counting character/word multigraph frequencies in text, and also for generating new texts using
# predictive algorithms based on the frequency data. ("Multigraph" is the generalized term for things like digraphs,
# trigraphs, etc.).
#
# Some theory: to implement predictive text generation, we need to have a source of multigraph frequency data that the
# generator can use to decide the next best character.
#
# Example: Suppose we have the text "Th". Common sense tells us that the next letter could be "a", "e", "i", "o", "r",
# "u", and even some uncommon ones like "w" or "y". We know the rough likelihoods of each letter, too; we know that it's
# most likely to be "e" (because "The" is one of the commonest English words).
#
# So you can imagine that we might have a lookup table like this:
#
# +----------+-----------+
# | trigraph | frequency |
# +----------+-----------+
# |      tha | 7         |
# |      the | 10        |
# |      thi | 8         |
# |      tho | 6         |
# |      thr | 4         |
# |      thu | 3         |
# |      thw | 1         |
# |      thy | 1         |
# +----------+-----------+
#
# The generator could then use this table to decide on the best characters to use.
#
# This is okay, and we could easily store the frequency data for all multigraphs this way. However, a flat list is not
# very easy to search, and it'll probably take a lot of memory to store, too, once we start looking at longer
# multigraphs.
#
# Possibly a better way to implement this is as a tree with labelled nodes. For example, we can encapsulate the same
# data as above in the following form:
#
# --t--h--a = 7
#      |
#      +--e = 10
#      |
#      +--i = 8
#      |
#      +--o = 6
#      |
#      +--r = 4
#      |
#      +--u = 3
#      |
#      +--w = 1
#      |
#      +--y = 1
#
# This kind of structure is easier to traverse on a character-by-character basis, and is more easily updatable.
# ----------------------------------------------------------------------------------------------------------------------

import random, re, sys
# Constructs or updates a frequency tree with frequency information from the supplied input sequence (eg. a list of
# characters).
#
# A frequency tree is a dictionary of lists. Each list contains two elements: the first is an integer
# marking the frequency of that particular chain of keys. The second is a sub-frequency tree.
#
# Diagrammatically, it looks something like this:
#
# [0,{}]
#    |
#    T-[0,{}]
#    |    |
#    |    h-[0,{}]
#    |    |    |
#    |    |    e-[0,{}]
#    |    |    |    .
#    |    |    |    .
#    |    |    |    .
#    |    |    |
#    |    |    i-[0,{}]
#    |    |    .    .
#    |    |    .    .
#    |    |    .    .
#    |    |
#    |    |
#    |    w-[0,{}]
#    |    .    |
#    |    .    i-[0,{}]
#    |    .
#    |
#    |
#    |
#    R-[0,{}]
#    .    |
#    .    a-[0,{}]
#    .    |    |
#         |    i-[0,{}]
#         |    |    .
#         |    |    .
#         |    |    .
#         |    |
#         |    r-[0,{}]
#         |    .    .
#         |    .    .
#         |    .    .
#         |
#         |
#         e-[0,{}]
#         .    |
#         .    a-[0,{}]
#         .
#
# `input_sequence` is any iterable collection of elements; most likely, this will be a string (in which case the
# elements are individual characters), but it could also be a list of words.
def grow_frequency_tree(tree, input_sequence, sequence_length):
    # Do some sense checking first. The root node should be of the form [0,{}].
    if not isinstance(tree, list):
        raise Exception('The root tree node must be a list containing a frequency and a dictionary')
    if len(tree) != 2:
        raise Exception('The root tree node must be a list of length 2')

    for i in range(len(input_sequence)):
        for j in range(1, sequence_length+1):
            # At each index of the input collection, collect multiple runs of elements of increasing length, starting at
            # 1 and ending at the sequence_length. For example, if the text is "Testing", the sequence_length is
            # 5, and the index we're looking at is 2, we would expect to collect the following runs:
            #
            # "s"
            # "st"
            # "sti"
            # "stin"
            # "sting"

            element_run = input_sequence[i:i+j]
            
            # Insert the run into the tree.

            # Get the root node. Don't forget that every node of this tree is actually a 2-element list [f,t], where f
            # is an integer representing the frequency of the element sequence, and t is a subtree containing nodes for
            # possible next elements in the sequence.
            tree_node = tree

            # Go through the run and add each element of it as a node to the tree, if the tree doesn't already contain
            # it.
            for k in range(len(element_run)):
                element = element_run[k]
                subtree = tree_node[1]
                if element not in subtree:
                    subtree[element] = [0, {}]
                tree_node = subtree[element]
                    
            # After the above loop, `tree_node` should now be at the correct position in the tree for us to record the
            # frequency of this run, so we increment the frequency counter at this position.
            tree_node[0] += 1

    return tree



# Given a sequence of elements and a tree containing frequency data, return a dictionary containing candidates for the
# next element, and the frequency with which that next element is known to occur.
def get_next_element_frequencies(element_sequence, tree):
    if not isinstance(element_sequence, list):
        element_sequence = list(element_sequence)

    tree_node = tree
    for i in range(len(element_sequence)):
        element = element_sequence[i]
        # For each element in the string, attempt to traverse the frequency tree by one level.

        frequency = tree_node[0]
        subtree = tree_node[1]
        if element in subtree:
            tree_node = subtree[element]
        else:
            # If the frequency tree doesn't contain the element we're looking for, that means we have no data for
            # this particular element sequence. If that's so, we return None (no data).
            print "The frequency tree didn't contain the element. No frequency data available."
            return None

    # After the tree traversal above, we expect the current node to be an [f,t] list, where t is a dictionary containing
    # all the possible next elements (which have their own [f,t] nodes). We only want the frequencies of the next
    # possible elements, so we'll iterate through that subtree to pull out just the f-values. (Any subtrees deeper than
    # that are for longer sequences that we're not interested in).
    frequency_dict = {element:tree_node[1][element][0] for element in tree_node[1]}
  
    return frequency_dict



# Given a sequence of elements, and a tree of frequency data, predict a reasonable next element in that sequence.
def predict_next_element(element_sequence, frequency_tree):
    predicted_element = None
    # Using the supplied frequency tree, obtain a dictionary of possible next elements for the given element sequence.
    next_element_frequency_dict = None
    while True:
        next_element_frequency_dict = get_next_element_frequencies(element_sequence, frequency_tree)
        if next_element_frequency_dict is None:
            if len(element_sequence) == 0:
                # If we can't even obtain a dictionary for a zero-length string, there's no point in trying any more;
                # give up.
                break
            # If we fail to obtain a dictionary of next elements for the given sequence, we'll try for something less
            # accurate but more likely to yield a result: slice off the first element so that we're going for a smaller
            # run of elements, and repeat.
            print "Unable to find a dict for "+','.join(element_sequence)+" (length "+str(len(element_sequence))+")"
            element_sequence = element_sequence[1:]
        else:
            # We've found a dictionary, so we can continue.
            break

    if next_element_frequency_dict is not None:
        # Pick a element from the frequency dict by its weighting.
        predicted_element = choose_element_from_frequency_dict(next_element_frequency_dict)

    return predicted_element



# Given a tree of character frequency data, and the maximum character run length that the tree is capable of predicting
# for, generate a text using character prediction.
def generate_text_from_character_frequency_tree(tree, run_length, text_length):
    generated_text = ''
    for i in range(text_length):
        # Get the last n characters of the text, where n is the run length that our frequency tree can predict for. If
        # the text isn't yet n characters long, that's okay; the slice will take as many characters as it can, and the
        # prediction function will pad the rest.
        character_run = generated_text[0-(run_length-1):]
        next_character = predict_next_element(character_run, tree)
        generated_text += next_character

        if next_character is None:
            # If the predictor was unable to predict a next character (maybe the sequence it's checking for has never
            # occurred), we'll have to pick a random one.
            alphabet = 'abcdefghijklmnopqrstuvwxyz'
            next_character = alphabet[random.randint(0, len(alphabet)-1)]
    return generated_text



# This method attempts to use both character- and word- frequency trees to generate text, but it doesn't work properly
# yet so it's not being used.
def generate_text_from_character_and_word_frequency_trees(character_tree, word_tree, character_run_length, word_run_length, text_length):
    generated_text = ''
    for i in range(text_length):
        # Check to see if the last thing generated was a whole word.
        matches = re.search(r'\s+(\S+)\s+$', generated_text)
        if matches:
            print 'Last word: "'+matches.group(1)+'"'
            # If it was, we'll see if the word frequency tree can predict a likely next word.
            words_in_generated_text = generated_text.split()
            word_run = words_in_generated_text[0-(word_run_length-1):]
            next_word = predict_next_element(word_run, word_tree)

            # If the predictor was able to predict a next word, add it to the generated text.
            if next_word is not None:
                print 'Added word "'+next_word+'"'
                generated_text += next_word

        # Get the last n characters of the text, where n is the sequence length that our frequency tree can predict for. If
        # the text isn't yet n characters long, that's okay; the slice will take as many characters as it can.
        character_run = generated_text[0-(character_run_length-1):]
        next_character = predict_next_element(character_run, character_tree)

        if next_character is None:
            # If the predictor was unable to predict a next character (maybe the sequence it's checking for has never
            # occurred), we'll have to pick a random one.
            alphabet = 'abcdefghijklmnopqrstuvwxyz'
            next_character = alphabet[random.randint(0, len(alphabet)-1)]

        generated_text += next_character
    return generated_text



# Given a frequency dictionary (a dictionary of elements and the frequencies with which they occur), choose an element
# from them, with the choice biased toward elements of higher frequency.
def choose_element_from_frequency_dict(frequency_dict):
    # Calculate the total of all frequencies in the dict.
    frequency_total = 0
    for element in frequency_dict:
        frequency_total += frequency_dict[element]
    
    # Select a random number between 0 and the total.
    try:
        random_target = random.randint(0, frequency_total-1)
    except ValueError:
        print frequency_dict
    
    n = 0
    for element in frequency_dict:
        n += frequency_dict[element]
        if n > random_target:
            return element

    return None
