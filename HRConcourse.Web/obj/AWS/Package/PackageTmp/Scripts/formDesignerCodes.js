/// <reference path="jquery-1.7.1.js"/>
/// <reference path="jquery-ui-1.8.9.custom.min.js"/>
/// <reference path="formsCommon.js"/>
/// <reference path="ttw.formbuilder.js"/>


/** Auxiliary global variables **/
var FIELD_ACTIONS = '.field-actions',
    RESIZABLE_HANDLE = '.ui-resizable-handle',
    RESIZABLE_CLASS = 'ui-resizable',
    DRAGGABLE_CLASS = 'ui-draggable',
    ARIA_DISABLED_ATTR = 'aria-disabled',
    CHECK_RADIO_OPTIONS = '.option',
    DATEPICKER_CLASS = 'hasDatepicker',
    DATA_FIELD_ID = 'FieldId',
    DATA_POSITION_TOP = 'PositionTop',
    DATA_POSITION_LEFT = 'PositionLeft',
    DATA_FIELD_WIDTH = 'FieldWidth',
    DATA_FIELD_HEIGHT = 'FieldHeight',
    DATA_HTML = 'Html',
    FIELD_ACTIONS_TEMPLATE = '#field-actions-tmpl',
    CLEAR_PAGE_TITLE = 'Reset Form';


/** This function is called from the server on initialization, to provide the possible pairs
    of key-value to use as 'initial value' for the fields **/
function addInitialValueKeyValuePair(key, value) {
    initialValueDictionary[key] = value;
}

function addMergeFieldDefinition(mergeFieldId, mergeFieldKey, testValue, isPostBack) {
    /// <summary>This function is called from the server on initialization, to provide the possible merge fields.</summary>
    /// <param name="mergeFieldId" type="string">The ID of the merge field.</param>
    /// <param name="mergeFieldKey" type="string">The key of the merge field.</param>
    /// <param name="testValue" type="string">The test value to display on preview mode for the merge field.</param>
    /// <param name="isPostBack" type="bool">Whether the merge field is a postback field.</param>
    /// <returns type="void"></returns>

    mergeFieldDefinitionsDictionary[mergeFieldId] = mergeFieldKey;
    mergeFieldValuesDictionary[mergeFieldId] = testValue;
    if (isPostBack === 'True' ) {
        mergeFieldPostbackDictionary[mergeFieldId] = mergeFieldKey;
    }
}

/** This function is called from the server on initialization, to provide the possible pairs
    of key-value to use as 'premade sources' for 'select' fields **/
function addComboValueKeyValuePair(key,value) {
    comboValuesDictionary[key] = value;
}

/** Copy all the fields to the preview section and removes the unnecessary markup **/
function setupPreviewFormCode() {
    // copy form fields to previewSection
    $previewSection.html($formDesigner.html());

    // remove unnecessary markup
    $previewSection.find(FIELD_CONTAINER).each(function () {
        removeFieldMarkups(this, true);
    });
}

/** Removes all the unnecessary markup generated by the different used plugins **/
function removeFieldMarkups(field, cleanStyle) {
    var $this = $(field),
        type = getType($this);

    // remove misc jquery ui classes, inline styles, etc
    $this.find(FIELD_ACTIONS + ', ' + RESIZABLE_HANDLE).remove();
    $this.removeClass(RESIZABLE_CLASS).removeClass(DRAGGABLE_CLASS).removeAttr(ARIA_DISABLED_ATTR);

    // remove extra draggable for radio and checkbox inner options
    if ($.inArray(type, ['checkbox', 'radio']) != -1) {
        $this.find(CHECK_RADIO_OPTIONS).removeClass(DRAGGABLE_CLASS);
    }

    // remove extra markup created by uniform plugin
    if ($.inArray(type, ['checkbox', 'radio']) != -1)
        removeUniformMarkup($this, type);

    // remove extra markup for date created by jQueryUI datepicker
    if (type == 'date')
        $this.find(DATEPICKER_INPUT).removeClass(DATEPICKER_CLASS);

    if (cleanStyle) {
        clearStyleProperty($this, type);
    }
}


/** Returns a string representation of the JSON object that is built containing
    the metadata for each of the form fields, following the server side representation **/
