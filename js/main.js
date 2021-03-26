const api_url = "http://localhost:3000"

function callAPI(endpoint, method, body) {
    return axios({
        method: method,
        url: `${api_url}/${endpoint}`,
        data: body,
    }).catch((err) => {
        console.log(err);
    });
}

function checkLogin() {
    console.log(userOnline.status == "online");
    if (userOnline.status == "online") {
        document.getElementById("login").style.display = "none";
        document.getElementById("signup").style.display = "none";
        document.getElementById("logout").innerHTML = '<a class="nav-link" onclick="logout()" href="">Logout</a>';
        if (userOnline.role == "admin") {
            document.getElementById("adminpage").style.display = "block";

        }
        if (document.querySelector("title").textContent == "show detail") {


            document.querySelector("#inforofTour").classList.add("col-lg-12");
            console.log(document.querySelector("#inforofTour").classList);
            document.getElementById("signup_to_book").style.display = "none";
        }

    }

}

function logout() {
    document.getElementById("login").style.display = "block";
    document.getElementById("signup").style.display = "block";
    document.getElementById("logout").innerHTML = "";
    localStorage.removeItem("userOnline");
    document.getElementById("adminpage").style.display = "none";
    if (document.querySelector("title").textContent == "show detail") {
        document.getElementById("signup_to_book").style.display = "block";
    }

}
var indexPage = '';

function saveIndexPage() {
    localStorage.setItem('indexPagelist', document.querySelector(".nameFile").textContent);
}

function loadIndexPage() {
    indexPage = localStorage.getItem('indexPagelist');
}
if (localStorage.getItem('indexPagelist') != null) {
    loadIndexPage();
}

// PHẦN QUẢN LÍ TOUR ***************************************************************************
function addTour() {
    var tour = {
        id: "",
        nameTour: document.getElementById('nameTour').value,
        remark: document.getElementById('remark').value,
        img: document.getElementById('img').value,
        location: document.getElementById('location').value,
        time: document.getElementById('time').value,
        people: document.getElementById('people').value,
        infor: document.getElementById('infor').value,
        price: document.getElementById('price').value,
        group: document.querySelector('#groupTour').value
    }
    console.log(document.querySelector('#groupTour').value);

    callAPI("Tours", "POST", tour).then((res) => {
        window.location.reload();
    });
}

function updateTour(i) {
    var listTour = '';
    callAPI("Tours", "GET", null).then((res) => {
        listTour = res.data;
        console.log(i);
        console.log(listTour);
        document.getElementById('idd').value = listTour[i].id;
        document.getElementById('named').value = listTour[i].nameTour;
        document.getElementById('remarkd').value = listTour[i].remark;
        document.getElementById('locationd').value = listTour[i].location;
        document.getElementById('timed').value = listTour[i].time;
        document.getElementById('peopled').value = listTour[i].people;
        document.getElementById('inford').value = listTour[i].infor;
        document.getElementById('priced').value = listTour[i].price;
        document.getElementById('imgd').value = listTour[i].img;
        document.querySelector('#groupTourd').value = listTour[i].group;
    });
}

function submitTour() {
    var id_check = document.getElementById('idd').value;
    var tour = {
        nameTour: document.getElementById('named').value,
        remark: document.getElementById('remarkd').value,
        img: document.getElementById('imgd').value,
        location: document.getElementById('locationd').value,
        time: document.getElementById('timed').value,
        people: document.getElementById('peopled').value,
        infor: document.getElementById('inford').value,
        price: document.getElementById('priced').value,
        group: document.querySelector('#groupTourd').value
    }
    callAPI(`Tours/${id_check}`, "PUT", tour).then((response) => {
        window.location.reload();
    });
}

function deleteTour(id) {
    callAPI(`Tours/${id}`, "DELETE", null).then((response) => {
        window.location.reload();
    });
}


