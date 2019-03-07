# Ant design Form validation in React JS 

Date: 07/03/2019

----------------------------------------------

use this FormValidation.js file and call in App.js


steps followed:

horizontal layout form from ant design created

form item has been created with the props below

props:

```
    required
    validateStatus="error/success/warning"
    help="Custome error message"
```

define input field as a child of Form.Item

define handlers seperately and set state

defined submit button, button handler calls handleValidation

defined handleValidation function to validate

setting the state errors and messages to display incase of any error

using these errors and messages objects in Form.Item props

clearing the error messages in input handlers

done