function getFieldsMetadata() {
    return getMetadata(true); 
}
function getMetadata(cleanMarkup) {
    /// <summary>Returns a string representation of the JSON object that is built containing
    /// the metadata for each of the form fields, following the server side representation.</summary>
    /// <param name="cleanMarkup" type="bool">Indicates if style markup should be removed.</param>
    /// <returns type="string"></returns>

    if (cleanMarkup !== undefined) {

        // exit preview mode if it is enabled
        if (inPreviewMode()) {
            setDesignerMode();
        }

        var metadata = new Array();

        // loop through each of the field containers
        $formDesigner.find(FIELD_CONTAINER).each(function () {
            
            // generate the field data object
            var fieldMetadata = getFieldMetadata($(this), cleanMarkup);
      
            // add the new metadata object into the collection
            metadata.push(fieldMetadata);
        });

        // transform the metadata for saving on the DB
        transformMetadataToSend(metadata);  // common.js

        // return the string representation of the JSON object
        return JSON.stringify(metadata);
    }
     
    return undefined;
}

function getFieldMetadata(field, cleanMarkup) {
    /// <summary>Returns an Object representation of the field, with it's metadata.</summary>
    /// <param name="field" type="Object">The field container to obtain the metadata.</param>
    /// <param name="cleanMarkup" type="bool">Indicates if style markup should be removed.</param>
    /// <returns type="Object"></returns>

    var $field = $(field);
    if ($field.length > 0 && cleanMarkup !== undefined) {

        /* Previous cleanup */
        // exit preview mode if it is enabled
        if (inPreviewMode()) {
            setDesignerMode();
        }

        // reset text, pass, email, number and datepicker values
        $field.find(TEXT_INPUT + ', ' + PASSWORD_INPUT + ', ' + EMAIL_INPUT + ', ' + NUMBER_INPUT + ', ' + DATEPICKER_INPUT).val('');
        // reset radio buttons and checkboxes
        $field.find(RADIO_INPUT + ', ' + CHECKBOX_INPUT).each(function () {
            $(this)[0].checked = false;
            $(this).parent().removeClass('checked');
        });

        // deselect any field and close properties
        deselectFields();

        // make the field size explicit
        $field.css('width', $field.css('width'));
        $field.css('height', $field.css('height'));

        // make a clone to remove unnecessary markup and obtain the HTML
        var $clone = $field.clone();
        removeFieldMarkups($clone, cleanMarkup);

        var fieldHTML = outerHTML($($clone)[0]),  // common.js
            fieldData = new Object(),
            dataObject = $field.data();

        // some of the metadata attributes are computed properties
        fieldData[DATA_FIELD_ID] = $field.attr('id');
        fieldData[DATA_FIELD_TYPE] = getType($field);
        fieldData[DATA_POSITION_TOP] = $field.css('top').replace('px', '');
        fieldData[DATA_POSITION_LEFT] = $field.css('left').replace('px', '');
        fieldData[DATA_FIELD_WIDTH] = $field.css('width').replace('px', '');
        fieldData[DATA_FIELD_HEIGHT] = $field.css('height').replace('px', '');
        fieldData[DATA_HTML] = fieldHTML;

        // loop through each of the metadata properties
        $.each(getMetadataProperties(), function (index, key) {  // common.js
            // jQuery.camelCase("some-string") returns "someString"  - jQuery.data() uses this notation
            var camelCaseKey = jQuery.camelCase(key),
            dataValue = dataObject[camelCaseKey];
            
            // save the ones that were specified on the field's data object
            if (dataValue !== undefined && dataValue !== null) {

                // transform the initial value keys to its internal ID representation
                if (camelCaseKey === 'initialvalue') {
                    for (var mergeKey in mergeFieldDefinitionsDictionary) {
                        var regex = new RegExp("\\[" + mergeFieldDefinitionsDictionary[mergeKey] + "\\]", "ig");
                        dataValue = dataValue.replace(regex, '[' + mergeKey + ']');
                    }
                }

                fieldData[camelCaseKey] = getDeepCopy(dataValue);
            }
        });

        // transform and save the specified custom validations for the field
        fieldData[DATA_CUSTOM_VALIDATION_DATA] = processCustomValidationMetadataToSend(dataObject);
        // transform and save the specified dependencies for the field
        fieldData[DATA_DEPENDENCY_DATA] = processDependencyMetadataToSend(dataObject);

        return fieldData;
    }
    return undefined;
}

