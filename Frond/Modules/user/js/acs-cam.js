
var required='<span class="required">*</span>';
$(document).ready(function(){
    $('li.admin:has(li)').show();
})


function buildAddressHtml(address){
    return '<div class="resShowDiv-desktop row-fluid show-detail-con" acs-index="10"><label class="i-b m-l-20 p-l-2 f-i c-666">Address: </label>'+address+' </div>'
}

function buildCSIHtml(csi){
    return '<div class="resShowDiv-desktop row-fluid show-detail-con" acs-index="10"><label class="i-b m-l-20 p-l-2 f-i c-666">CSI: </label>'+csi+' </div>'
}
function removeMe(self){

    var idStr = $(self).attr("id");
    var removedId = idStr.split("_")[idStr.split("_").length-1];

    $("div[id$=addressArea_"+(removedId)+"]").remove();

    if(currentAddressNum>(removedId-1)){

        removedId =parseInt(removedId) ;
        for(var i=removedId+1;i<=currentAddressNum;i++ ){

            idStr = $("div[id$=addressArea_"+(i)+"]").attr("id");
            $("div[id$=addressArea_"+i+"]").attr("id",idStr.replace(i,(i-1)));

            idStr = $("input[id$=addressId_"+(i)+"]").attr("id");
            $("input[id$=addressId_"+i+"]").attr("id",idStr.replace(i,(i-1)));

            idStr = $("select[id$=addressType_"+(i)+"]").attr("id");
            $("select[id$=addressType_"+i+"]").attr("id",idStr.replace(i,(i-1)));

            idStr = $("select[id$=addressRegion_"+(i)+"]").attr("id");
            $("select[id$=addressRegion_"+i+"]").attr("id",idStr.replace(i,(i-1)));

            idStr = $("select[id$=customerCountry_"+(i)+"]").attr("id");
            $("select[id$=customerCountry_"+i+"]").attr("id",idStr.replace(i,(i-1)));

            idStr = $("input[id$=address1_"+(i)+"]").attr("id");
            $("input[id$=address1_"+i+"]").attr("id",idStr.replace(i,(i-1)));

            idStr = $("input[id$=address2_"+(i)+"]").attr("id");
            $("input[id$=address2_"+i+"]").attr("id",idStr.replace(i,(i-1)));



            idStr = $("input[id$=address3_"+(i)+"]").attr("id");
            $("input[id$=address3_"+i+"]").attr("id",idStr.replace(i,(i-1)));

            idStr = $("input[id$=address4_"+(i)+"]").attr("id");
            $("input[id$=address4_"+i+"]").attr("id",idStr.replace(i,(i-1)));




            idStr = $("input[id$=city_"+(i)+"]").attr("id");
            $("input[id$=city_"+i+"]").attr("id",idStr.replace(i,(i-1)));

            idStr = $("input[id$=province_"+(i)+"]").attr("id");
            $("input[id$=province_"+i+"]").attr("id",idStr.replace(i,(i-1)));



            idStr = $("input[id$=postalcode_"+(i)+"]").attr("id");
            $("input[id$=postalcode_"+i+"]").attr("id",idStr.replace(i,(i-1)));
            idStr = $("a[id$=btnajax_removeAddress_"+(i)+"]").attr("id");
            $("a[id$=btnajax_removeAddress_"+i+"]").attr("id",idStr.replace(i,(i-1)));

            idStr = $("a[id$=btnajax_addAddress_"+(i)+"]").attr("id");
            $("a[id$=btnajax_addAddress_"+i+"]").attr("id",idStr.replace(i,(i-1)));

        }

    }

    currentAddressNum = currentAddressNum-1;
    adjustAddressButton();




}


function removeMeCSI(self){

    var idStr = $(self).attr("id");
    var removedId = idStr.split("_")[idStr.split("_").length-1];

    $("div[id$=customerCSIArea_"+(removedId)+"]").remove();

    if(currentCSINum>(removedId-1)){

        removedId =parseInt(removedId) ;
        for(var i=removedId+1;i<=currentCSINum;i++ ){


            idStr = $("div[id$=customerCSIArea_"+(i)+"]").attr("id");
            $("div[id$=customerCSIArea_"+i+"]").attr("id",idStr.replace(i,(i-1)));


            idStr = $("input[id$=id_"+(i)+"]").attr("id");
            $("input[id$=id_"+i+"]").attr("id",idStr.replace(i,(i-1)));

            idStr = $("input[id$=csiId_"+(i)+"]").attr("id");
            $("input[id$=csiId_"+i+"]").attr("id",idStr.replace(i,(i-1)));

            idStr = $("select[id$=csiCountry_"+(i)+"]").attr("id");
            $("select[id$=csiCountry_"+i+"]").attr("id",idStr.replace(i,(i-1)));

            idStr = $("a[id$=btnajax_removeCSI_"+(i)+"]").attr("id");
            $("a[id$=btnajax_removeCSI_"+i+"]").attr("id",idStr.replace(i,(i-1)));

            idStr = $("a[id$=btnajax_addCSI_"+(i)+"]").attr("id");
            $("a[id$=btnajax_addCSI_"+i+"]").attr("id",idStr.replace(i,(i-1)));

        }

    }

    currentCSINum = currentCSINum-1;
    adjustCSIButton();


}


function removePhone(self){

    var idStr = $(self).attr("id");
    var removedId = idStr.split("_")[idStr.split("_").length-1];

    $("div[id$=phoneArea_"+(removedId)+"]").remove();

    if(currentPhoneNum>(removedId-1)){

        removedId =parseInt(removedId) ;
        for(var i=removedId+1;i<=currentPhoneNum;i++ ){

            idStr = $("div[id$=phoneArea_"+(i)+"]").attr("id");
            $("div[id$=phoneArea_"+i+"]").attr("id",idStr.replace(i,(i-1)));

            idStr = $("input[id$=phone_"+(i)+"]").attr("id");
            $("input[id$=phone_"+i+"]").attr("id",idStr.replace(i,(i-1)));

            idStr = $("select[id$=phoneType"+(i)+"]").attr("id");
            $("select[id$=phoneType"+i+"]").attr("id",idStr.replace(i,(i-1)));

            idStr = $("a[id$=btnajax_removePhone_"+(i)+"]").attr("id");
            $("a[id$=btnajax_removePhone_"+i+"]").attr("id",idStr.replace(i,(i-1)));

            idStr = $("a[id$=btnajax_addPhone_"+(i)+"]").attr("id");
            $("a[id$=btnajax_addPhone_"+i+"]").attr("id",idStr.replace(i,(i-1)));

        }

    }

    currentPhoneNum = currentPhoneNum-1;
    adjustPhoneButton();
    controlAddPhoneButton();



}

function removeEmail(self){

    var idStr = $(self).attr("id");
    var removedId = idStr.split("_")[idStr.split("_").length-1];

    $("div[id$=emailArea_"+(removedId)+"]").remove();

    if(currentEmailNum>(removedId-1)){

        removedId =parseInt(removedId) ;
        for(var i=removedId+1;i<=currentEmailNum;i++ ){

            idStr = $("div[id$=emailArea_"+(i)+"]").attr("id");
            $("div[id$=emailArea_"+i+"]").attr("id",idStr.replace(i,(i-1)));

            idStr = $("input[id$=email_"+(i)+"]").attr("id");
            $("input[id$=email_"+i+"]").attr("id",idStr.replace(i,(i-1)));

            idStr = $("a[id$=btnajax_removeEmail_"+(i)+"]").attr("id");
            $("a[id$=btnajax_removeEmail_"+i+"]").attr("id",idStr.replace(i,(i-1)));

            idStr = $("a[id$=btnajax_addEmail_"+(i)+"]").attr("id");
            $("a[id$=btnajax_addEmail_"+i+"]").attr("id",idStr.replace(i,(i-1)));

        }

    }

    currentEmailNum = currentEmailNum-1;
    adjustEmailButton();



}




