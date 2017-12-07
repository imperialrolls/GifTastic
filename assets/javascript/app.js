
// HyperKatz Api Key: NEPiwOm3NOqN1CnSkbcDhPiWMddtLc9p
// path v1/gifs/search

var queryURL="http://api.giphy.com/v1gifs/search" + topics + "&api_key=NEPiwOm3NOqN1CnSkbcDhPiWMddtLc9p";
var apiKey="&api_key=NEPiwOm3NOqN1CnSkbcDhPiWMddtLc9p";
var limit="&limit=10";



// my array of dead stars //

var topics = ["Jim Morrison", "Jimi Hendrix", "Kurt Cobain", "John Lennon" ]; //David Bowie, Brian Jones, Amy Winehouse, Tupac, Michael Jackson, Karen Carpenter"];
console.log(topics);
// Function for displaying Dead Star data



	// this function renders page onLoad 

function renderButtons() {

	// clearing out the buttons

	$("#dead-buttons").empty();

	// Looping through the array of topics
	for (var i = 0; i < topics.length; i++) {

		// Then dynamicaly generating buttons for each topic in the array and assigning a class to trigger onClickEvent
		var a = "<button class='deadStar'>" + topics[i] + "</button>";
        $("#dead-buttons").append(a);
    } 

    // for any new HTML tags created re-establish new event handlers 

    $(".deadStar").click(onButtonClick);
}

	// this line is for initial page rendering 

window.onload = renderButtons;




function onButtonClick() {

	console.log("hello");
	console.log(this.innerHTML);

	// transforming the button contents to the giphy query 
	// "Jimi Hendrix" >>> "jimi+hendrix"

	var q = this.innerHTML.replace(" ", "+").toLowerCase();
	console.log(q);

	// AJAX Magic

	// call 

	var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=" + q + apiKey + limit);

	// call back

	xhr.done(function(data) {
		console.log("success got data", data);

	// initialize our workspace 
	// parsing returned images

		$("#dead-images").empty();
		for (var i = 0; i < data.data.length; i++) {
			var image_url= data.data[i].images.original_still.url;
			var motion_url= data.data[i].images.original.url;
			console.log(image_url);
			// <img class="motion" src="..." data-other-src="...">
			var img= '<img class="motion" src="'+ image_url + '" data-other-src="'+ motion_url + '">';
			console.log(img);

	// appending image with addtional data

			var div="<div> rating: " + data.data[i].rating + img + "</div>"

			$("#dead-images").append(div);
		} 

		$(".motion").click(onImageClick);

	});


}

// swapping the displayed image for the saved image .. the still for the motion and back again

function onImageClick() {

	console.log("onImageClick");

	var liveSource = $(this).attr("src");
	console.log(liveSource);

	var othersource = $(this).data("otherSrc");
	console.log(othersource);

	$(this).attr("src", othersource);
	$(this).data("otherSrc", liveSource);
}










