document.addEventListener('DOMContentLoaded', function () {

    const form = document.querySelector('#form');
    const button = document.querySelector('#submit');

    button.addEventListener('click', function (event) {
        event.preventDefault(); // prevent form submission

        // validate form fields
        const firstname = document.querySelector('#firstname').value;
        const lastname = document.querySelector('#lastname').value;
        const grade = document.querySelector('#grade').value;
        const school = document.querySelector('#school').value;
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;
        const confirm_password = document.querySelector('#confirm_password').value;


        if (firstname.length < 3) {
            alert('Username must be at least 3 characters long');
            return;
        }

        if (lastname.length < 3) {
            alert('Username must be at least 3 characters long');
            return;
        }

        if (!validateEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }

        if (password.length < 6) {
            alert('Password must be at least 6 characters long');
            return;
        }

        if (confirm_password != password && !(document.activeElement === password) && !(document.activeElement === confirm_password)) {
            alert('Password and Confirm Password don\'t match');
            return;
        }

        // create JSON object
        const data = {
            "FirstName": firstname,
            "LastName": lastname,
            "Email": email,
            "Grade": grade,
            "School": school,
            "Password": password,
            "ConfirmPassword": confirm_password
        }

        const order = ["FirstName", "LastName", "Email", "Grade", "School", "Password", "ConfirmPassword"];

        const orderedData = {};
        order.forEach(key => {
            orderedData[key] = data[key];
        });

        const json = JSON.stringify(orderedData);
        console.log(json);

        // send JSON data to API endpoint
        fetch('https://unitybackend20230212174016.azurewebsites.net/api/Account/Register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: json
        })
        .then(response => {
            console.log(response.status); // logs 201
            console.log(response.headers.get('Content-Type')); // logs "application/json"
            return response.json();
          })
          .then(data => {
            console.log(data); // logs the parsed JSON response data
          })
          .catch(error => {
            console.error(error);
          });
    });

    function validateEmail(email) {
        const regex = /\S+@\S+\.\S+/;
        return regex.test(email);
    }

});
