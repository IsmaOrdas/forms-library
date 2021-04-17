window.form = (function() {
    let fieldsList = null;
    let fieldsCreated = [];
    let formReady = false;
    let formObj = {
        form: createElement({ element: 'form' })
    }

    function init(callback) {
        if (fieldsList === null) {
            return;
        }

        checkInput();
        callback && callback(formObj);
    }

    function checkInput() {
        if (fieldsList.length) {
            fieldsList.map((obj, index) => { createElement(obj, index); });
        } else {
            console.error("No inputs entered");
        }

        if (fieldsCreated.length) {
            appendFieldsToForm();
            formReady = true;
        }
    }

    function appendFieldsToForm() {
        fieldsCreated.map((input) => {
            formObj.form.appendChild(input);
        });
    }

    function createElement(elementObj, index) {
        let element = document.createElement(elementObj.element);

        if (elementObj.element !== 'form') {
            fieldsCreated.push(element);
        }

        if (elementObj.attrs) {
            setElementAttributes(elementObj.attrs, element, index)
        }

        return element;
                
    }

    function setElementAttributes(attrs, el, index = null) {
        if (!attrs.hasOwnProperty("id") && index !== null) {
            attrs.id = attrs.hasOwnProperty("class") ? `${attrs.class}-${index + 1}` : index + 1;
        }

        Object.keys(attrs).forEach((key) => el.setAttribute(key, attrs[key]));

    }
    
    return {
        createForm: function(fields, htmlSelector, callback = null) {
            fieldsList = fields;
            init(callback);

            if (!formReady) {
                console.error("There was an error creating the form.");
            }
            
            document.querySelector(htmlSelector).appendChild(formObj.form);
        }
    }

})();


function callbackTest(form) {
    console.log('Form created');
}

window.form.createForm(
    [
        {
            element: "input", 
            attrs: {
                class: "input-field", type: "text", name: "username", id: "username", placeholder: "User name"
            }
        },
        {
            element: "input", 
            attrs: {
                class: "input-field", type: "password", name: "password", id: "password", placeholder: "Password"
            }
        },
        {
            element: "input",
            attrs: {
                class: "input-field", title: "Submit", type: "submit"
            }
        }
    ],
    '#form-wrap',
    callbackTest
);