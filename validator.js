class Validator {
    constructor(config, formId)  {
        this.mainEl = config
        this.errors = {}
        this.formId = formId
        this.createErrorsObject()
        this.findInput()
        this.checkForm()
    }

    checkForm() {
        let allInputs = document.querySelectorAll(`${this.formId} input`)
    
        for(let inp of  allInputs) {
            if(inp.value == "") {
                return false
            }
            
        }
        return true
    }

    createErrorsObject() {
        for(let elem in this.mainEl) {
            this.errors[elem] = []
            //console.log(this.errors)
        }
    }


    findInput() {
        for(let elem in this.mainEl) {
            let config = document.querySelector(`input[name=${elem}]`)
            config.addEventListener("input", this.validate.bind(this))
        }
    }

    validate(e) {
        let allElements = this.mainEl
        let currentInput = e.target
        let inputName = currentInput.name
        let inputValue = currentInput.value

        // console.log(inputName)
        // console.log(inputValue)

        this.errors[inputName] = []

        if(allElements[inputName].required) {
            if(inputValue === "") {
                this.errors[inputName].push("This field is required")
            }
        }

        if(allElements[inputName].email) {
            if(!this.validateEmail(inputValue)) {
                this.errors[inputName].push("Please enter valid email")
            }
        }

        if(inputValue.length < allElements[inputName].min || inputValue.length > allElements[inputName].max) {
            this.errors[inputName].push(`This fild must be between ${allElements[inputName].min} and ${allElements[inputName].max} characters`)
        }

        if(allElements[inputName].matching) {
            let matchEl = document.querySelector("#lozinka").value
            if(inputValue !== matchEl) {
                this.errors[inputName].push("Password is not same")
            }
        }

        if(this.errors[inputName].length == 0) {
            this.errors[inputName] = []
        }



        this.parseErrors(this.errors)
    }

    // checkform()
    // {
    //   if (document.querySelector(this.formId).value == "")
    // {
    //     // something is wrong
    //     console.log(this.formId.value)
    //     alert('There is a problem with the first field');
    //     return false;
    // }

    // return true;
    // }

    validationPassed() {
		for(let key of Object.keys(this.errors)) {
			if(this.errors[key].length > 0) {
				return false;
			}
		}

		return true;
	}

    validateEmail(value) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))   {
          return (true)
        }
    }

    parseErrors(error) {
        for(let elem of document.querySelectorAll("ul")) {
            elem.remove()
        }

        for(let key in error) {
            let inputEl = document.querySelector(`input[name=${key}]`)
            let parentEl = inputEl.parentElement
            let ul = document.createElement("ul")
            // console.log(error[key])

            error[key].forEach((err) => {
                let li = document.createElement("li")
                li.append(err)
                ul.append(li)
                parentEl.append(ul)
            })
        }
    }

}
