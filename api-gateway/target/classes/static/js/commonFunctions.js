function getRegBlock() {
    return "<form id='signup' class='logRegForm'>" +
        "<div><label> Username (must be unique): <input required type='text' id='username'/> </label></div>" +
        "<div><label> First Name: <input type='text' id='first_name'/> </label></div>" +
        "<div><label> Last Name: <input type='text' id='last_name'/> </label></div>" +
        "<div><label> E-mail: <input type='text' id='email'/> </label></div>" +
        "<div><label> Password: <input required type='password' id='password'/> </label></div>" +
        "<div><input class='cancelPerfButs' type='submit' value='Sign Up'/></div>" +
        "<div><input class='cancelPerfButs' type='button' id='cancelRegLog' value='Cancel'/></div>" +
        "</form>";
}

function getLogBlock() {
    return "<form id='login' class='logRegForm'>" +
        "<div><label> Nickname: <input required type='text' id='usernameLog'/> </label></div>" +
        "<div><label> Password: <input required type='password' id='passwordLog'/> </label></div>" +
        "<div><label id='errorLog' style='color: red'></label></div>" +
        "<div><input class='cancelPerfButs' type='submit' value='Sign In'/></div>" +
        "<div><input class='cancelPerfButs' type='button' id='cancelRegLog' value='Cancel'/></div>" +
        "</form>";
}

function getLogRegButs() {
    return "<div class='logRegButs' id='noCurrentUser'>" +
        "<button class='login' style='border-radius: 10px 10px 0 0;'>Log In</button>" +
        "<button class='registration' style='border-radius: 0 0 10px 10px;'>Register</button>" +
        "</div>";
}

function getCurrentUserBlock(username) {
    return "<div class='logRegButs'>" +
        "<label style='display: block; max-width: 150px;' id='currentUsername'>" + username + "</label>" +
        "<button style='display: inline-block; max-width: 150px;' id='currentUser'>Sign Out</button>" +
        "</div>";
}

function getFoodBlock(food_id, food_name, restaurant, cooktime, ingredients, price, isTop) {
    var ret = "<div class='foodBlock'>" +
        "<div style='width: 15%'><b>" + food_name + "</b></div>" +
        "<div style='width: 15%'>" + restaurant + "</div>" +
        "<div style='width: 10%'>" + cooktime + "min</div>" +
        "<div style='width: 30%'>" + ingredients + "</div>" +
        "<div style='width: 5%'><b>" + price + "$</b></div>";
    if(food_id !== 0) {
        ret += "<input style='width: 8%; float: right; height:100%;' type='button' value='Order' class='orderButs' id='" + food_id + "'/>";
        ret += "<input style='width: 12%; float: right; height:100%;' type='button' value='Feedback' class='viewFeedback' id='" + food_id + "viewFeedback'/>";
    } else if(!isTop) {
        ret += "<input style='width: 20%; float: right; height:100%;' type='button' value='Feedback' class='viewFeedback' id='" + food_id + "viewFeedback'/>";
    }
    return ret + "</div>";
}

function getFoodAdminBlock(food_id, food_name, restaurant, cooktime, ingredients, price, isTop) {
    var ret = "<div class='foodBlock'>" +
        "<div style='width: 15%'><b>" + food_name + "</b></div>" +
        "<div style='width: 15%'>" + restaurant + "</div>" +
        "<div style='width: 10%'>" + cooktime + "min</div>" +
        "<div style='width: 30%'>" + ingredients + "</div>" +
        "<div style='width: 5%'><b>" + price + "$</b></div>";
    if (!isTop) {
        ret += "<input style='width: 20%; float: right; height:100%;' type='button' value='Delete' class='delFood' id='" + food_id + "delFood'/>";
    }
    return ret + "</div>";
}

function getNewFoodAdminBlock() {
    return "<form id='newFood'>" +
        "<div style='width: 15%'><label><input style='width: 100%' required type='text' id='food_name' placeholder='Food name'/> </label></div>" +
        "<div style='width: 15%'><label><input style='width: 100%' required type='text' id='restaurant' placeholder='Restaurant'/> </label></div>" +
        "<div style='width: 15%'><label><input style='width: 100%' required type='number' id='cooktime' placeholder='Cook time'/> </label></div>" +
        "<div style='width: 30%'><label><input style='width: 100%' required type='text' id='ingredients' placeholder='Ingredients'/> </label></div>" +
        "<div style='width: 10%'><label><input style='width: 100%' required type='number' id='price' placeholder='Price'/> </label></div>" +
        "<div style='width: 15%'><input style='width: 100%' type='submit' value='Add'/></div>" +
        "</form>";
}

function getOrderBlock(order_id, food_name, restaurant, date, price) {
    var ret = "<div class='foodBlock'>" +
        "<div style='width: 15%'><b>" + food_name + "</b></div>" +
        "<div style='width: 15%'>" + restaurant + "</div>" +
        "<div style='width: 30%'>" + date + "</div>" +
        "<div style='width: 10%'><b>" + price + "$</b></div>";
    if(order_id !== 0) {
        ret += "<input style='width: 10%; float: right; height:100%;' type='button' value='Delete' class='orderButs' id='" + order_id + "delOrder'/>";
        ret += "<input style='width: 20%; float: right; height:100%;' type='button' value='Leave feedback' class='feedbackBut' id='" + order_id + "feedback'/>";
    }
    return ret + "</div>";
}

