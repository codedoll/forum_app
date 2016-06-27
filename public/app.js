$(function() {
// Create a new moment object



var forumL = $('.forumDate')
for (var i = 0; i < forumL.length; i++) {

 // var dateNow = moment().format("YYYY-MM-DD HH:mm");


	var getDatePosted = $(forumL[i]).html();
	var showDatePretty = moment(getDatePosted, "YYYY-MM-DD HH:mm").format("MM-DD-YY HH:mm")
	var showRelativeTime = moment(getDatePosted, "YYYY-MM-DD HH:mm").fromNow()
	
	$(forumL[i]).html(`${showRelativeTime}`)
    // console.log(forumL[i])

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