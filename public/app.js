$(function() {
// Create a new moment object
var simplemde = new SimpleMDE({ element: $("#MyID")[0] });

var getComment = $('.commentText')
for (var i = 0; i < getComment.length; i++) {
	// console.log($(getComment[i]))
	var A = $(getComment[i])
	var B = $(A).html()
	var C = marked(B)
	// console.log($(A).html())
	// console.log(typeof B)
	// console.log(marked(B));

	$(getComment[i]).html(`${C}`)

}


var forumL = $('.forumDate')
for (var i = 0; i < forumL.length; i++) {

	var getDatePosted = $(forumL[i]).html();
	var showDatePretty = moment(getDatePosted, "YYYY-MM-DD HH:mm").format("MMMM Do YY")
	if (showDatePretty === moment().format("MMMM Do YY")){
		showDatePretty = "today"
	}
	var showRelativeTime = moment(getDatePosted, "YYYY-MM-DD HH:mm").fromNow()
	
	$(forumL[i]).html(`${showRelativeTime}, ${showDatePretty}`)

}


// alert("hi")
	// $.ajax('/users').done(function(users) {

	// 	console.log(users);

	// 	users.forEach(function(user) {

	// 		$('body').append('<h1>' + user.username + '</h1>');

	// 		user.bookmarks.forEach(function(bookmark) {

	// 			$('body').append('<p>' + bookmark.name + '</p>');

	// 		});

	// 	});

	// });


});