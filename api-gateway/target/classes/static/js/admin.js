var localKeyName = "foodtoken";
var username = "";

$(document).ready(function () {

    checkCurrentUser();
    loadAdminStaff();

    $(".login").on('click', function() {
        showLogForm();
        return false;
    });

    $(".registration").on('click', function() {
        showRegForm();
        return false;
    });
});

function refreshContent() {
    loadAdminStaff();
}

function loadAdminStaff() {
    var token = localStorage.getItem(localKeyName);
    if (token === null) {
        $("#multiContainer").html("You are not authorized to view this page!");
        return 0;
    }
    $.ajax({
        type: "POST",
        headers: {"Authorization": 'Bearer ' + token},
        url: "/auth/isadmin",
        data: token,
        cache: false,
        timeout: 10000,
        success: function (data) {
            console.log("SUCCESS : ", data);
            if(data) {
                getFoodForAdmin();
            } else {
                $("#multiContainer").html("You have no admin access!");
            }
        },
        error: function (e) {
            console.log("ERROR : ", e);
        }
    });
}

function getFoodForAdmin() {
    var token = localStorage.getItem(localKeyName);
    $.ajax({
        type: "GET",
        headers: {"Authorization": 'Bearer ' + token},
        url: "/search/food/getall",
        cache: false,
        timeout: 10000,
        success: function (data) {
            console.log("SUCCESS : ", data);
            var insert = getFoodAdminBlock(0, "name", "restaurant", "Cooking time in ", "Ingredients", "Price in ", true);
            insert += getNewFoodAdminBlock();
            data.forEach(function (item) {
                insert += getFoodAdminBlock(item["food_id"], item["food_name"], item["restaurant"], item["cooktime"], item["ingredients"], item["price"], false);
            });
            $.ajax({
                type: "GET",
                headers: {"Authorization": 'Bearer ' + token},
                url: "/order/getall",
                cache: false,
                timeout: 10000,
                success: function (data1) {
                    insert += "<div><b>Orders:</b></div>";
                    insert += getOrderAdminBlock("Username", 0, "name", "restaurant", "Date", "Price in");
                    data1.forEach(function (item) {
                        insert += getOrderAdminBlock(item["clientid"]["username"], item["order_id"], item["food_id"]["food_name"], item["food_id"]["restaurant"], item["time"], item["food_id"]["price"]);
                    });
                    $("#multiContainer").html(insert);
                    setTimeout(function () { adminHandlers(); }, 100);
                },
                error: function (e) {
                    console.log("ERROR : ", e);
                }
            });
        },
        error: function (e) {
            console.log("ERROR : ", e);
        }
    });
}

function adminHandlers() {
    $('#newFood').on('submit', function (event) {
        event.preventDefault();
        var newFood = {};
        newFood["food_name"] = $("#food_name").val();
        newFood["restaurant"] = $("#restaurant").val();
        newFood["cooktime"] = $("#cooktime").val();
        newFood["ingredients"] = $("#ingredients").val();
        newFood["price"] = $("#price").val();
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "/search/food/add",
            data: JSON.stringify(newFood),
            dataType: 'json',
            cache: false,
            timeout: 10000,
            success: function (data) {
                console.log("SUCCESS : ", data);
                $("#food_name").val("");
                $("#restaurant").val("");
                $("#cooktime").val("");
                $("#ingredients").val("");
                $("#price").val("");
                refreshContent();
            },
            error: function (e) {
                console.log("ERROR : ", e);
            }
        });
    });
    $('.delFood').on('click', function (event) {
        event.preventDefault();
        var token = localStorage.getItem(localKeyName);
        $.ajax({
            type: "DELETE",
            headers: {"Authorization": 'Bearer ' + token},
            url: "/search/food/del/" + event.target.id.replace('delFood',''),
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
    });
    $('.orderButs').on('click', function (event) {
        sendDeleteOrder(event.target.id.replace('delOrder',''));
    });
}