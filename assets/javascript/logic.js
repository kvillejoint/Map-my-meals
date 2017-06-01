
// Initialize Firebase
// var config = {
// apiKey: "AIzaSyCBDkcfg8xnegsitok08Xu5n1amcBfxD_E",
// authDomain: "map-my-meal-9c98b.firebaseapp.com",
// databaseURL: "https://map-my-meal-9c98b.firebaseio.com",
// projectId: "map-my-meal-9c98b",
// storageBucket: "map-my-meal-9c98b.appspot.com",
// messagingSenderId: "110980164870"
// };

// firebase.initializeApp(config);

// var database = firebase.database();

var AppID = "4415471a";
var APIKey = "ab3e2bd0953f0ffa8814cf394bba9d8f";

//go to Yummly to get recipe name
function executeSearch(searchTerm) {
	var queryURLBase = `http://api.yummly.com/v1/api/recipes?_app_id=${ AppID }&_app_key=${ APIKey }&q=${ encodeURI(searchTerm) }`;
	$.ajax({
		url: queryURLBase
	}).done(function(res){
		console.log(res);
		// if recipe matches are defined, run following code
		if(typeof res.matches !== 'undefined')
		{
			$("#search-results").empty();

			res.matches.forEach(function(match){

				var resultItem = $('<div class="result-item">');
				var recipeName = $(`<div class="result-item_name">${ match.recipeName }</div>`);
				var recipeIng = $(`<div class="result-item_ingredients">${ match.ingredients }</div>`)

				console.log(match.recipeName)
				console.log(match.ingredients)

				resultItem.append(recipeName);
				resultItem.append(recipeIng);
				$('#search-results').append(resultItem);
			}) 
			
			//upload to firebase
			// database.ref().push(results);
			// }
		}
	});
}

// on click submit button
$(document).ready(function(){
	$("button").on("click", function(event){
		event.preventDefault();
		
		//grab user input, plug them into executeSearch function & run it
		var searchEntry = $("input").val().trim();
		executeSearch(searchEntry); 
	});
});