var localKeyName = "foodtoken";
var previousIDfeedback = 0;

$(document).ready(function () {

    checkCurrentUser();
    loadOrders();

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
    loadOrders();
}

function loadOrders()  {
    var token = localStorage.getItem(localKeyName);
    if(token === null) {
        $('#multiContainer').html("You are not authorized to view this page!");
    } else {
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
                $.ajax({
                    type: "GET",
                    headers: {"Authorization": 'Bearer ' + token},
                    url: "/order/getall/byclient/" + data,
                    cache: false,
                    timeout: 10000,
                    success: function (data) {
                        console.log("SUCCESS : ", data);
                        var iter = 0;
                        var insert = getOrderBlock(0, "name", "restaurant", "Order date",  "Price in ");
                        var order_id = 0;
                        var total = 0;
                        data.forEach(function (item) {
                            iter++;
                            order_id = 0;
                            if(token !== "null") { order_id = item["order_id"]; }
                            insert += getOrderBlock(order_id, item["food_id"]["food_name"], item["food_id"]["restaurant"], item["time"], item["food_id"]["price"]);
                            total += item["food_id"]["price"];
                        });
                        if(iter === 0) {
                            $("#multiContainer").html("There are no orders yet!");
                        }
                        else {
                            insert += "<div class='foodBlock'>" +
                                "<div style='float: right; margin-right: 5px;'><b>Total price: " + total + "$</b></div>" +
                                "</div>";
                            $('#multiContainer').html(insert);
                            setTimeout(function () { setDeleteAndFeedbackHandler(); }, 100);
                        }
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
}

function setDeleteAndFeedbackHandler() {
    $('.orderButs').on('click', function (event) {
        sendDeleteOrder(event.target.id.replace('delOrder',''));
    });
    $('.feedbackBut').on('click', function (event) {
        feedbackClick(event.target.id.replace('feedback',''));
    });
}

function feedbackClick(id) {
    $('#' + previousIDfeedback + 'feedback').show();
    $('#' + previousIDfeedback + 'delOrder').show();
    $('#' + id + 'feedback').hide();
    $('#' + id + 'delOrder').hide();
    previousIDfeedback = id;
    $('#forFeedback').html(getFeedbackBlock(id));
    setTimeout(function () { feedbackHandlers(); }, 100);
}

function feedbackHandlers() {
    $('.cancelFeedbackBut').on('click', function () {
        $('#' + previousIDfeedback + 'feedback').show();
        $('#' + previousIDfeedback + 'delOrder').show();
        $('#forFeedback').html('');
    });
    $('.submitFeedbackBut').on('click', function (event) {
        sendFeedback(event.target.id.replace('submitFeedback',''));
    });
}

function sendFeedback(id) {
    var token = localStorage.getItem(localKeyName);
    $.ajax({
        type: "POST",
        headers: {"Authorization": 'Bearer ' + token},
        contentType: 'text/plain',
        url: "/feedback/new/" + username + '/' + id,
        data: $('#textareaFeedback').val(),
        cache: false,
        timeout: 10000,
        success: function (data) {
            console.log("SUCCESS : ", data);
            refreshContent();
            $('#' + previousIDfeedback + 'feedback').show();
            $('#' + previousIDfeedback + 'delOrder').show();
            $('#forFeedback').html('');
        },
        error: function (e) {
            console.log("ERROR : ", e);
        }
    });
}