function showTours() {
    var listTour = '';
    callAPI("Tours", "GET", null).then((res) => {
        listTour = res.data;
        var row = '';
        for (var i in listTour) {
            row += '<tr>'
            row += '<td>' + listTour[i].id + '</td>'
            row += '<td>' + listTour[i].nameTour + '</td>'
            row += '<td>' + listTour[i].remark + '</td>'
            row += '<td>' + '<img class = "card-img-top" src = "img/' + listTour[i].img + '" style="width: 50px">' + '</td>'
            row += '<td>' + listTour[i].location + '</td>'
            row += '<td>' + listTour[i].time + '</td>'
            row += '<td>' + listTour[i].people + '</td>'
            row += '<td>' + listTour[i].group + '</td>'
            row += '<td>' + listTour[i].price + '</td>'
            row += '<td>' + '<button type="button" class = "btn btn-outline-danger" data-toggle = "modal" data-target = "#updateTour" onclick="updateTour(' + i + ')">'
            row += '<i class="fa fa-cogs"> </i>' + '</button>'
            row += '<button class = "btn ml-1 btn-outline-warning" onclick = "deleteTour(' + listTour[i].id + ')"><i class="fa fa-trash" style="bg-color:red"> </i> </button>' + '</td>'
            row += '</tr>'
        }
        document.getElementById('listTours').innerHTML = row;
    });
}

function displayTours() {
    var row = "";
    var listTour = '';
    callAPI("Tours", "GET", null).then((res) => {
        listTour = res.data;
        var a = 4;
        if (listTour.length >= 4) {
            a = 4;
        } else {
            a = listTour.length;
        }

        for (var i = 0; i < a; i++) {
            row += '<div class="col-lg-3 col-md-6 col-sm-12 col-12 mt-3">';
            row += '<div class="card tour" style="width:auto">';
            row += '<img class="card-img-top" id="img-card" style="width: 400px;height: 200px;" src="img/' + listTour[i].img + '">';
            //  src="img/' +  listTour[i].img + '">';
            row += '<div class="card-title tour-title text-center h5">' + listTour[i].nameTour + '</div>';
            row += '<div class ="price text-center h6">' + listTour[i].price + '$ </div>';
            row += '<button class="text-center btn btn-outline-danger" onclick=""> Đặt tour';
            row += '</button>';
            row += '<button class = "text-center btn btn-outline-success" data-toggle = "modal" data-target = "#detailsTour" onclick="">Details</button>';
            row += '</div>';
            row += '</div>';
        }
        document.getElementById("four_tours").innerHTML = row;

    });
}

function displayMoreTours() {
    var row = "";
    var listTour = '';
    callAPI("Tours", "GET", null).then((res) => {
        listTour = res.data;
        var a = 4;
        if (listTour.length >= 4) {
            for (var i = 4; i < listTour.length; i++) {
                row += '<div class="col-lg-3 col-md-6 col-sm-12 col-12 mt-3">';
                row += '<div class="card tour" style="width:auto">';
                row += '<img class="card-img-top" id="img-card"  style="width: 400px;height: 200px;" src="img/' + listTour[i].img + '">';
                //  src="image/' + data.img + '">';
                row += '<div class="card-title tour-title text-center h5">' + listTour[i].nameTour + '</div>';
                row += '<div class ="price text-center h6">' + listTour[i].price + '$ </div>';
                row += '<button class="text-center btn btn-outline-danger" onclick=""> Đặt tour';
                row += '</button>';
                row += '<button class = "text-center btn btn-outline-success" data-toggle = "modal" data-target = "#detailsTour" onclick="detailsTour(' + i + ')">Details</button>';
                row += '</div>';
                row += '</div>';
            }
            document.getElementById("tours").innerHTML = row;
        } else {
            document.getElementById("tours").innerHTML = '';
        }
    });
}
// PHẦN QUẢN LÍ TOUR end ******************************************************************

// PHẦN QUẢN LÍ TÀI KHOẢN start ***********************************************************
var userOnline = '';

function loaduserOnline() {
    userOnline = JSON.parse(localStorage.getItem('userOnline'));
}
if (localStorage.getItem('userOnline') != null) {
    loaduserOnline();
}

