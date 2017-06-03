var AppID = "4415471a";
var APIKey = "ab3e2bd0953f0ffa8814cf394bba9d8f";

$(document).ready(function () {
    $('select').material_select();
});

function executeSearch (dietSearch, allergySearch) {
	var queryURL = `http://api.yummly.com/v1/api/recipes?_app_id=${ AppID }&_app_key=${ APIKey }&q=${ encodeURI(dietSearch) }&allowedAllergy[]=${ encodeURI(allergySearch)}`;
	$.ajax({
		url: queryURL
	}).done(function(res){
		// console.log(res)
	
		// clearing the result boxes
		$('#breakfast-results').empty();
		$('#lunch-results').empty();
		$('#dinner-results').empty();

		// declaring breakfast variables and displaying it
		var breakfastRes = res.matches[0]
		var breakfastResName = breakfastRes.recipeName;
		var breakfastResIngredient = breakfastRes.ingredients;
		var breakfastResImage = breakfastRes.imageUrlsBySize[90];
	
		var breakfastDiv = $('<div class="breakfast-item">');
		var breakfastName = $(`<p class="breakfast-item_name">${ breakfastResName }</p>`);
		var breakfastImage = $('<img src="' + `${breakfastResImage}` + '"/>')
		var breakfastIngredients = $(`<p class="breakfast-item_ingredients">${ breakfastResIngredient}</p>`)
		
		breakfastDiv.append(breakfastName);
		breakfastDiv.append(breakfastImage);
		breakfastDiv.append(breakfastIngredients);
		$("#breakfast-results").append(breakfastDiv);

		//declaring lunch variables and displaying it
		var lunchRes = res.matches[1]
		var lunchResName = lunchRes.recipeName;
		var lunchResIngredient = lunchRes.ingredients;
		var lunchResImage = lunchRes.imageUrlsBySize[90];
	
		var lunchDiv = $('<div class="lunch-item">');
		var lunchName = $(`<p class="lunch-item_name">${ lunchResName }</p>`);
		var lunchImage = $('<img src="' + `${lunchResImage}` + '"/>')
		var lunchIngredients = $(`<p class="lunch-item_ingredients">${ lunchResIngredient}</p>`)
		
		lunchDiv.append(lunchName);
		lunchDiv.append(lunchImage);
		lunchDiv.append(lunchIngredients);
		$("#lunch-results").append(lunchDiv);

		//declaring dinner variables and displaying it
		var dinnerRes = res.matches[2]
		var dinnerResName = dinnerRes.recipeName;
		var dinnerResIngredient = dinnerRes.ingredients;
		var dinnerResImage = dinnerRes.imageUrlsBySize[90];
	
		var dinnerDiv = $('<div class="dinner-item">');
		var dinnerName = $(`<p class="dinner-item_name">${ dinnerResName }</p>`);
		var dinnerImage = $('<img src="' + `${dinnerResImage}` + '"/>')
		var dinnerIngredients = $(`<p class="dinner-item_ingredients">${ dinnerResIngredient}</p>`)
		
		dinnerDiv.append(dinnerName);
		dinnerDiv.append(dinnerImage);
		dinnerDiv.append(dinnerIngredients);
		$("#dinner-results").append(dinnerDiv);
	});
}

$('#plan-search').on('click', function(search){
	search.preventDefault();
	var dietChoice = $("#diet-type").val();
	var allergyChoice = $("#allery-type").val();
	executeSearch(dietChoice, allergyChoice);
});