function saveToPassForUser(){
    var addressResult=[];
    for(var i=1;i<=currentAddressNum;i++){
        addressResult[i-1]={
            "addressId": $("input[id$=addressId_"+i+"]").val()||0,
            "orgId": 0,
            "addressTypeId": $("select[id$=addressType_"+i+"]").val()||0,
            "streetAddress1": $("input[id$=address_"+i+"]").val(),
            "streetAddress2":"",
            "streetAddress3":"",
            "stateOrProvince": $("input[id$=state_"+i+"]").val(),
            "countryId": $("select[id$=country_"+i+"]").val()||0,
            "postalCode":  $("input[id$=zip_"+i+"]").val(),
            "city": $("input[id$=city_"+i+"]").val()

        };

    }

    $("input[id$='addressJson']").val(JSON.stringify(addressResult));

    var emailResult=[];
    for(var i=1;i<=currentEmailNum;i++){
        emailResult[i-1]={
            "emailAddress": $("input[id$=email_"+i+"]").val(),
            "emailType":""

        };

    }

    $("input[id$='emailJson']").val(JSON.stringify(emailResult));



    var phoneResult=[];
    for(var i=1;i<=currentPhoneNum;i++){
        phoneResult[i-1]={
            "phoneNumber": $("input[id$=phone_"+i+"]").val() ,
            "phoneType": $("select[id$=phoneType_"+i+"]").val()||0
        };
    }
    $("input[id$='phoneJson']").val(JSON.stringify(phoneResult));


}


function saveToPass(){
    var addressResult=[];

    for(var i=1;i<=currentAddressNum;i++){
        addressResult[i-1]={
            "id": $("input[id$=addressId_"+i+"]").val()||0,
            "orgId": 0,
             "addressType": $("select[id$=addressType_"+i+"]").val()||0,
             "countryId": $("select[id$=customerCountry_"+i+"]").val()||0,
            "geoId": $("select[id$=addressRegion_"+i+"]").val()||0,
             "streeAddress1": $("input[id$=address1_"+i+"]").val(),
              "streeAddress2": $("input[id$=address2_"+i+"]").val(),
            "streeAddress3": $("input[id$=address3_"+i+"]").val(),
            "streeAddress4": $("input[id$=address4_"+i+"]").val(),
            "city": $("input[id$=city_"+i+"]").val(),
            "postalCode":  $("input[id$=postalcode_"+i+"]").val(),
            "stateOrProvince": $("input[id$=province_"+i+"]").val()

        };

    }

    $("input[id$='addressJson']").val(JSON.stringify(addressResult));

    var csiResult=[];

    for(var i=1;i<=currentCSINum;i++){
        csiResult[i-1]={
            "id": $("input[id$=id_"+i+"]").val()||0,
            "csi": $("input[id$=csiId_"+i+"]").val(),
            "territoryId": $("select[id$=csiCountry_"+i+"]").val()||0

        };

    }

    $("input[id$='csiJson']").val(JSON.stringify(csiResult));





}




