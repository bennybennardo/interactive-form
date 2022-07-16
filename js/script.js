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
})

//This listens for users to check or uncheck an activity. 
//If the activity is checked, the cost will be reflected in the total.
//If the activity is unchecked, the cost will be removed from the total.
//The number of activities is stored as a variable for form validation.

const activities = document.getElementById('activities');
let totalCost = 0;
let totalActivities = 0;

activities.addEventListener('change', e => {
    let activity = e.target;
    let activityCost = parseInt(activity.getAttribute('data-cost'));
    let totalDisplay = document.getElementById('activities-cost');

    if ( activity.checked ) {
        totalCost += activityCost;
        totalActivities += 1;
    } else {
        totalCost -= activityCost;
        totalActivities -= 1;
    }

    totalDisplay.textContent = `Total: $${totalCost}`;

})

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
//of the page, but page submission will be prevented if validation fails.
//If the user selects to pay by credit card (payment index 1), 
//the functions to validate the card number, zip code, and cvv
//will also run and prevent submission if validation fails.

const form = document.querySelector('form');
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
    const activitiesSectionIsValid = totalActivities > 0;
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
const activitiesField = activities;
console.log(activitiesField)



form.addEventListener('submit', e => {

    function notValid(field) {
        field.className = 'not-valid';
        field.classList.remove('valid');
        field.lastElementChild.style.display = 'block';
        e.preventDefault();
    }
    
    function valid(field) {
        field.className = 'valid';
        field.classList.remove('not-valid');
        field.lastElementChild.removeAttribute('style');
    
    }

    if (!nameValidator()) {
        notValid(nameField);
    } else if (nameValidator()) {
        valid(nameField);
    }

    if (!emailValidator()) {
        notValid(emailField);
    } else if (emailValidator()) {
        valid(emailField);
    }

    //The rest of this section does not have functioning accessibility 

    if (!activitiesValidator()) {
        activitiesField.className = 'not-valid';
        activitiesField.classList.remove('valid');
        activitiesField.lastElementChild.style.display = 'block';
        e.preventDefault();
    
    } else if (activitiesValidator()) {
        activitiesField.className = 'valid';
        activitiesField.classList.remove('not-valid');
        activitiesField.lastElementChild.removeAttribute('style');
        console.log(activitiesField.lastElementChild)
    

    } else if ( payment.selectedIndex === 1 ) {
        if (!cardValidator() || 
            !zipValidator() || 
            !cvvValidator()) {

            e.preventDefault();
        }
    }
});

//Accessibility

let checkboxes = form.querySelectorAll('input[type="checkbox"]');
console.log(checkboxes);
console.log(checkboxes[1]);

for ( let i = 0; i < checkboxes.length; i++ ) {

    checkboxes[i].addEventListener('focus', e => {
        e.target.parentElement.className = 'focus'
        console.log('focus works')
    })

    checkboxes[i].addEventListener('blur', e => {
        e.target.parentElement.classList.remove('focus')
    })
 
}

