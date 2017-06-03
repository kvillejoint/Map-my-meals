$(document).ready(function () {
    $('select').material_select();
    // collapsing navbar snippet of code
    $(".button-collapse").sideNav();
});

// hide and display search results for meal-search.html
$("#search-results").hide();
$("#submit").on("click", function() {
    $("#search-results").show();
});
// hide breakfast/lunch/dinner results areas on load of meal-plan.html
$("#meal-results").hide();
// display breakfast/lunch/dinner results areas on click of submit on meal-plan.html
$("#plan-search").on("click", function() {
    $("#meal-results").show();
});

// hide breakfast/lunch/dinner results areas on load of meal-plan.html
$("#meal-results").hide();

// display breakfast/lunch/dinner results areas on click of submit on meal-plan.html
$("#plan-search").on("click", function() {
    $("#meal-results").show();
});