(function($) {

    $.extend($.fn, {

        validate: function( options ) {

            // if nothing is selected, return nothing; can't chain anyway
            if ( !this.length ) {
                if ( options && options.debug && window.console ) {
                    console.warn( "Nothing selected, can't validate, returning nothing." );
                }
                return;
            }

            // check if a validator for this form was already created
            var validator = $.data( this[0], "validator" );
            if ( validator ) {
                return validator;
            }

            // Add novalidate tag if HTML5.
            this.attr( "novalidate", "novalidate" );

            validator = new $.validator( options, this[0] );
            $.data( this[0], "validator", validator );

            if ( validator.settings.onsubmit ) {

                this.validateDelegate( ":submit", "click", function( event ) {
                    if ( validator.settings.submitHandler ) {
                        validator.submitButton = event.target;
                    }
                    // allow suppressing validation by adding a cancel class to the submit button
                    if ( $(event.target).hasClass("cancel") ) {
                        validator.cancelSubmit = true;
                    }

                    // allow suppressing validation by adding the html5 formnovalidate attribute to the submit button
                    if ( $(event.target).attr("formnovalidate") !== undefined ) {
                        validator.cancelSubmit = true;
                    }
                });

                // validate the form on submit
                this.submit( function( event ) {
                    if ( validator.settings.debug ) {
                        // prevent form submit to be able to see console output
                        event.preventDefault();
                    }
                    function handle() {
                        var hidden;
                        if ( validator.settings.submitHandler ) {
                            if ( validator.submitButton ) {
                                // insert a hidden input as a replacement for the missing submit button
                                hidden = $("<input type='hidden'/>").attr("name", validator.submitButton.name).val( $(validator.submitButton).val() ).appendTo(validator.currentForm);
                            }
                            validator.settings.submitHandler.call( validator, validator.currentForm, event );
                            if ( validator.submitButton ) {
                                // and clean up afterwards; thanks to no-block-scope, hidden can be referenced
                                hidden.remove();
                            }
                            return false;
                        }
                        return true;
                    }

                    // prevent submit for invalid forms or custom submit handlers
                    if ( validator.cancelSubmit ) {
                        validator.cancelSubmit = false;
                        return handle();
                    }
                    if ( validator.form() ) {
                        if ( validator.pendingRequest ) {
                            validator.formSubmitted = true;
                            return false;
                        }
                        return handle();
                    } else {
                        validator.focusInvalid();
                        return false;
                    }
                });
            }

            return validator;
        },

        valid: function() {
            if ( $(this[0]).is("form")) {
                return this.validate().form();
            } else {
                var valid = true;
                var validator = $(this[0].form).validate();
                this.each(function() {
                    valid = valid && validator.element(this);
                });
                return valid;
            }
        },
        // attributes: space seperated list of attributes to retrieve and remove
        removeAttrs: function( attributes ) {
            var result = {},
                $element = this;
            $.each(attributes.split(/\s/), function( index, value ) {
                result[value] = $element.attr(value);
                $element.removeAttr(value);
            });
            return result;
        },

        rules: function( command, argument ) {
            var element = this[0];

            if ( command ) {
                var settings = $.data(element.form, "validator").settings;
                var staticRules = settings.rules;
                var existingRules = $.validator.staticRules(element);
                switch(command) {
                    case "add":
                        $.extend(existingRules, $.validator.normalizeRule(argument));
                        // remove messages from rules, but allow them to be set separetely
                        delete existingRules.messages;
                        staticRules[element.name] = existingRules;
                        if ( argument.messages ) {
                            settings.messages[element.name] = $.extend( settings.messages[element.name], argument.messages );
                        }
                        break;
                    case "remove":
                        if ( !argument ) {
                            delete staticRules[element.name];
                            return existingRules;
                        }
                        var filtered = {};
                        $.each(argument.split(/\s/), function( index, method ) {
                            filtered[method] = existingRules[method];
                            delete existingRules[method];
                        });
                        return filtered;
                }
            }

            var data = $.validator.normalizeRules(
                $.extend(
                    {},
                    $.validator.classRules(element),
                    $.validator.attributeRules(element),
                    $.validator.dataRules(element),
                    $.validator.staticRules(element)
                ), element);

            // make sure required is at front
            if ( data.required ) {
                var param = data.required;
                delete data.required;
                data = $.extend({required: param}, data);
            }

            return data;
        }
    });

// Custom selectors
    $.extend($.expr[":"], {

        blank: function( a ) { return !$.trim("" + $(a).val()); },

        filled: function( a ) { return !!$.trim("" + $(a).val()); },

        unchecked: function( a ) { return !$(a).prop("checked"); }
    });

// constructor for validator
    $.validator = function( options, form ) {
        this.settings = $.extend( true, {}, $.validator.defaults, options );
        this.currentForm = form;
        this.init();
    };

    $.validator.format = function( source, params ) {
        if ( arguments.length === 1 ) {
            return function() {
                var args = $.makeArray(arguments);
                args.unshift(source);
                return $.validator.format.apply( this, args );
            };
        }
        if ( arguments.length > 2 && params.constructor !== Array  ) {
            params = $.makeArray(arguments).slice(1);
        }
        if ( params.constructor !== Array ) {
            params = [ params ];
        }
        $.each(params, function( i, n ) {
            source = source.replace( new RegExp("\\{" + i + "\\}", "g"), function() {
                return n;
            });
        });
        return source;
    };

    $.extend($.validator, {

        defaults: {
            messages: {},
            groups: {},
            rules: {},
            errorClass: "errors",
            validClass: "valid",
            errorElement: "label",
            focusInvalid: true,
            errorContainer: $([]),
            errorLabelContainer: $([]),
            onsubmit: true,
            ignore: ":hidden",
            ignoreTitle: false,
            onfocusin: function( element, event ) {
                this.lastActive = element;

                // hide error label and remove error class on focus if enabled
                if ( this.settings.focusCleanup && !this.blockFocusCleanup ) {
                    if ( this.settings.unhighlight ) {
                        this.settings.unhighlight.call( this, element, this.settings.errorClass, this.settings.validClass );
                    }
                    this.addWrapper(this.errorsFor(element)).hide();
                }
            },
            onfocusout: function( element, event ) {
                if ( !this.checkable(element) && (element.name in this.submitted || !this.optional(element)) ) {
                    this.element(element);
                }
            },
            onkeyup: function( element, event ) {
                if ( event.which === 9 && this.elementValue(element) === "" ) {
                    return;
                } else if ( element.name in this.submitted || element === this.lastElement ) {
                    this.element(element);
                }
            },
            onclick: function( element, event ) {
                // click on selects, radiobuttons and checkboxes
                if ( element.name in this.submitted ) {
                    this.element(element);
                }
                // or option elements, check parent select in that case
                else if ( element.parentNode.name in this.submitted ) {
                    this.element(element.parentNode);
                }
            },
            highlight: function( element, errorClass, validClass ) {
                if ( element.type === "radio" ) {
                    this.findByName(element.name).addClass(errorClass).removeClass(validClass);
                } else {
                    $(element).addClass(errorClass).removeClass(validClass);
                }
            },
            unhighlight: function( element, errorClass, validClass ) {
                if ( element.type === "radio" ) {
                    this.findByName(element.name).removeClass(errorClass).addClass(validClass);
                } else {
                    $(element).removeClass(errorClass).addClass(validClass);
                }
            }
        },


        setDefaults: function( settings ) {
            $.extend( $.validator.defaults, settings );
        },

        messages: {
            required: "This field is required.",
            remote: "Please fix this field.",
            email: "Please enter a valid email address.",
            url: "Please enter a valid URL.",
            date: "Please enter a valid date.",
            dateISO: "Please enter a valid date (ISO).",
            number: "Please enter a valid number.",
            digits: "Please enter only digits.",
            creditcard: "Please enter a valid credit card number.",
            equalTo: "Please enter the same value again.",
            maxlength: $.validator.format("Please enter no more than {0} characters."),
            minlength: $.validator.format("Please enter at least {0} characters."),
            rangelength: $.validator.format("Please enter a value between {0} and {1} characters long."),
            range: $.validator.format("Please enter a value between {0} and {1}."),
            max: $.validator.format("Please enter a value less than or equal to {0}."),
            min: $.validator.format("Please enter a value greater than or equal to {0}.")
        },

        autoCreateRanges: false,

        prototype: {

            init: function() {
                this.labelContainer = $(this.settings.errorLabelContainer);
                this.errorContext = this.labelContainer.length && this.labelContainer || $(this.currentForm);
                this.containers = $(this.settings.errorContainer).add( this.settings.errorLabelContainer );
                this.submitted = {};
                this.valueCache = {};
                this.pendingRequest = 0;
                this.pending = {};
                this.invalid = {};
                this.reset();

                var groups = (this.groups = {});
                $.each(this.settings.groups, function( key, value ) {
                    if ( typeof value === "string" ) {
                        value = value.split(/\s/);
                    }
                    $.each(value, function( index, name ) {
                        groups[name] = key;
                    });
                });
                var rules = this.settings.rules;
                $.each(rules, function( key, value ) {
                    rules[key] = $.validator.normalizeRule(value);
                });

                function delegate(event) {
                    var validator = $.data(this[0].form, "validator"),
                        eventType = "on" + event.type.replace(/^validate/, "");
                    if ( validator.settings[eventType] ) {
                        validator.settings[eventType].call(validator, this[0], event);
                    }
                }
                $(this.currentForm)
                    .validateDelegate(":text, [type='password'], [type='file'], select, textarea, " +
                        "[type='number'], [type='search'] ,[type='tel'], [type='url'], " +
                        "[type='email'], [type='datetime'], [type='date'], [type='month'], " +
                        "[type='week'], [type='time'], [type='datetime-local'], " +
                        "[type='range'], [type='color'] ",
                        "focusin focusout keyup", delegate)
                    .validateDelegate("[type='radio'], [type='checkbox'], select, option", "click", delegate);

                if ( this.settings.invalidHandler ) {
                    $(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler);
                }
            },


            form: function() {
                this.checkForm();
                $.extend(this.submitted, this.errorMap);
                this.invalid = $.extend({}, this.errorMap);
                if ( !this.valid() ) {
                    $(this.currentForm).triggerHandler("invalid-form", [this]);
                }
                this.showErrors();
                return this.valid();
            },

            checkForm: function() {
                this.prepareForm();
                for ( var i = 0, elements = (this.currentElements = this.elements()); elements[i]; i++ ) {
                    this.check( elements[i] );
                }
                return this.valid();
            },


            element: function( element ) {
                element = this.validationTargetFor( this.clean( element ) );
                this.lastElement = element;
                this.prepareElement( element );
                this.currentElements = $(element);
                var result = this.check( element ) !== false;
                if ( result ) {
                    delete this.invalid[element.name];
                } else {
                    this.invalid[element.name] = true;
                }
                if ( !this.numberOfInvalids() ) {
                    // Hide error containers on last error
                    this.toHide = this.toHide.add( this.containers );
                }
               //this.showErrors();
                return result;
            },


            showErrors: function( errors ) {
                if ( errors ) {
                    // add items to error list and map
                    $.extend( this.errorMap, errors );
                    this.errorList = [];
                    for ( var name in errors ) {
                        this.errorList.push({
                            message: errors[name],
                            element: this.findByName(name)[0]
                        });
                    }
                    // remove items from success list
                    this.successList = $.grep( this.successList, function( element ) {
                        return !(element.name in errors);
                    });
                }
                if ( this.settings.showErrors ) {
                    this.settings.showErrors.call( this, this.errorMap, this.errorList );
                } else {
                    this.defaultShowErrors();
                }
            },


            resetForm: function() {
                if ( $.fn.resetForm ) {
                    $(this.currentForm).resetForm();
                }
                this.submitted = {};
                this.lastElement = null;
                this.prepareForm();
                this.hideErrors();
                this.elements().removeClass( this.settings.errorClass ).removeData( "previousValue" );
            },

            numberOfInvalids: function() {
                return this.objectLength(this.invalid);
            },

            objectLength: function( obj ) {
                var count = 0;
                for ( var i in obj ) {
                    count++;
                }
                return count;
            },

            hideErrors: function() {
                this.addWrapper( this.toHide ).hide();
            },

            valid: function() {
                return this.size() === 0;
            },

            size: function() {
                return this.errorList.length;
            },

            focusInvalid: function() {
                if ( this.settings.focusInvalid ) {
                    try {
                        $(this.findLastActive() || this.errorList.length && this.errorList[0].element || [])
                            .filter(":visible")
                            .focus()
                            // manually trigger focusin event; without it, focusin handler isn't called, findLastActive won't have anything to find
                            .trigger("focusin");
                    } catch(e) {
                        // ignore IE throwing errors when focusing hidden elements
                    }
                }
            },

            findLastActive: function() {
                var lastActive = this.lastActive;
                return lastActive && $.grep(this.errorList, function( n ) {
                    return n.element.name === lastActive.name;
                }).length === 1 && lastActive;
            },

            elements: function() {
                var validator = this,
                    rulesCache = {};

                // select all valid inputs inside the form (no submit or reset buttons)
                return $(this.currentForm)
                    .find("input, select, textarea")
                    .not(":submit, :reset, :image, [disabled]")
                    .not( this.settings.ignore )
                    .filter(function() {
                        if ( !this.name && validator.settings.debug && window.console ) {
                            console.error( "%o has no name assigned", this);
                        }

                        // select only the first element for each name, and only those with rules specified
                        if ( this.name in rulesCache || !validator.objectLength($(this).rules()) ) {
                            return false;
                        }

                        rulesCache[this.name] = true;
                        return true;
                    });
            },

            clean: function( selector ) {
                return $(selector)[0];
            },

            errors: function() {
                var errorClass = this.settings.errorClass.replace(" ", ".");
                return $(this.settings.errorElement + "." + errorClass, this.errorContext);
            },

            reset: function() {
                this.successList = [];
                this.errorList = [];
                this.errorMap = {};
                this.toShow = $([]);
                this.toHide = $([]);
                this.currentElements = $([]);
            },

            prepareForm: function() {
                this.reset();
                this.toHide = this.errors().add( this.containers );
            },

            prepareElement: function( element ) {
                this.reset();
                this.toHide = this.errorsFor(element);
            },

            elementValue: function( element ) {
                var type = $(element).attr("type"),
                    val = $(element).val();

                if ( type === "radio" || type === "checkbox" ) {
                    return $("input[name='" + $(element).attr("name") + "']:checked").val();
                }

                if ( typeof val === "string" ) {
                    return val.replace(/\r/g, "");
                }
                return val;
            },

            check: function( element ) {
                element = this.validationTargetFor( this.clean( element ) );

                var rules = $(element).rules();
                var dependencyMismatch = false;
                var val = this.elementValue(element);
                var result;

                for (var method in rules ) {
                    var rule = { method: method, parameters: rules[method] };
                    try {

                        result = $.validator.methods[method].call( this, val, element, rule.parameters );

                        // if a method indicates that the field is optional and therefore valid,
                        // don't mark it as valid when there are no other rules
                        if ( result === "dependency-mismatch" ) {
                            dependencyMismatch = true;
                            continue;
                        }
                        dependencyMismatch = false;

                        if ( result === "pending" ) {
                            this.toHide = this.toHide.not( this.errorsFor(element) );
                            return;
                        }

                        if ( !result ) {
                            this.formatAndAdd( element, rule );
                            return false;
                        }
                    } catch(e) {
                        if ( this.settings.debug && window.console ) {
                            console.log( "Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.", e );
                        }
                        throw e;
                    }
                }
                if ( dependencyMismatch ) {
                    return;
                }
                if ( this.objectLength(rules) ) {
                    this.successList.push(element);
                }
                return true;
            },

            // return the custom message for the given element and validation method
            // specified in the element's HTML5 data attribute
            customDataMessage: function( element, method ) {
                return $(element).data("msg-" + method.toLowerCase()) || (element.attributes && $(element).attr("data-msg-" + method.toLowerCase()));
            },

            // return the custom message for the given element name and validation method
            customMessage: function( name, method ) {
                var m = this.settings.messages[name];
                return m && (m.constructor === String ? m : m[method]);
            },

            // return the first defined argument, allowing empty strings
            findDefined: function() {
                for(var i = 0; i < arguments.length; i++) {
                    if ( arguments[i] !== undefined ) {
                        return arguments[i];
                    }
                }
                return undefined;
            },

            defaultMessage: function( element, method ) {
                return this.findDefined(
                    this.customMessage( element.name, method ),
                    this.customDataMessage( element, method ),
                    // title is never undefined, so handle empty string as undefined
                    !this.settings.ignoreTitle && element.title || undefined,
                    $.validator.messages[method],
                    "<strong>Warning: No message defined for " + element.name + "</strong>"
                );
            },

            formatAndAdd: function( element, rule ) {
                var message = this.defaultMessage( element, rule.method ),
                    theregex = /\$?\{(\d+)\}/g;
                if ( typeof message === "function" ) {
                    message = message.call(this, rule.parameters, element);
                } else if (theregex.test(message)) {
                    message = $.validator.format(message.replace(theregex, "{$1}"), rule.parameters);
                }
                this.errorList.push({
                    message: message,
                    element: element
                });

                this.errorMap[element.name] = message;
                this.submitted[element.name] = message;
            },

            addWrapper: function( toToggle ) {
                if ( this.settings.wrapper ) {
                    toToggle = toToggle.add( toToggle.parent( this.settings.wrapper ) );
                }
                return toToggle;
            },

            defaultShowErrors: function() {
                var i, elements;
                for ( i = 0; this.errorList[i]; i++ ) {
                    var error = this.errorList[i];
                    if ( this.settings.highlight ) {
                        this.settings.highlight.call( this, error.element, this.settings.errorClass, this.settings.validClass );
                    }
                   // this.showLabel( error.element, error.message );
                }
                if ( this.errorList.length ) {
                    this.toShow = this.toShow.add( this.containers );
                }
                if ( this.settings.success ) {
                    for ( i = 0; this.successList[i]; i++ ) {
                      //  this.showLabel( this.successList[i] );
                    }
                }
                if ( this.settings.unhighlight ) {
                    for ( i = 0, elements = this.validElements(); elements[i]; i++ ) {
                        this.settings.unhighlight.call( this, elements[i], this.settings.errorClass, this.settings.validClass );
                    }
                }
                this.toHide = this.toHide.not( this.toShow );
                this.hideErrors();
                this.addWrapper( this.toShow ).show();
            },

            validElements: function() {
                return this.currentElements.not(this.invalidElements());
            },

            invalidElements: function() {
                return $(this.errorList).map(function() {
                    return this.element;
                });
            },

            showLabel: function( element, message ) {
                var label = this.errorsFor( element );
                if ( label.length ) {
                    // refresh error/success class
                    label.removeClass( this.settings.validClass ).addClass( this.settings.errorClass );
                    // replace message on existing label
                    label.html(message);
                } else {
                    // create label
                    label = $("<" + this.settings.errorElement + ">")
                        .attr("for", this.idOrName(element))
                        .addClass(this.settings.errorClass)
                        .html(message || "");
                    if ( this.settings.wrapper ) {
                        // make sure the element is visible, even in IE
                        // actually showing the wrapped element is handled elsewhere
                        label = label.hide().show().wrap("<" + this.settings.wrapper + "/>").parent();
                    }
                    if ( !this.labelContainer.append(label).length ) {
                        if ( this.settings.errorPlacement ) {
                            this.settings.errorPlacement(message, $(element) );
                        } else {
                            label.insertAfter(element);
                        }
                    }
                }
                if ( !message && this.settings.success ) {
                    label.text("");
                    if ( typeof this.settings.success === "string" ) {
                        label.addClass( this.settings.success );
                    } else {
                        this.settings.success( label, element );
                    }
                }
                this.toShow = this.toShow.add(label);
            },

            errorsFor: function( element ) {
                var name = this.idOrName(element);
                return this.errors().filter(function() {
                    return $(this).attr("for") === name;
                });
            },

            idOrName: function( element ) {
                return this.groups[element.name] || (this.checkable(element) ? element.name : element.id || element.name);
            },

            validationTargetFor: function( element ) {
                // if radio/checkbox, validate first element in group instead
                if ( this.checkable(element) ) {
                    element = this.findByName( element.name ).not(this.settings.ignore)[0];
                }
                return element;
            },

            checkable: function( element ) {
                return (/radio|checkbox/i).test(element.type);
            },

            findByName: function( name ) {
                return $(this.currentForm).find("[name='" + name + "']");
            },

            getLength: function( value, element ) {
                switch( element.nodeName.toLowerCase() ) {
                    case "select":
                        return $("option:selected", element).length;
                    case "input":
                        if ( this.checkable( element) ) {
                            return this.findByName(element.name).filter(":checked").length;
                        }
                }
                return value.length;
            },

            depend: function( param, element ) {
                return this.dependTypes[typeof param] ? this.dependTypes[typeof param](param, element) : true;
            },

            dependTypes: {
                "boolean": function( param, element ) {
                    return param;
                },
                "string": function( param, element ) {
                    return !!$(param, element.form).length;
                },
                "function": function( param, element ) {
                    return param(element);
                }
            },

            optional: function( element ) {
                var val = this.elementValue(element);
                return !$.validator.methods.required.call(this, val, element) && "dependency-mismatch";
            },

            startRequest: function( element ) {
                if ( !this.pending[element.name] ) {
                    this.pendingRequest++;
                    this.pending[element.name] = true;
                }
            },

            stopRequest: function( element, valid ) {
                this.pendingRequest--;
                // sometimes synchronization fails, make sure pendingRequest is never < 0
                if ( this.pendingRequest < 0 ) {
                    this.pendingRequest = 0;
                }
                delete this.pending[element.name];
                if ( valid && this.pendingRequest === 0 && this.formSubmitted && this.form() ) {
                    $(this.currentForm).submit();
                    this.formSubmitted = false;
                } else if (!valid && this.pendingRequest === 0 && this.formSubmitted) {
                    $(this.currentForm).triggerHandler("invalid-form", [this]);
                    this.formSubmitted = false;
                }
            },

            previousValue: function( element ) {
                return $.data(element, "previousValue") || $.data(element, "previousValue", {
                    old: null,
                    valid: true,
                    message: this.defaultMessage( element, "remote" )
                });
            }

        },

        classRuleSettings: {
            required: {required: true},
            email: {email: true},
            url: {url: true},
            date: {date: true},
            dateISO: {dateISO: true},
            number: {number: true},
            digits: {digits: true},
            creditcard: {creditcard: true}
        },

        addClassRules: function( className, rules ) {
            if ( className.constructor === String ) {
                this.classRuleSettings[className] = rules;
            } else {
                $.extend(this.classRuleSettings, className);
            }
        },

        classRules: function( element ) {
            var rules = {};
            var classes = $(element).attr("class");
            if ( classes ) {
                $.each(classes.split(" "), function() {
                    if ( this in $.validator.classRuleSettings ) {
                        $.extend(rules, $.validator.classRuleSettings[this]);
                    }
                });
            }
            return rules;
        },

        attributeRules: function( element ) {
            var rules = {};
            var $element = $(element);
            var type = $element[0].getAttribute("type");

            for (var method in $.validator.methods) {
                var value;

                // support for <input required> in both html5 and older browsers
                if ( method === "required" ) {
                    value = $element.get(0).getAttribute(method);
                    // Some browsers return an empty string for the required attribute
                    // and non-HTML5 browsers might have required="" markup

                    if ( value === "") {
                        value = true;
                    }
                    // force non-HTML5 browsers to return bool
                    value = !!value;
                } else {
                    value = $element.attr(method);
                }

                // convert the value to a number for number inputs, and for text for backwards compability
                // allows type="date" and others to be compared as strings
                if ( /min|max/.test( method ) && ( type === null || /number|range|text/.test( type ) ) ) {
                    value = Number(value);
                }

                if ( value ) {
                    rules[method] = value;
                } else if ( type === method && type !== 'range' ) {
                    // exception: the jquery validate 'range' method
                    // does not test for the html5 'range' type
                    rules[method] = true;
                }
            }

            // maxlength may be returned as -1, 2147483647 (IE) and 524288 (safari) for text inputs
            if ( rules.maxlength && /-1|2147483647|524288/.test(rules.maxlength) ) {
                delete rules.maxlength;
            }

            return rules;
        },

        dataRules: function( element ) {
            var method, value,
                rules = {}, $element = $(element);
            for (method in $.validator.methods) {
                value = $element.data("rule-" + method.toLowerCase());
                if ( value !== undefined ) {
                    rules[method] = value;
                }
            }
            return rules;
        },

        staticRules: function( element ) {
            var rules = {};
            var validator = $.data(element.form, "validator");
            if ( validator.settings.rules ) {
                rules = $.validator.normalizeRule(validator.settings.rules[element.name]) || {};
            }
            return rules;
        },

        normalizeRules: function( rules, element ) {
            // handle dependency check
            $.each(rules, function( prop, val ) {
                // ignore rule when param is explicitly false, eg. required:false
                if ( val === false ) {
                    delete rules[prop];
                    return;
                }
                if ( val.param || val.depends ) {
                    var keepRule = true;
                    switch (typeof val.depends) {
                        case "string":
                            keepRule = !!$(val.depends, element.form).length;
                            break;
                        case "function":
                            keepRule = val.depends.call(element, element);
                            break;
                    }
                    if ( keepRule ) {
                        rules[prop] = val.param !== undefined ? val.param : true;
                    } else {
                        delete rules[prop];
                    }
                }
            });

            // evaluate parameters
            $.each(rules, function( rule, parameter ) {
                rules[rule] = $.isFunction(parameter) ? parameter(element) : parameter;
            });

            // clean number parameters
            $.each(['minlength', 'maxlength'], function() {
                if ( rules[this] ) {
                    rules[this] = Number(rules[this]);
                }
            });
            $.each(['rangelength', 'range'], function() {
                var parts;
                if ( rules[this] ) {
                    if ( $.isArray(rules[this]) ) {
                        rules[this] = [Number(rules[this][0]), Number(rules[this][1])];
                    } else if ( typeof rules[this] === "string" ) {
                        parts = rules[this].split(/[\s,]+/);
                        rules[this] = [Number(parts[0]), Number(parts[1])];
                    }
                }
            });

            if ( $.validator.autoCreateRanges ) {
                // auto-create ranges
                if ( rules.min && rules.max ) {
                    rules.range = [rules.min, rules.max];
                    delete rules.min;
                    delete rules.max;
                }
                if ( rules.minlength && rules.maxlength ) {
                    rules.rangelength = [rules.minlength, rules.maxlength];
                    delete rules.minlength;
                    delete rules.maxlength;
                }
            }

            return rules;
        },

        // Converts a simple string to a {string: true} rule, e.g., "required" to {required:true}
        normalizeRule: function( data ) {
            if ( typeof data === "string" ) {
                var transformed = {};
                $.each(data.split(/\s/), function() {
                    transformed[this] = true;
                });
                data = transformed;
            }
            return data;
        },


        addMethod: function( name, method, message ) {
            $.validator.methods[name] = method;
            $.validator.messages[name] = message !== undefined ? message : $.validator.messages[name];
            if ( method.length < 3 ) {
                $.validator.addClassRules(name, $.validator.normalizeRule(name));
            }
        },

        methods: {


            required: function( value, element, param ) {
                // check if dependency is met
                if ( !this.depend(param, element) ) {
                    return "dependency-mismatch";
                }
                if ( element.nodeName.toLowerCase() === "select" ) {

                    // could be an array for select-multiple or a string, both are fine this way
                    var val = $(element).val();
                    if(val==-1){
                        return false;
                    }
                    return val && val.length > 0;
                }
                if ( this.checkable(element) ) {
                    return this.getLength(value, element) > 0;
                }
                return $.trim(value).length > 0;
            },


            email: function( value, element ) {

                return this.optional(element) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(value);
            },


            url: function( value, element ) {

                return this.optional(element) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
            },


            date: function( value, element ) {
                return this.optional(element) || !/Invalid|NaN/.test(new Date(value).toString());
            },


            dateISO: function( value, element ) {
                return this.optional(element) || /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(value);
            },


            number: function( value, element ) {
                return this.optional(element) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
            },


            digits: function( value, element ) {
                return this.optional(element) || /^\d+$/.test(value);
            },


            creditcard: function( value, element ) {
                if ( this.optional(element) ) {
                    return "dependency-mismatch";
                }
                // accept only spaces, digits and dashes
                if ( /[^0-9 \-]+/.test(value) ) {
                    return false;
                }
                var nCheck = 0,
                    nDigit = 0,
                    bEven = false;

                value = value.replace(/\D/g, "");

                for (var n = value.length - 1; n >= 0; n--) {
                    var cDigit = value.charAt(n);
                    nDigit = parseInt(cDigit, 10);
                    if ( bEven ) {
                        if ( (nDigit *= 2) > 9 ) {
                            nDigit -= 9;
                        }
                    }
                    nCheck += nDigit;
                    bEven = !bEven;
                }

                return (nCheck % 10) === 0;
            },


            minlength: function( value, element, param ) {
                var length = $.isArray( value ) ? value.length : this.getLength($.trim(value), element);
                return this.optional(element) || length >= param;
            },


            maxlength: function( value, element, param ) {
                var length = $.isArray( value ) ? value.length : this.getLength($.trim(value), element);
                return this.optional(element) || length <= param;
            },


            rangelength: function( value, element, param ) {
                var length = $.isArray( value ) ? value.length : this.getLength($.trim(value), element);
                return this.optional(element) || ( length >= param[0] && length <= param[1] );
            },


            min: function( value, element, param ) {
                return this.optional(element) || value >= param;
            },


            max: function( value, element, param ) {
                return this.optional(element) || value <= param;
            },


            range: function( value, element, param ) {
                return this.optional(element) || ( value >= param[0] && value <= param[1] );
            },


            equalTo: function( value, element, param ) {
                // bind to the blur event of the target in order to revalidate whenever the target field is updated
                // TODO find a way to bind the event just once, avoiding the unbind-rebind overhead
                var target = $(param);
                if ( this.settings.onfocusout ) {
                    target.unbind(".validate-equalTo").bind("blur.validate-equalTo", function() {
                        $(element).valid();
                    });
                }
                return value === target.val();
            },


            remote: function( value, element, param ) {
                if ( this.optional(element) ) {
                    return "dependency-mismatch";
                }

                var previous = this.previousValue(element);
                if (!this.settings.messages[element.name] ) {
                    this.settings.messages[element.name] = {};
                }
                previous.originalMessage = this.settings.messages[element.name].remote;
                this.settings.messages[element.name].remote = previous.message;

                param = typeof param === "string" && {url:param} || param;

                if ( previous.old === value ) {
                    return previous.valid;
                }

                previous.old = value;
                var validator = this;
                this.startRequest(element);
                var data = {};
                data[element.name] = value;
                $.ajax($.extend(true, {
                    url: param,
                    mode: "abort",
                    port: "validate" + element.name,
                    dataType: "json",
                    data: data,
                    success: function( response ) {
                        validator.settings.messages[element.name].remote = previous.originalMessage;
                        var valid = response === true || response === "true";
                        if ( valid ) {
                            var submitted = validator.formSubmitted;
                            validator.prepareElement(element);
                            validator.formSubmitted = submitted;
                            validator.successList.push(element);
                            delete validator.invalid[element.name];
                            validator.showErrors();
                        } else {
                            var errors = {};
                            var message = response || validator.defaultMessage( element, "remote" );
                            errors[element.name] = previous.message = $.isFunction(message) ? message(value) : message;
                            validator.invalid[element.name] = true;
                            validator.showErrors(errors);
                        }
                        previous.valid = valid;
                        validator.stopRequest(element, valid);
                    }
                }, param));
                return "pending";
            }

        }

    });

// deprecated, use $.validator.format instead
    $.format = $.validator.format;

}(jQuery));