/** Returns a copy of an item **/
function getDeepCopy(item) {
    if (typeof item === 'object') {
        var res = new Object();
        $.each(item, function (key, value) {
            res[key] = getDeepCopy(value);
        });
        return res;
    } else {
        return item;
    }
}






/** Receives a string representation of a JSON object, that contains
    the fields metadata and loads this information on the fields data object **/
function setFieldsMetadata(metadata) {
    // parse the fields data
    metadata = jQuery.parseJSON(metadata);
    transformMetadataToFieldsData(metadata);  //common.js

    // clean the designer's fields section
    $formDesigner.html('');

    // loop through each of the metadata elements - each corresponds to a different field
    for (var field = 0; field < metadata.length; field++) {

        // set the metadata
        setFieldMetadata(metadata[field]);
    }
}

function setFieldMetadata(fieldMetadata) {
    /// <summary>Based on the metadata given as a parameter, adds a new field and loads it data accordingly.</summary>
    /// <param name="fieldMetadata" type="Object">The metadata of the field.</param>
    /// <returns type="Object">The newly created field</returns>

    /* Previous cleanup */
    // exit preview mode if it is enabled
    if (inPreviewMode()) {
        setDesignerMode();
    }

    // deselect any field and close the properties
    deselectFields();

    /* Actual metadata processing */
    var columnWidth = $formBuilder.width() / 4,
        margin = .04 * (columnWidth * 4),
        max = (columnWidth * 4) - margin;

    var fieldId = fieldMetadata[DATA_FIELD_ID],
            currentField;

        // insert the fields html code
    $formDesigner.append(fieldMetadata[DATA_HTML]);
        currentField = $formDesigner.find('#' + fieldId);

        // make all the metadata available on the field
        $.each(getMetadataProperties(), function (index, key) {
            // jQuery.camelCase("some-string") returns "someString"  - jQuery.data() uses this notation
            var camelCaseKey = jQuery.camelCase(key),
            dataValue = fieldMetadata[camelCaseKey];

            if (dataValue !== null && dataValue !== undefined) {

                // transform the initial value internal IDs to its key representation
                if (camelCaseKey === 'initialvalue') {
                    for (var mergeKey in mergeFieldDefinitionsDictionary) {
                        var regex = new RegExp("\\[" + mergeKey + "\\]", "ig");
                        dataValue = dataValue.replace(regex, '[' + mergeFieldDefinitionsDictionary[mergeKey] + ']');
                    }
                }

                currentField.data(key, dataValue);
            }
        });
        // make the custom validation data available on the field
        processCustomValidationMetadataToFields(fieldMetadata, currentField);  // common.js
        // make the dependency data available on the field
        processDependencyMetadataToFields(fieldMetadata, currentField);  // common.js
        
        // add the actions section - delete option
        var info = {
            id: fieldId.slice(0, 32),  // GUID length = 32
            actionsType: 'field'
        };
        $(FIELD_ACTIONS_TEMPLATE).tmpl(info).appendTo(currentField);

        // apply uniform styles when needed
        currentField.find(CHECKBOX_RADIO_INPUTS).uniform();

        // apply datepicker when needed
        currentField.find(DATEPICKER_INPUT).datepicker({
            dateFormat: DATE_FORMAT,        // the format for parsed and displayed dates
            changeMonth: true,              // allows the user to change the month from a drop-down list
            changeYear: true,               // allows the user to change the year from a drop-down list
            showButtonPanel: true,          // whether to show the button panel
            showOtherMonths: true,          // display dates in other months at the start or end of the current month
            selectOtherMonths: true,        // allows to select days in other months shown before or after the current month
            yearRange: '-150:+10'           // range of years DISPLAYED, relative to today's year - doesn't restrict the selection
        });

        // make the field resizable
        currentField.resizable({
            handles: 'se',
            maxWidth: max,
            minWidth: getResizableFieldMinWidth(currentField),
            minHeight: getResizableFieldMinHeight(currentField)
        });

        // make the field and options draggable
        // bind the handler to reset the minimums height and width after an option is dragged
        currentField.draggable({ containment: $workArea});
        currentField.find(CHECK_RADIO_OPTIONS)
                    .draggable({ containment: 'parent' })
                    .bind("dragstop", function (event, ui) {
                        resetResizableMinHeightAndWidth(ui.helper.parent());
                    });

    // apply the styles saved on the metadata
    applyFieldStyles(currentField, fieldMetadata[DATA_FIELD_TYPE]);

    // return the new field
    return currentField;
}


