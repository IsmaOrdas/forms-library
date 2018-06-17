//Utils
if (typeof Array.isArray === 'undefined') {
    Array.isArray = function(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
    }
};

//Library
window.form = (function() {
    var inputsObj = null;
    var inputsCreated = [];
    var formReady = false;
    var formObj = {
        form: createElement("form")
    }

    function init(callback) {
        if (inputsObj === null) {
            return;
        }

        checkInput();
        callback && callback(formObj);
    }

    function checkInput() {
        if (inputsObj.length) {
            inputsObj.map((obj, index) => { createElement("input", index, obj); });
        } else {
            console.warn("No inputs entered");
        }

        if (inputsCreated.length) {
            appendToForm();
            formReady = true;
        }
    }

    function appendToForm() {
        inputsCreated.map((input) => {
            formObj.form.appendChild(input);
        });
    }

    function createElement(tag, index, obj = null) {
        var element = document.createElement(tag);

        if (obj !== null) {
            setAttributes(obj, element, index)
        }
        
        if (tag && tag === "input") {
            inputsCreated.push(element);
        }
        
        return element;
                
    }

    function setAttributes(attrs, el, index = null) {
        if (!attrs.hasOwnProperty("id") && index !== null) {
            attrs.id = attrs.hasOwnProperty("class") ? `${attrs.class}-${index + 1}` : index + 1;
        }

        Object.keys(attrs).forEach((key) => {
            return el.setAttribute(key, attrs[key]);
        });

    }
    
    return {
        createForm: function(inputs, callback = null) {
            inputsObj = inputs;
            init(callback);

            if (formReady) {
                return formObj;
            } else {
                console.error("There was an error creating the form");
            }
        }
    }

})();


function prueba(form) {
    console.log("probando callback", form.form)
}

window.form.createForm([{class:"prueba", type: "text", name: "user", id: "campo_nombre", required: true}, {type: "email", name: "email", id: "campo_email"}, {type: "submit", value: "Submit"}], prueba)