// ajax mode: abort
// usage: $.ajax({ mode: "abort"[, port: "uniqueport"]});
// if mode:"abort" is used, the previous request on that port (port can be undefined) is aborted via XMLHttpRequest.abort()
(function($) {
    var pendingRequests = {};
    // Use a prefilter if available (1.5+)
    if ( $.ajaxPrefilter ) {
        $.ajaxPrefilter(function( settings, _, xhr ) {
            var port = settings.port;
            if ( settings.mode === "abort" ) {
                if ( pendingRequests[port] ) {
                    pendingRequests[port].abort();
                }
                pendingRequests[port] = xhr;
            }
        });
    } else {
        // Proxy ajax
        var ajax = $.ajax;
        $.ajax = function( settings ) {
            var mode = ( "mode" in settings ? settings : $.ajaxSettings ).mode,
                port = ( "port" in settings ? settings : $.ajaxSettings ).port;
            if ( mode === "abort" ) {
                if ( pendingRequests[port] ) {
                    pendingRequests[port].abort();
                }
                pendingRequests[port] = ajax.apply(this, arguments);
                return pendingRequests[port];
            }
            return ajax.apply(this, arguments);
        };
    }
}(jQuery));

// provides delegate(type: String, delegate: Selector, handler: Callback) plugin for easier event delegation
// handler is only called when $(event.target).is(delegate), in the scope of the jquery-object for event.target
(function($) {
    $.extend($.fn, {
        validateDelegate: function( delegate, type, handler ) {
            return this.bind(type, function( event ) {
                var target = $(event.target);
                if ( target.is(delegate) ) {
                    return handler.apply(target, arguments);
                }
            });
        }
    });
}(jQuery));

