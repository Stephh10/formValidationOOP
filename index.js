let config = {
    "ime_prezime":{
        required:true,
        min:4,
        max:15
    },
    "korisnicko_ime":{
        required:true,
        min:4,
        max:15
    },
    "email":{
        required:true,
        email:true,
    },
    "lozinka":{
        required:true,
        min:5,
        max:20,
        // matching:"ponovi_lozinku"
    },
    "ponovi_lozinku":{
        required:true,
        min:5,
        max:20,
        matching:"lozinka"
    }
}

let validator = new Validator(config, "#validForm")
let form = document.querySelector("#validForm")

form.addEventListener("submit", (e) => {
    e.preventDefault()
    if(validator.validationPassed() && validator.checkForm()) {
        alert("Everything good")
    }
    else {
        alert("Not Good")
    }
})

