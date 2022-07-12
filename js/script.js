//Focuses on the 'Name' input upon page load

let userName = document.getElementById('name');
userName.focus();

//job role

let jobRole = document.getElementById('title');
let otherIndex = (jobRole.length)-1
let otherInput = document.getElementById('other-job-role')

otherInput.style.display = 'none';

jobRole.addEventListener('click', () => {
    let userJob = jobRole.selectedIndex

    if ( userJob === otherIndex ) {
        otherInput.style.display = 'block';
    } else {
        otherInput.style.display = 'none';
    }
});





