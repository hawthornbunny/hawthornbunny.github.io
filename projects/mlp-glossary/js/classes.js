class SearchResult
{
    constructor(media, category, item, description)
    {
        this.media = media;
        this.category = category;
        this.item = item;
        this.description = description;
        this.aliases = [];
    }

    addAlias(alias)
    {
        this.aliases.push(alias)
    }
}

/**
 * Represents a mode of operation of the decks app.
 */
class Mode
{
    constructor()
    {
        // State information for the mode. This object should contain enough
        // information to reconstruct the mode's complete state at any time.
        this.state = undefined;

        // An object mapping checkbox ids to their checked/unchecked state (true
        // means checked). This is used to restore the mode's options after
        // redrawing the interface.
        this.checkboxStates = undefined;

        // The function used to draw the mode's interface.
        this.drawFunc = undefined;

        // The function used to update the mode's interface after it's already
        // been drawn, usually to reflect some change made by the user (eg. when
        // a checkbox is toggled).
        this.updateFunc = undefined;
    }
}

/**
 * Represents a checkable option (either checkbox or radio), along with extra
 * information such as an optional text field.
 */
class CheckableOption
{
    constructor(id, checkableType, labelText)
    {
        const allowedCheckableTypes = ['checkbox', 'radio'];

        if (!contains(allowedCheckableTypes, checkableType)) {
            throw new Error(`Cannot construct checkable option; invalid checkable type "${type}"`);
        }

        this.id = id;
        this.checkableType = checkableType;
        this.labelText = labelText;

        this.checkableGroup = undefined;
        this.fieldId = undefined;
        this.fieldDefaultValue = undefined;
    }

    setField(id, defaultValue)
    {
        this.fieldId = id;
        this.fieldDefaultValue = defaultValue;
    }

    setCheckableGroup(groupName)
    {
        this.checkableGroup = groupName;
    }

    /**
     * Create and return an element representing this option.
     */
    render()
    {
        if (this.checkableType === 'radio' && this.checkableGroup === undefined) {
            throw new Error(`Cannot render checkable option; option has type "{this.checkableType} but no group name was defined`);
        }

        const optionPanel = create('div', 'checkable-option');
        const checkable = create('input');
        const label = create('label');
        const labelText = this.labelText;

        setProps(checkable, {'id': this.id, 'type': this.checkableType});
        setProps(label, {'htmlFor': this.id, 'innerHTML': this.labelText});

        if (this.checkableGroup !== undefined) {
            checkable.name = this.checkableGroup;
        }

        append(optionPanel, checkable, label)

        if (this.fieldId !== undefined) {
            const field = create('input');
            setProps(field, {'id': this.fieldId, 'type': 'text'});

            if (this.fieldDefaultValue !== undefined) {
                field.value = this.fieldDefaultValue;
            }

            append(optionPanel, field);
        }

        return optionPanel;
    }
}
