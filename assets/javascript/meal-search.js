// Initialize Firebase
var config = {
	apiKey: "AIzaSyCBDkcfg8xnegsitok08Xu5n1amcBfxD_E",
	authDomain: "map-my-meal-9c98b.firebaseapp.com",
	databaseURL: "https://map-my-meal-9c98b.firebaseio.com",
	projectId: "map-my-meal-9c98b",
	storageBucket: "map-my-meal-9c98b.appspot.com",
	messagingSenderId: "110980164870"
};

firebase.initializeApp(config);

var database = firebase.database();

var AppID = "4415471a";
var APIKey = "ab3e2bd0953f0ffa8814cf394bba9d8f";
var searches = [""];

// on load of page...
$(document).ready(function () {
	// sets sticky footer
	$(".page-footer").css("position", "absolute");
	$(".page-footer").css("bottom", "0");
	$(".page-footer").css("left", "0");

})

//go to Yummly to get recipe name
function executeSearch(searchTerm) {
	var queryURLBase = `http://api.yummly.com/v1/api/recipes?_app_id=${ AppID }&_app_key=${ APIKey }&q=${ encodeURI(searchTerm) }&requirePictures=true`;
	$.ajax({
		url: queryURLBase
	}).done(function (res) {
		console.log(res);
		// if recipe matches are defined, run following code
		if (typeof res.matches !== 'undefined') {
			$("#search-results").empty();

			res.matches.forEach(function (match) {

				var resultItem = $('<div>');
				resultItem.attr("class", "result-item");
				var recipeName = $('<p class="result-item_name">' + `${ match.recipeName }` + '</p>');
				var resultImg = $(`<img src="${ match.imageUrlsBySize[90] }"/>`)
				var recipeIngredients = $(`<p class="result-item_ingredients">${ match.ingredients }</p>`)

				resultItem.append(recipeName);
				resultItem.append(resultImg);
				resultItem.append(recipeIngredients);
				$('#search-results').append(resultItem);
			})

			//upload to firebase
			// database.ref().push(results);
		}
	});
}

function renderSearches() {
	// clear all searches before rendering any additions
	$("#recent-search").empty();

	for (var i = 0; i < searches.length; i++) {
		var list = $("<li>");
		var newSearch = $("<a href='#'>");
		newSearch.addClass("searches");
		newSearch.text(searches[i]);
		newSearch.attr("value", searches[i]);

		list.append(newSearch);

		$("#recent-search").append(list);
	}
}

// on click submit button
$("#submit").on("click", function (event) {
	event.preventDefault();

	$(".page-footer").css("position", "inherit");
	// $(".page-footer").css("bottom", "");
	// $(".page-footer").css("left", "");

	//grab user input, plug them into executeSearch function & run it
	var searchEntry = $("input").val().trim();
	executeSearch(searchEntry);

	searches.push(searchEntry);

	$("input").val('')

	// stores recent search array into firebase
	database.ref().push(searches);

	// populates recent searches from firebase db

	renderSearches();
});

// run API call on recent search buttons values
$(document).on("click", ".searches", function () {
	console.log("recent search clicked");
	console.log(this);
	executeSearch($(this).val());
})

// clear recent searches
$("#clear").on("click", function () {
	$("#recent-search").empty();
})