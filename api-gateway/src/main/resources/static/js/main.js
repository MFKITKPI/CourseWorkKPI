var localKeyName = "foodtoken";

$(document).ready(function () {

    checkCurrentUser();
    loadFood(null);

    $(".login").on('click', function() {
        showLogForm();
        return false;
    });

    $(".registration").on('click', function() {
        showRegForm();
        return false;
    });

    $('#someinf').on('input', function() {
        loadFood($('#someinf').val());
    });
});

function refreshContent() {
    loadFood(null);
}

function loadFood(filterName)  {
    var token = localStorage.getItem(localKeyName);
    $.ajax({
        type: "GET",
        headers: {"Authorization": 'Bearer ' + token},
        url: "/search/food/getall",
        cache: false,
        timeout: 10000,
        success: function (data) {
            console.log("SUCCESS : ", data);
            var iter = 0;
            var insert = getFoodBlock(0, "name", "restaurant", "Cooking time in ", "Ingredients", "Price in ", true);
            var food_id = 0;
            data.forEach(function (item) {
                food_id = 0;
                if(token !== null) { food_id = item["food_id"]; }
                if(filterName === null || item["food_name"].toLowerCase().includes(filterName.toLowerCase()) || item["restaurant"].toLowerCase().includes(filterName.toLowerCase()) || (item["cooktime"].toString() + "min").toLowerCase().includes(filterName.toLowerCase()) || item["ingredients"].toLowerCase().includes(filterName.toLowerCase()) || (item["price"].toString() + '$').toLowerCase().includes(filterName.toLowerCase())) {
                    iter++;
                    insert += getFoodBlock(food_id, item["food_name"], item["restaurant"], item["cooktime"], item["ingredients"], item["price"], true);
                }
            });
            if(iter === 0) {
                $("#multiContainer").html("There is no food we can deliver for you!");
            }
            else {
                $('#multiContainer').html(insert);
            }
            setTimeout(function () { setOrderFeedbackHandlers(); }, 100);
        },
        error: function (e) {
            console.log("ERROR : ", e);
        }
    });
}

function setOrderFeedbackHandlers() {
    $('.orderButs').on('click', function (event) {
        event.preventDefault();
        performOrder(event.target.id);
    });
    $('.viewFeedback').on('click', function (event) {
        event.preventDefault();
        getAllProductFeedback(event.target.id.replace('viewFeedback',''));
    });
}

function getAllProductFeedback(food_id) {
    var token = localStorage.getItem(localKeyName);
    $.ajax({
        type: "GET",
        headers: {"Authorization": 'Bearer ' + token},
        url: "/feedback/getall/feed/" + food_id,
        cache: false,
        timeout: 10000,
        success: function (data) {
            console.log("SUCCESS : ", data);
            var insert = "";
            data.forEach(function (item) {
                insert += getFeedbackListBlock(item["clientid"]["username"], item["body"], item["time"]);
            });
            if(insert === "") { insert = "There is no feedback on this food"; }
            $("#multiContainer").html(insert);
        },
        error: function (e) {
            console.log("ERROR : ", e);
        }
    });
}

function performOrder(food_id) {
    var token = localStorage.getItem(localKeyName);
    $.ajax({
        type: "GET",
        headers: {"Authorization": 'Bearer ' + token},
        url: "/order/new/" + username + '/' + food_id,
        cache: false,
        timeout: 10000,
        success: function (data) {
            console.log("SUCCESS : ", data);
        },
        error: function (e) {
            console.log("ERROR : ", e);
        }
    });
}
