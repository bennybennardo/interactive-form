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

const activities = document.getElementById('activities');
let total = 0;

activities.addEventListener('change', e => {
    let activity = e.target;
    let activityCost = parseInt(activity.getAttribute('data-cost'));
    
    let totalDisplay = document.getElementById('activities-cost');

    if ( activity.checked ) {
        total += activityCost;
    } else {
        total -= activityCost;
    }

    totalDisplay.textContent = `Total: $${total}`;

})

