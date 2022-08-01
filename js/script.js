//Focuses on the 'Name' input upon page load

let userName = document.getElementById('name');
userName.focus();

//Displays the 'other' input field if the 'other' job role is selected.
//This is based on 'other' being the last job role option.

let jobRole = document.getElementById('title');
let otherIndex = (jobRole.length)-1
let otherField = document.getElementById('other-job-role')

otherField.style.display = 'none';

jobRole.addEventListener('change', () => {
    let userJob = jobRole.selectedIndex

    if ( userJob === otherIndex ) {
        otherField.style.display = 'block';
    } else {
        otherField.style.display = 'none';
    }
});

//This section first disables the 'color' option.
//When users click a theme, the 'color' options will be enabled.
//Only 'color' options that are available in the selected theme will be visible.

const color = document.getElementById('color');
const design = document.getElementById('design');

color.disabled = true;

design.addEventListener('change', () => {

    color.options.selectedIndex = 0;

    if (design.value === 'js puns') {
        for (let i = 0; i < color.length; i++) {
            color.disabled = false;
            let colorOption = color.options[i];
            if (colorOption.dataset.theme === 'js puns' ) {
                colorOption.hidden = false;
            } else {
                colorOption.hidden = true;
            }
        }

    } else if (design.value === 'heart js') {
        for (let i = 0; i < color.length; i++) {
            color.disabled = false;
            let colorOption = color.options[i];
            if (colorOption.dataset.theme === 'heart js' ) {
                colorOption.hidden = false;
            } else {
                colorOption.hidden = true;
            }
        }
    } 
});

/*This listens for users to check/uncheck to select/deselect an activity. 

  The for loop checks for scheduling conflicts. If the activity is selected, 
  all other activities taking place at the same time will be disabled. 
  If the activity is deselected, the conflicting activities will be reenabled.

  The final conditional creates a running total of the activities' cost.
  If the activity is selected, the cost will be added to the total.
  If the activity is deselected, the cost will be removed from the total.

  The number of activities is stored as a variable for form validation.*/

const activitiesField = document.getElementById('activities');
let totalCost = 0;
let totalSelected = 0;

activitiesField.addEventListener('change', e => {
    const selected = e.target;
    const selectedTime = e.target.getAttribute('data-day-and-time')
    const selectedCost = parseInt(selected.getAttribute('data-cost'));
    const totalDisplay = document.getElementById('activities-cost');

    for (let i = 0; i < checkboxes.length; i++) {

        const otherActivity = checkboxes[i];
        const otherActivityField = otherActivity.parentElement.classList;
        const otherActivityTime = otherActivity.getAttribute('data-day-and-time');

        if ( selected.checked ===  true && 
            selected !== otherActivity && 
            selectedTime === otherActivityTime) {

            otherActivity.disabled = true;
            otherActivityField.add('disabled');

        } else if ( selected.checked === false && 
            selected !== otherActivity && 
            selectedTime === otherActivityTime ) {
                
            otherActivity.disabled = false;
            otherActivityField.remove('disabled');
        }
    }

    if ( selected.checked ) {
        totalCost += selectedCost;
        totalSelected += 1;
    } else {
        totalCost -= selectedCost;
        totalSelected -= 1;
    }

    totalDisplay.textContent = `Total: $${totalCost}`;

})

//This section adds more noticable focus indicators
//for the 'activities' section of the form.

const form = document.querySelector('form');
const checkboxes = form.querySelectorAll('input[type="checkbox"]');

for ( let i = 0; i < checkboxes.length; i++ ) {

    checkboxes[i].addEventListener('focus', e => {
        e.target.parentElement.classList.add('focus')
    })

    checkboxes[i].addEventListener('blur', e => {
        e.target.parentElement.classList.remove('focus')
    })
 
}

//This section displays the user's payment intofrmation.
// It is set to display 'credit card' upon page load. 
// Based on the user's selected payment, the paymentDisplay function will be
// called to display the selected payment input fields and hide what is not selected.

const payment = document.getElementById('payment');
const credit = document.getElementById('credit-card');
const paypal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');