function getOrderAdminBlock(username, order_id, food_name, restaurant, date, price) {
    var ret = "<div class='foodBlock'>" +
        "<div style='width: 15%'><b>" + username + "</b></div>" +
        "<div style='width: 15%'>" + food_name + "</div>" +
        "<div style='width: 20%'>" + restaurant + "</div>" +
        "<div style='width: 30%'>" + date + "</div>" +
        "<div style='width: 10%'><b>" + price + "$</b></div>";
    if(order_id !== 0) {
        ret += "<input style='width: 10%; float: right; height:100%;' type='button' value='Delete' class='orderButs' id='" + order_id + "delOrder'/>";
    }
    return ret + "</div>";
}

function getFeedbackListBlock(username, body, time) {
    return "<div style='border-bottom: 3px double black;'>" +
        "<div style='width: 100%'>Feedback from <b>" + username + "</b> (at " + time + "):</div>" +
        "<div style='width: 100%'>" + body + "</div>" +
        "</div>";
}

function getFeedbackBlock(order_id) {
    return "<textarea style='width: 98%; resize: none;' rows='10' placeholder='enter your feedback (max 1024 symbols)' maxlength='1024' id='textareaFeedback'></textarea>" +
        "<input style='width: 50%; height:30px;' type='button' value='Cancel' class='cancelFeedbackBut' id='" + order_id + "cancelFeedback'/>" +
        "<input style='width: 50%; height:30px;' type='button' value='Submit' class='submitFeedbackBut' id='" + order_id + "submitFeedback'/>";
}


//-----------------------------------------------------------------


function logRegHandler() {
    $(".login").on('click', function() {
        showLogForm();
        return false;
    });

    $(".registration").on('click', function() {
        showRegForm();
        return false;
    });
}

function checkCurrentUser() {
    var token = localStorage.getItem(localKeyName);
    console.log(token);
    if(token !== null) {
        $.ajax({
            type: "POST",
            headers: {"Authorization": 'Bearer ' + token},
            url: "/auth/getusername",
            data: token,
            dataType: 'text',
            cache: false,
            timeout: 10000,
            success: function (data) {
                console.log("SUCCESS : ", data);
                username = data;
                $("#forlogregbut").html(getCurrentUserBlock(data));
                setTimeout(function () { setLogoutHandler(); }, 100);
            },
            error: function (e) {
                console.log("ERROR : ", e);
            }
        });
    } else {
        $("#forlogregbut").html(getLogRegButs());
        logRegHandler();
    }
}

function setLogoutHandler() {
    $('#currentUser').on('click', function(event) {
        event.preventDefault();
        localStorage.removeItem(localKeyName);
        checkCurrentUser();
        refreshContent();
    });
}

function cancelRegLog() {
    $('#cancelRegLog').on('click', function () {
        $('#forreglogform').html('');
        $('.topLine').css({"width":"70px"});
    });
}

function logEvent() {
    $('#login').on('submit', function(event) {
        event.preventDefault();
        var logUser = {};
        logUser["username"] = $("#usernameLog").val();
        logUser["password"] = $("#passwordLog").val();

        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "/auth/token",
            data: JSON.stringify(logUser),
            dataType: 'text',
            cache: false,
            timeout: 10000,
            success: function (data) {
                console.log("SUCCESS : ", data);
                localStorage.setItem(localKeyName, data);
                $('#forreglogform').html('');
                $('.topLine').css({"width":"70px"});
                checkCurrentUser();
                refreshContent();
            },
            error: function (e) {
                console.log("ERROR : ", e);
                $('#errorLog').html("Incorrect username or password!")
            }
        });
        return false;
    });
    cancelRegLog();
}

function showRegForm() {
    $('#forreglogform').html(getRegBlock());
    $('.topLine').css({"width":"30vw"});
    regEvent();
}

function showLogForm() {
    $('#forreglogform').html(getLogBlock());
    $('.topLine').css({"width":"30vw"});
    logEvent();
}

function regEvent() {
    $('#signup').on('submit', function(event) {
        event.preventDefault();
        var regUser = {};
        regUser["username"] = $("#username").val();
        regUser["first_name"] = $("#first_name").val();
        regUser["last_name"] = $("#last_name").val();
        regUser["email"] = $("#email").val();
        regUser["active"] = 1;
        regUser["password"] = $("#password").val();
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "/auth/registration",
            data: JSON.stringify(regUser),
            dataType: 'json',
            cache: false,
            timeout: 10000,
            success: function (data) {
                console.log("SUCCESS : ", data);
                $('#forreglogform').html('');
                $('.topLine').css({"width":"70px"});
            },
            error: function (e) {
                console.log("ERROR : ", e);
            }
        });
        return false;
    });
    cancelRegLog();
}

function sendDeleteOrder(id) {
    var token = localStorage.getItem(localKeyName);
    $.ajax({
        type: "DELETE",
        headers: {"Authorization": 'Bearer ' + token},
        url: "/order/del/" + id,
        cache: false,
        timeout: 10000,
        success: function (data) {
            console.log("SUCCESS : ", data);
            refreshContent();
        },
        error: function (e) {
            console.log("ERROR : ", e);
        }
    });
}