function login() {
    var check = false;
    var userAccount = '';
    var valEmail = document.getElementById('email').value;
    var valPassword = document.getElementById('password').value;
    callAPI("userAccount", "GET", null).then((res) => {
        userAccount = res.data;

        for (var i in userAccount) {
            if (valEmail == userAccount[i].email) {
                if (valPassword == userAccount[i].password) {
                    if (userAccount[i].role == 'admin') {
                        userAccount[i].status = "online";
                        localStorage.setItem('userOnline', JSON.stringify(userAccount[i]));
                        console.log(indexPage);
                        alert('Login Success!');
                        if (indexPage == '') {
                            console.log(indexPage);
                            window.location.href = "HomePage.html";
                        } else {
                            console.log(indexPage)
                            window.location.href = indexPage;
                        }

                    }
                    if (userAccount[i].role == 'user') {
                        userAccount[i].status = "online";
                        localStorage.setItem('userOnline', JSON.stringify(userAccount[i]));
                        if (indexPage == '') {
                            window.location.href = "HomePage.html";
                        } else {
                            console.log(indexPage)
                            window.location.href = indexPage;
                        }
                    }
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
    });


}

function signup() {
    var userAccount = '';
    var username, pass, pass2;
    username = document.getElementById('sg_username').value;
    email = document.getElementById('sg_email').value;
    pass = document.getElementById("sg_pass1").value;
    pass2 = document.getElementById("sg_pass2").value;
    var check = true;
    callAPI("userAccount", "GET", null).then((res) => {
        userAccount = res.data;
        for (var i in userAccount) {
            if (username == userAccount[i].username) {
                check = false;
                alert("Username was used!!");
            }
            if (email == userAccount[i].email) {
                check = false;
                alert("email was used!!");
            }
        }
        console.log(check);
        if (pass !== pass2) {
            alert('ConfirmPassword was wrong!');
            check = false;
        }

        if (check) {
            var user = {
                id: '',
                fname: document.getElementById('sg_fname').value,
                lname: document.getElementById('sg_lname').value,
                username: document.getElementById('sg_username').value,
                password: document.getElementById('sg_pass1').value,
                name: document.getElementById('sg_lname').value,
                phone: document.getElementById('sg_phone').value,
                email: document.getElementById('sg_email').value,
                address: document.getElementById('sg_address').value,
                status: 'offline',
                role: 'user'
            };
            callAPI("userAccount", "POST", user).then((res) => {
                alert('sign up success!!');

            });
            window.location.href = "login.html";
        }
    });
}

function signupToBook() {
    var userAccount = '';
    var username, pass, pass2;
    username = document.getElementById('book_username').value;
    email = document.getElementById('book_email').value;
    pass = document.getElementById("book_pass1").value;
    pass2 = document.getElementById("book_pass2").value;
    var check = true;
    callAPI("userAccount", "GET", null).then((res) => {
        userAccount = res.data;
        for (var i in userAccount) {
            if (username == userAccount[i].username) {
                check = false;
                alert("Username was used!!");
            }
            if (email == userAccount[i].email) {
                check = false;
                alert("email was used!!");
            }
        }
        console.log(check);
        if (pass !== pass2) {
            alert('ConfirmPassword was wrong!');
            check = false;
        }

        if (check) {
            var user = {
                id: '',
                fname: document.getElementById('book_fname').value,
                lname: document.getElementById('book_lname').value,
                username: document.getElementById('book_username').value,
                password: document.getElementById('book_pass1').value,
                phone: document.getElementById('book_phone').value,
                email: document.getElementById('book_email').value,
                address: document.getElementById('book_address').value,
                status: 'offline',
                role: 'user'
            };
            callAPI("userAccount", "POST", user).then((res) => {
                alert('sign up success!!');

            });
            window.location.href = "login.html";
        }
    });
}

function showUsers() {
    var listUser = '';
    var row = "";
    callAPI("userAccount", "GET", null).then((res) => {
        listUser = res.data;
        for (var i in listUser) {
            row += '<tr>'
            row += '<td>' + listUser[i].id + '</td>'
            row += '<td>' + listUser[i].fname + '</td>'
            row += '<td>' + listUser[i].lname + '</td>'
            row += '<td>' + listUser[i].phone + '</td>'
            row += '<td>' + listUser[i].email + '</td>'
            row += '<td>' + listUser[i].address + '</td>'
            row += '<td>' + listUser[i].role + '</td>'
            row +=
                '<td>' +
                '<button onclick="updateUser(' + listUser[i].id + ')" class ="btn btn-outline-danger" data-toggle="modal" data-target="#updateUser"><i class="fas fa-cogs"></i></button>' +
                '<button onclick="deleteUser(' + listUser[i].id + ')" class ="btn ml-1 btn-outline-warning" ><i class="fas fa-trash"></i></button>' +
                '</td>'
            row += '</td>'
        }
        document.getElementById('listUsers').innerHTML = row;
    });
}

function addUser() {
    var user = {
        id: "",
        fname: document.getElementById('firstname').value,
        lname: document.getElementById('lastname').value,
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        status: 'online',
        role: 'user'
    }
    callAPI("userAccount", "POST", user).then((response) => {
        window.location.reload();
    });

}

function updateUser(id) {
    var listAccount;
    callAPI(`userAccount/${id}`, "GET", null).then((res) => {
        alert("tim ra account");
        listAccount = res.data;
        document.getElementById('idu').value = listAccount.id;
        document.getElementById('fnameu').value = listAccount.fname;
        document.getElementById('lnameu').value = listAccount.lname;
        document.getElementById('phoneu').value = listAccount.phone;
        document.getElementById('emailu').value = listAccount.email;
        document.getElementById('addressu').value = listAccount.address;
        document.getElementById('roleu').value = listAccount.role;
    });

}

function submitUser() {
    var id_check = document.getElementById('idu').value;
    var user = {
        name: document.getElementById('fnameu').value,
        name: document.getElementById('lnameu').value,
        phone: document.getElementById('phoneu').value,
        email: document.getElementById('emailu').value,
        address: document.getElementById('addressu').value,
        role: document.getElementById('roleu').value,
    }
    callAPI(`userAccount/${id_check}`, "PUT", user).then((response) => {
        window.location.reload();
    });

}

function deleteUser(id) {
    callAPI(`userAccount/${id}`, "DELETE", null).then((response) => {
        alert("user was deleted");
        window.location.reload();
    });
}
// PHẦN QUẢN LÍ TÀI KHOẢN end ***************************************************

// PHẦN QUẢN LÝ ĐẶT TOUR THÔNG QUA GIỎ HÀNG start *******************************
var shoppingCart = [];



// PHẦN QUẢN LÝ ĐẶT TOUR THÔNG QUA GIỎ HÀNG end ************************************************************

// BOOK TOUR start
function bookTour() {
    var listTour = "";
    var order = '';
    callAPI("Tours", "GET", null).then((res) => {
        listTour = res.data;
        if (userOnline.status == "online") {
            for (var i in listTour) {
                if (idTour == listTour[i].id) {
                    order = {
                        id: '',
                        idTour: idTour,
                        nameTour: listTour[i].nameTour,
                        priceTour: listTour[i].price,
                        idUser: userOnline.id,
                        fnameUser: userOnline.fname,
                        lnameUser: userOnline.lname,
                        addressUser: userOnline.address,
                        phonenumber: userOnline.phone,
                        email: userOnline.email,
                        amout: 1,
                        total: 0
                    }
                }
            }
            callAPI("order", "POST", order).then((res) => {
                alert("da dat tour");
            });
        } else {
            alert("Phải đăng nhập mới book tour được");
            window.location.href = "login.html";
        }
    });
}

function showCart() {
    var listOrder = '';
    callAPI("order", "GET", null).then((res) => {
        listOrder = res.data;
        var row = '';
        for (var i in listOrder) {
            if (userOnline.id == listOrder[i].idUser) {
                row += '<tr>'
                row += '<td>' + listOrder[i].id + '</td>'
                row += '<td>' + listOrder[i].nameTour + '</td>'
                row += '<td>' + listOrder[i].priceTour + '</td>'
                row += '<td>' + listOrder[i].amout + '</td>'
                row += '<td>' + listOrder[i].total + '</td>'
                row += '<td><button class = "btn ml-1 btn-outline-warning" onclick = "checkout(' + listOrder[i].id + ')">Thanh Toan</button>' + '</td>'
                row += '</td></tr>'
            }

        }
        document.getElementById('listOrder').innerHTML = row;
    });
}

function showCartAdmin() {
    var listOrder = '';
    callAPI("order", "GET", null).then((res) => {
        listOrder = res.data;
        var row = '';
        for (var i in listOrder) {
            row += '<tr>'
            row += '<td>' + listOrder[i].id + '</td>'
            row += '<td>' + listOrder[i].email + '</td>'
            row += '<td>' + listOrder[i].phonenumber + '</td>'
            row += '<td>' + listOrder[i].nameTour + '</td>'
            row += '<td>' + listOrder[i].priceTour + '</td>'
            row += '<td>' + listOrder[i].amout + '</td>'
            row += '<td>' + listOrder[i].total + '</td>'

            row += '</tr>'


        }
        document.getElementById('listOrder').innerHTML = row;
    });
}

function displayDetailTour(id) {
    var row = '';
    var a = '';
    const newLocal = null;
    callAPI(`Tours/${id}`, "GET", newLocal).then((res) => {
        a = res.data;
        row += '<p>' + a + '</p>';


        console.log(id);
        document.getElementById('infor_detail_tour').innerHTML = row;


    });



}
// BOOK TOUT end
var group = '';
var idTour = '';

function loadGroup() {
    group = JSON.parse(localStorage.getItem('group'));
}

function loadID() {
    idTour = JSON.parse(localStorage.getItem('idlist'));
}
if (localStorage.getItem('idlist') != null) {
    loadID();
}

if (localStorage.getItem('group') != null) {
    loadGroup();
}

function listCategory(node) {
    console.log(node);
    group = node.querySelector(".location").textContent;
    localStorage.setItem("group", JSON.stringify(group));
    window.location.href = "listTour.html";
}

function showCategory() {
    var row = "";
    var listTour = '';
    var count = '';
    callAPI("Tours", "GET", null).then((res) => {
        listTour = res.data;
        for (var i = 0; i < listTour.length; i++) {
            if (listTour[i].group == group) {
                row += '<div class="col-lg-3 col-md-6 col-sm-12 col-12 mt-3">';
                row += '<div class="card tour" style="width:auto">';
                row += '<img class="card-img-top" id="img-card" style="width: 400px;height: 200px;" src="img/' + listTour[i].img + '">';
                //  src="image/' + data.img + '">';
                row += '<div class="card-title tour-title text-center h5">' + listTour[i].nameTour + '</div>';
                row += '<div class ="price text-center h6">' + listTour[i].price + '$ </div>';
                row += '<button class = "text-center btn btn-outline-success" onclick="showDetail(' + listTour[i].id + ')">Details</button>';
                row += '</div>';
                row += '</div>';
            }

        }
        document.getElementById("categoryTour").innerHTML = row;
    });

}
// PHẦN CHI TIẾT TOUR
function showDetail(id) {
    idTour = id;
    localStorage.setItem("idlist", JSON.stringify(idTour));
    window.location.href = 'DetailTour.html';
}

function showdetailTour() {
    var listTour;
    var row = '';
    callAPI("Tours", "GET", null).then((res) => {
        listTour = res.data;
        for (var i = 0; i < listTour.length; i++) {
            if (listTour[i].id == idTour) {
                var img = listTour[i].img;
                var a = `"url('./img/` + img + `')"`;
                console.log(a);
                document.getElementById("tour-item-banner").style.backgroundImage = JSON.parse(a);
                document.getElementById("displaynameTour").textContent = listTour[i].nameTour;
                document.getElementById("tour-infomation-content-descript").textContent = listTour[i].infor;
                document.querySelector("#day label").textContent = listTour[i].time;
                document.querySelector("#people label").textContent = listTour[i].people;
                document.querySelector("#location label").textContent = listTour[i].location;
                var a = 5 - listTour[i].remark;
                console.log(a);
                for (var j = 0; j < listTour[i].remark; j++) {
                    console.log(j);
                    row += '<span class="fa fa-star checked"></span>';
                }
                for (var j = 0; j < a; j++) {
                    row += '<span class="fa fa-star"></span>';
                }
                row += ' <span> (2 reviews)</span>';
                document.getElementById('star_remark').innerHTML = row;

            }
        }

    });

}


function admin_display_tours_table() {
    document.getElementById("table_admin_tours").style.display = "block";
    document.getElementById("table_admin_users").style.display = "none";
    document.getElementById("table_admin_order").style.display = "none";

}

function admin_display_accounts_table() {
    document.getElementById("table_admin_users").style.display = "block";
    document.getElementById("table_admin_tours").style.display = "none";
    document.getElementById("table_admin_order").style.display = "none";

}

function admin_display_order_table() {
    document.getElementById("table_admin_order").style.display = "block";
    document.getElementById("table_admin_tours").style.display = "none";
    document.getElementById("table_admin_users").style.display = "none";

}