function getMoreErrMessage(){

    return "";
}
function validation(){
    $("#mainForm").validate({
        showErrors: function(errorMap, errorList) {
            $("#errorMesTable").children().remove();
            $("#globalMsg").children().remove();
            $("#globalMsg").hide();
            if(getMoreErrMessage()!=''){
                errorList.push({
                    message: getMoreErrMessage(),
                    element: ""
                });
            }

            for(var i=errorList.length; i>0;i--){
                $("#errorMesTable").append("<tr><td><div ></div></td></tr>");
            }
            $("#errorMesTable").find( "div" ).addClass( "af_messages_detail" );


            if(errorList.length>0){
                $(".af_messages_detail").each(
                    function(i){
                        if(errorList[i]) $(this).append(errorList[i].message);
                    }
                );



                var childs = $("#error_message").children().clone();

                $(childs).find("*").each(function(index, element) {
                    if(element.id){
                        element.id = element.id+"_clone";
                    }
                });



                $("#globalMsg").html( childs );
                $("#globalMsg").show();
                refreshCamMessage();

            }

            this.defaultShowErrors();
        }
    }
    );
    var baseMessage=' Value is required!';
    $(".required").each(
        function(i){
            var name=$(this).parent().text().replace("*","").replace(":","");
            $(this).parent().siblings("div").children().rules( "add", {
                required: true,
                messages: {
                    required: name+baseMessage
                }
            });

        }
    );
}




