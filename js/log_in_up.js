var userAccount = [{
        name: "Quan",
        email: 'quan@gmail.com',
        username: 'hongquan',
        password: '12345',
        address: 'Quangtri',
        role: 'admin',
        phonenumber: '123456789',
    },
    {
        name: "Quan",
        email: 'hongquan1@gmail.com',
        username: 'hongquan1',
        password: '12345',
        address: 'Quangtri',
        role: 'admin',
        phonenumber: '123456789',
    }
];

function reload() {
    window.reload();
}

// function checklogin() {
//     var valEmail = document.getElementById('email').value;

//     if (isEmail(valEmail) == false) {
//         document.getElementById("emailError").innerHTML = "không phải email";
//     }

//     var valPassword = document.getElementById('password').value;
//     if (validationPassword(valPassword) == false) {
//         document.getElementById("passwordError").innerHTML = '<div> ít nhất 6 kí tự </div>';
//     }
// }



function login() {
    var check = false;
    save_account();
    var valEmail = document.getElementById('email').value;
    var valPassword = document.getElementById('password').value;

    for (var i in userAccount) {
        if (valEmail == userAccount[i].email) {
            if (valPassword == userAccount[i].password && userAccount[i].role == 'admin') {
                alert('Login Success!');
                var li = '<li class="nav-item">';
                li += '<a class="nav-link" href="./Admin page.html">Admin page</a>';
                li += '</li>';
                document.getElementById("admin_page").innerHTML = li;
                window.location.href = "home_page.html";

            } else {
                alert('password is wrong');
            }
            check = true;
            break;
        }
    }
    if (check == false) {
        alert("email is wrong!");
    }

}

// function isEmail(inputEmail) {
//     var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
//     return regex.test(inputEmail);
// }

// function validationPassword(inputPassword) {
//     var count = inputPassword.length;
//     return inputPassword.length >= 6;
// }

function signup() {
    var username, pass, pass2;
    username = document.getElementById('sg_username').value;
    pass = document.getElementById("sg_pass1").value;
    pass2 = document.getElementById("sg_pass2").value;
    var check = true;
    for (var i in userAccount) {
        if (username == userAccount[i].username) {
            alert("Use was used!!");
            check = false;
            break;
        }
    }
    if (pass !== pass2) {
        alert('ConfirmPassword was wrong!');
        check = false;
    }

    if (check) {
        userAccount.push({
            name: document.getElementById('sg_name').value,
            email: document.getElementById('sg_email').value,
            username: username,
            password: pass2,
            address: document.getElementById('sg_address').value,
            role: "client"
        })
        save_account();
    }
}

function save_account() {
    localStorage.setItem('listAccount', JSON.stringify(userAccount))
}

function load_account() {
    userAccount = JSON.parse(localStorage.getItem('listAccount'))
}

if (localStorage.getItem('listAccount') != null) {
    load_account();
}