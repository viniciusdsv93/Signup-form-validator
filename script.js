let objValidator = {
    handleSubmit: (event) => {
        event.preventDefault();
        let send = true;

        objValidator.clearErrors();

        let inputs = document.querySelectorAll('.text-field');
        for (let i = 0; i < inputs.length; i++) {
            let check = objValidator.checkInput(inputs[i]);

            if (check == false) {
                send = false;
            }
        }

        if (send) {
            alert('Data successfully submited.');
        }

    },
    checkInput: (input) => {

        let rules = input.getAttribute('data-rules');
        rules = rules.split('|');
        
        if (rules[0] == 'required') {
            if (input.value == '') {
                input.classList.add('border-red');
                let error = input.nextElementSibling;
                error.classList.remove('hidden');
                return false;
            }
            else {
                if (rules[1] == 'email') {
                    let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    if (!regex.test(input.value.toLowerCase())) {
                        let errorEmail = input.nextElementSibling;
                        errorEmail.innerHTML = 'Looks like this is not an email';
                        input.classList.add('border-red');
                        errorEmail.classList.remove('hidden');
                        return false;
                    }
                }
            }
        }    
    },
    clearErrors: () => {
        let inputs = document.querySelectorAll('.text-field');

        inputs.forEach(element => {
            element.classList.remove('border-red');
            element.nextElementSibling.classList.add('hidden');
        });
    }
}


let formSubmit = document.querySelector('.validator');

formSubmit.addEventListener('submit', objValidator.handleSubmit);