function paymentDisplay( displayed, hidden1, hidden2 ) {

    displayed.style.display = 'block';
    hidden1.style.display = 'none';
    hidden2.style.display = 'none';

}

payment.selectedIndex = 1;
paymentDisplay( credit, paypal, bitcoin )

payment.addEventListener('change', () => {

    if ( payment.selectedIndex === 1 ) {
        paymentDisplay( credit, paypal, bitcoin );
    
    } else if ( payment.selectedIndex === 2 ) {
        paymentDisplay( paypal, credit, bitcoin );
    
    } else if ( payment.selectedIndex === 3 ) {
        paymentDisplay( bitcoin, credit, paypal );
    
    }

})

//This is a series of functions to validate user input. 
//The name, email, and activities functions are called upon the submission 
//of the page, but page submission will be prevented if validation
//fails and hints will be displayed on the invalid input field.
//If the user selects to pay by credit card (payment index 1), 
//the functions to validate the card number, zip code, and cvv
//will also run and prevent submission if validation fails.

const email = document.getElementById('email');

const nameValidator = () => {
    let nameValue = userName.value;
    const nameIsValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(nameValue); 
    return nameIsValid;
}

const emailValidator = () => {
    let emailValue = email.value;
    const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailValue);
    return emailIsValid;
}

const activitiesValidator = () => {
    const activitiesSectionIsValid = totalSelected > 0;
    return activitiesSectionIsValid;
}

const cardValidator = () => {
    let cardNumber = document.getElementById('cc-num').value;
    const cardIsValid = /^\d{13,16}$/.test(cardNumber);
    return cardIsValid;
}

const zipValidator = () => {
    let zip = document.getElementById('zip').value;
    const zipIsValid = /^\d{5}$/.test(zip);
    return zipIsValid;
}

const cvvValidator = () => {
    let cvv = document.getElementById('cvv').value;
    const cvvIsValid = /^\d{3}$/.test(cvv);
    return cvvIsValid;
}

const nameField = userName.parentElement;
const emailField = email.parentElement;
const cardField = document.getElementById('cc-num').parentElement;
const zipField = document.getElementById('zip').parentElement;
const cvvField = document.getElementById('cvv').parentElement;

function notValid(field) {
    field.classList.add('not-valid');
    field.classList.remove('valid');
    field.lastElementChild.style.display = 'block';
}

function valid(field) {
    field.classList.add('valid');
    field.classList.remove('not-valid');
    field.lastElementChild.removeAttribute('style');
}

userName.addEventListener('keyup', e => {

    let nameHint = document.getElementById('name-hint')
 
    if (!nameValidator() && userName.value === 0) {
        nameHint.innerHTML = "Name field cannot be blank"
        notValid(nameField);
    } else if (!nameValidator() && userName.value > 0 ){
        nameHint.innerHTML = "Name field can only include alphabetical characters"
        notValid(nameField);
    } else if (nameValidator()) {
        valid(nameField);
    }
});

form.addEventListener('submit', e => {

    if (!nameValidator()) {
        notValid(nameField);
        e.preventDefault();
    } else if (nameValidator()) {
        valid(nameField);
    }

    if (!emailValidator()) {
        notValid(emailField);
        e.preventDefault();
    } else if (emailValidator()) {
        valid(emailField);
    }

    if (!activitiesValidator()) {
        notValid(activitiesField); 
        e.preventDefault(); 
    } else if (activitiesValidator()) {
        valid(activitiesField);
    } 
    
    if ( payment.selectedIndex === 1 ) {
        if (!cardValidator()) {
            notValid(cardField);
            e.preventDefault();
        } else if (cardValidator()) {
            valid(cardField);
        }

        if (!zipValidator()) {
            notValid(zipField);
            e.preventDefault();
        } else if (zipValidator()) {
            valid(zipField);
        }

        if (!cvvValidator()) {
            notValid(cvvField);
            e.preventDefault();
        } else if (cvvValidator()) {
            valid(cvvField);
        }
    }
});

