# forms-library

Demo project

Small library to create a form and inject it into the DOM. Call the method by passing a list of fields and a callback (optional) to execute once the form is created.

Limitations: 
  - Only accepts "input" as form elements, so no labels, button, radiogroup and so on.
  
  
Usage example: 

```
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
```