/*
 *
 * Copyright (c) 2006-2010 Sam Collett (http://www.texotela.co.uk)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Version 2.2.5
 * Demo: http://www.texotela.co.uk/code/jquery/select/
 *
 *
 */

;(function($) {

    /**
     * Adds (single/multiple) options to a select box (or series of select boxes)
     *
     * @name     addOption
     * @author   Sam Collett (http://www.texotela.co.uk)
     * @type     jQuery
     * @example  $("#myselect").addOption("Value", "Text"); // add single value (will be selected)
     * @example  $("#myselect").addOption("Value 2", "Text 2", false); // add single value (won't be selected)
     * @example  $("#myselect").addOption({"foo":"bar","bar":"baz"}, false); // add multiple values, but don't select
     *
     */
    $.fn.addOption = function()
    {
        var add = function(el, v, t, sO, index)
        {
            var option = document.createElement("option");
            option.value = v, option.text = t;
            // get options
            var o = el.options;
            // get number of options
            var oL = o.length;
            if(!el.cache)
            {
                el.cache = {};
                // loop through existing options, adding to cache
                for(var i = 0; i < oL; i++)
                {
                    el.cache[o[i].value] = i;
                }
            }
            if (index || index == 0)
            {
                // we're going to insert these starting  at a specific index...
                // this has the side effect of el.cache[v] being the
                // correct value for the typeof check below
                var ti = option;
                for(var ii =index; ii <= oL; ii++)
                {
                    var tmp = el.options[ii];
                    el.options[ii] = ti;
                    o[ii] = ti;
                    el.cache[o[ii].value] = ii;
                    ti = tmp;
                }
            }

            // add to cache if it isn't already
            if(typeof el.cache[v] == "undefined") el.cache[v] = oL;
            el.options[el.cache[v]] = option;
            if(sO)
            {
                option.selected = true;
            }
        };

        var a = arguments;
        if(a.length == 0) return this;
        // select option when added? default is true
        var sO = true;
        // multiple items
        var m = false;
        // other variables
        var items, v, t;
        if(typeof(a[0]) == "object")
        {
            m = true;
            items = a[0];
        }
        if(a.length >= 2)
        {
            if(typeof(a[1]) == "boolean")
            {
                sO = a[1];
                startindex = a[2];
            }
            else if(typeof(a[2]) == "boolean")
            {
                sO = a[2];
                startindex = a[1];
            }
            else
            {
                startindex = a[1];
            }
            if(!m)
            {
                v = a[0];
                t = a[1];
            }
        }
        this.each(
            function()
            {
                if(this.nodeName.toLowerCase() != "select") return;
                if(m)
                {
                    for(var item in items)
                    {
                        add(this, item, items[item], sO, startindex);
                        startindex += 1;
                    }
                }
                else
                {
                    add(this, v, t, sO, startindex);
                }
            }
        );
        return this;
    };

    /**
     * Add options via ajax
     *
     * @name     ajaxAddOption
     * @author   Sam Collett (http://www.texotela.co.uk)
     * @type     jQuery
     * @param    String url      Page to get options from (must be valid JSON)
     * @param    Object params   (optional) Any parameters to send with the request
     * @param    Boolean select  (optional) Select the added options, default true
     * @param    Function fn     (optional) Call this function with the select object as param after completion
     * @param    Array args      (optional) Array with params to pass to the function afterwards
     * @example  $("#myselect").ajaxAddOption("myoptions.php");
     * @example  $("#myselect").ajaxAddOption("myoptions.php", {"code" : "007"});
     * @example  $("#myselect").ajaxAddOption("myoptions.php", {"code" : "007"}, false, sortoptions, [{"dir": "desc"}]);
     *
     */
    $.fn.ajaxAddOption = function(url, params, select, fn, args)
    {
        if(typeof(url) != "string") return this;
        if(typeof(params) != "object") params = {};
        if(typeof(select) != "boolean") select = true;
        this.each(
            function()
            {
                var el = this;
                $.getJSON(url,
                    params,
                    function(r)
                    {
                        $(el).addOption(r, select);
                        if(typeof fn == "function")
                        {
                            if(typeof args == "object")
                            {
                                fn.apply(el, args);
                            }
                            else
                            {
                                fn.call(el);
                            }
                        }
                    }
                );
            }
        );
        return this;
    };

    /**
     * Removes an option (by value or index) from a select box (or series of select boxes)
     *
     * @name     removeOption
     * @author   Sam Collett (http://www.texotela.co.uk)
     * @type     jQuery
     * @param    String|RegExp|Number what  Option to remove
     * @param    Boolean selectedOnly       (optional) Remove only if it has been selected (default false)
     * @example  $("#myselect").removeOption("Value"); // remove by value
     * @example  $("#myselect").removeOption(/^val/i); // remove options with a value starting with 'val'
     * @example  $("#myselect").removeOption(/./); // remove all options
     * @example  $("#myselect").removeOption(/./, true); // remove all options that have been selected
     * @example  $("#myselect").removeOption(0); // remove by index
     * @example  $("#myselect").removeOption(["myselect_1","myselect_2"]); // values contained in passed array
     *
     */
    $.fn.removeOption = function()
    {
        var a = arguments;
        if(a.length == 0) return this;
        var ta = typeof(a[0]);
        var v, index;
        // has to be a string or regular expression (object in IE, function in Firefox)
        if(ta == "string" || ta == "object" || ta == "function" )
        {
            v = a[0];
            // if an array, remove items
            if(v.constructor == Array)
            {
                var l = v.length;
                for(var i = 0; i<l; i++)
                {
                    this.removeOption(v[i], a[1]);
                }
                return this;
            }
        }
        else if(ta == "number") index = a[0];
        else return this;
        this.each(
            function()
            {
                if(this.nodeName.toLowerCase() != "select") return;
                // clear cache
                if(this.cache) this.cache = null;
                // does the option need to be removed?
                var remove = false;
                // get options
                var o = this.options;
                if(!!v)
                {
                    // get number of options
                    var oL = o.length;
                    for(var i=oL-1; i>=0; i--)
                    {
                        if(v.constructor == RegExp)
                        {
                            if(o[i].value.match(v))
                            {
                                remove = true;
                            }
                        }
                        else if(o[i].value == v)
                        {
                            remove = true;
                        }
                        // if the option is only to be removed if selected
                        if(remove && a[1] === true) remove = o[i].selected;
                        if(remove)
                        {
                            o[i] = null;
                        }
                        remove = false;
                    }
                }
                else
                {
                    // only remove if selected?
                    if(a[1] === true)
                    {
                        remove = o[index].selected;
                    }
                    else
                    {
                        remove = true;
                    }
                    if(remove)
                    {
                        this.remove(index);
                    }
                }
            }
        );
        return this;
    };

    /**
     * Sort options (ascending or descending) in a select box (or series of select boxes)
     *
     * @name     sortOptions
     * @author   Sam Collett (http://www.texotela.co.uk)
     * @type     jQuery
     * @param    Boolean ascending   (optional) Sort ascending (true/undefined), or descending (false)
     * @example  // ascending
     * $("#myselect").sortOptions(); // or $("#myselect").sortOptions(true);
     * @example  // descending
     * $("#myselect").sortOptions(false);
     *
     */
    $.fn.sortOptions = function(ascending)
    {
        // get selected values first
        var sel = $(this).selectedValues();
        var a = typeof(ascending) == "undefined" ? true : !!ascending;
        this.each(
            function()
            {
                if(this.nodeName.toLowerCase() != "select") return;
                // get options
                var o = this.options;
                // get number of options
                var oL = o.length;
                // create an array for sorting
                var sA = [];
                // loop through options, adding to sort array
                for(var i = 0; i<oL; i++)
                {
                    sA[i] = {
                        v: o[i].value,
                        t: o[i].text
                    }
                }
                // sort items in array
                sA.sort(
                    function(o1, o2)
                    {
                        // option text is made lowercase for case insensitive sorting
                        o1t = o1.t.toLowerCase(), o2t = o2.t.toLowerCase();
                        // if options are the same, no sorting is needed
                        if(o1t == o2t) return 0;
                        if(a)
                        {
                            return o1t < o2t ? -1 : 1;
                        }
                        else
                        {
                            return o1t > o2t ? -1 : 1;
                        }
                    }
                );
                // change the options to match the sort array
                for(var i = 0; i<oL; i++)
                {
                    o[i].text = sA[i].t;
                    o[i].value = sA[i].v;
                }
            }
        ).selectOptions(sel, true); // select values, clearing existing ones
        return this;
    };
    /**
     * Selects an option by value
     *
     * @name     selectOptions
     * @author   Mathias Bank (http://www.mathias-bank.de), original function
     * @author   Sam Collett (http://www.texotela.co.uk), addition of regular expression matching
     * @type     jQuery
     * @param    String|RegExp|Array value  Which options should be selected
     * can be a string or regular expression, or an array of strings / regular expressions
     * @param    Boolean clear  Clear existing selected options, default false
     * @example  $("#myselect").selectOptions("val1"); // with the value 'val1'
     * @example  $("#myselect").selectOptions(["val1","val2","val3"]); // with the values 'val1' 'val2' 'val3'
     * @example  $("#myselect").selectOptions(/^val/i); // with the value starting with 'val', case insensitive
     *
     */
    $.fn.selectOptions = function(value, clear)
    {
        var v = value;
        var vT = typeof(value);
        // handle arrays
        if(vT == "object" && v.constructor == Array)
        {
            var $this = this;
            $.each(v, function()
                {
                    $this.selectOptions(this, clear);
                }
            );
        };
        var c = clear || false;
        // has to be a string or regular expression (object in IE, function in Firefox)
        if(vT != "string" && vT != "function" && vT != "object") return this;
        this.each(
            function()
            {
                if(this.nodeName.toLowerCase() != "select") return this;
                // get options
                var o = this.options;
                // get number of options
                var oL = o.length;
                for(var i = 0; i<oL; i++)
                {
                    if(v.constructor == RegExp)
                    {
                        if(o[i].value.match(v))
                        {
                            o[i].selected = true;
                        }
                        else if(c)
                        {
                            o[i].selected = false;
                        }
                    }
                    else
                    {
                        if(o[i].value == v)
                        {
                            o[i].selected = true;
                        }
                        else if(c)
                        {
                            o[i].selected = false;
                        }
                    }
                }
            }
        );
        return this;
    };

    /**
     * Copy options to another select
     *
     * @name     copyOptions
     * @author   Sam Collett (http://www.texotela.co.uk)
     * @type     jQuery
     * @param    String to  Element to copy to
     * @param    String which  (optional) Specifies which options should be copied - 'all' or 'selected'. Default is 'selected'
     * @example  $("#myselect").copyOptions("#myselect2"); // copy selected options from 'myselect' to 'myselect2'
     * @example  $("#myselect").copyOptions("#myselect2","selected"); // same as above
     * @example  $("#myselect").copyOptions("#myselect2","all"); // copy all options from 'myselect' to 'myselect2'
     *
     */
    $.fn.copyOptions = function(to, which)
    {
        var w = which || "selected";
        if($(to).size() == 0) return this;
        this.each(
            function()
            {
                if(this.nodeName.toLowerCase() != "select") return this;
                // get options
                var o = this.options;
                // get number of options
                var oL = o.length;
                for(var i = 0; i<oL; i++)
                {
                    if(w == "all" || (w == "selected" && o[i].selected))
                    {
                        $(to).addOption(o[i].value, o[i].text);
                    }
                }
            }
        );
        return this;
    };

    /**
     * Checks if a select box has an option with the supplied value
     *
     * @name     containsOption
     * @author   Sam Collett (http://www.texotela.co.uk)
     * @type     Boolean|jQuery
     * @param    String|RegExp value  Which value to check for. Can be a string or regular expression
     * @param    Function fn          (optional) Function to apply if an option with the given value is found.
     * Use this if you don't want to break the chaining
     * @example  if($("#myselect").containsOption("val1")) alert("Has an option with the value 'val1'");
     * @example  if($("#myselect").containsOption(/^val/i)) alert("Has an option with the value starting with 'val'");
     * @example  $("#myselect").containsOption("val1", copyoption).doSomethingElseWithSelect(); // calls copyoption (user defined function) for any options found, chain is continued
     *
     */
    $.fn.containsOption = function(value, fn)
    {
        var found = false;
        var v = value;
        var vT = typeof(v);
        var fT = typeof(fn);
        // has to be a string or regular expression (object in IE, function in Firefox)
        if(vT != "string" && vT != "function" && vT != "object") return fT == "function" ? this: found;
        this.each(
            function()
            {
                if(this.nodeName.toLowerCase() != "select") return this;
                // option already found
                if(found && fT != "function") return false;
                // get options
                var o = this.options;
                // get number of options
                var oL = o.length;
                for(var i = 0; i<oL; i++)
                {
                    if(v.constructor == RegExp)
                    {
                        if (o[i].value.match(v))
                        {
                            found = true;
                            if(fT == "function") fn.call(o[i], i);
                        }
                    }
                    else
                    {
                        if (o[i].value == v)
                        {
                            found = true;
                            if(fT == "function") fn.call(o[i], i);
                        }
                    }
                }
            }
        );
        return fT == "function" ? this : found;
    };

    /**
     * Returns values which have been selected
     *
     * @name     selectedValues
     * @author   Sam Collett (http://www.texotela.co.uk)
     * @type     Array
     * @example  $("#myselect").selectedValues();
     *
     */
    $.fn.selectedValues = function()
    {
        var v = [];
        this.selectedOptions().each(
            function()
            {
                v[v.length] = this.value;
            }
        );
        return v;
    };

    /**
     * Returns text which has been selected
     *
     * @name     selectedTexts
     * @author   Sam Collett (http://www.texotela.co.uk)
     * @type     Array
     * @example  $("#myselect").selectedTexts();
     *
     */
    $.fn.selectedTexts = function()
    {
        var t = [];
        this.selectedOptions().each(
            function()
            {
                t[t.length] = this.text;
            }
        );
        return t;
    };

    /**
     * Returns options which have been selected
     *
     * @name     selectedOptions
     * @author   Sam Collett (http://www.texotela.co.uk)
     * @type     jQuery
     * @example  $("#myselect").selectedOptions();
     *
     */
    $.fn.selectedOptions = function()
    {
        return this.find("option:selected");
    };

})(jQuery);

function validateEmail(email) {
    var re = /^(([^&lt;&gt;()[\]\\.,;:\s@\"]+(\.[^&lt;&gt;()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}