/** Process and transforms the custom validation metadata into a JSON string object **/
function processCustomValidationMetadataToSend(dataObject) {
    var valCount = dataObject[jQuery.camelCase(DATA_VALIDATION_COUNT)],
        valData = new Array();

    if (valCount !== undefined) {
        // loop through each of the custom validations
        for (var i = 1; i <= valCount; i++) {
            var validationData = new Object();

            // save each of the validation properties when specified
            for (var key in customValidationMetadataDictionary) {
                var value = dataObject[jQuery.camelCase(customValidationMetadataDictionary[key] + i)];
                if (value !== undefined && value !== null) {
                    validationData[key] = value;
                }
            }

            // add the new validation data
            valData.push(validationData);
        }
    }

    // return the string representation of the JSON object
    return JSON.stringify(valData);
}

/** Process and transforms the dependency metadata into a JSON string object **/
function processDependencyMetadataToSend(dataObject) {
    var depCount = dataObject[jQuery.camelCase(DATA_DEPENDENCY_COUNT)],
        depData = new Array();

    if (depCount !== undefined) {

        // loop through each of the defined dependencies
        for (var i = 1; i <= depCount; i++) {
            var dependencyData = new Object();

            // save each of the dependency properties when specified
            for (var key in dependencyMetadataDictionary) {
                var value = dataObject[jQuery.camelCase(dependencyMetadataDictionary[key] + i)];
                if (value !== undefined && value !== null) {
                    dependencyData[key] = value;
                }
            }

            // save the premade action attributes when the type of action is 'premade'
            if (dependencyData.depType === DEP_TYPE_PREMADE && dependencyData.depPremade !== undefined) {
                // obtain the corresponding attributes from the premadeDependencyActions object
                var attributes = premadeDependencyActions[dependencyData.depPremade];
                dependencyData.depProperty = attributes.targetProperty;
                dependencyData.depPropertyValue = attributes.actionValue;
                dependencyData.depPropertyOtherwise = attributes.otherwiseValue;
            }

            // add the new dependency data
            depData.push(dependencyData);
        }
    }

    // return the string representation of the JSON object
    return JSON.stringify(depData);
}


/** Remove the extra markup added by the uniform() plugin **/
function removeUniformMarkup(field, type) {

    if (type == 'select') {
        field.find('span:first-child').remove();
        field.find('select').unwrap();
    }
    else if (type == 'radio' || type == 'checkbox') {
        field.find('input').unwrap().unwrap();
    }
    else {
        field.find('span.filename, span.action').remove();
        field.find('input').unwrap();
    }
}

/** Set the form image URL **/
function setFormImage(srcUrl) {
    $formImage.html('');
    if (srcUrl !== undefined) {
        $formImage.html('<img src="' + srcUrl + '" alt="" width="100%" style="position:relative; top:0px; z-index: -10" />');
    }
}

/** Clears the form's background image **/
function resetImage() {
    $formImage.html('');
}

/** Removes all the fields from the page **/
function clearForm() {
    confirmAction(resetForm, CLEAR_PAGE_TITLE);
}


/** jQuey extension method to filter the elements of a select list **/
jQuery.fn.filterByText = function (textbox, selectSingleMatch) {
    return this.each(function () {
        var select = this;
        var options = [];
        $(select).find('option').each(function () {
            options.push({ value: $(this).val(), text: $(this).text() });
        });
        $(select).data('options', options);
        $(textbox).unbind('change keyup').bind('change keyup', function () {
            var options = $(select).empty().data('options');
            var search = $.trim($(this).val());
            var regex = new RegExp(search, 'gi');

            $.each(options, function (i) {
                var option = options[i];
                if (option.text.match(regex) !== null) {
                    $(select).append(
                       $('<option>').text(option.text).val(option.value)
                    );
                }
            });
            if (selectSingleMatch === true &&
                $(select).children().length === 1) {
                $(select).children().get(0).selected = true;
            }
        });
    });
};
