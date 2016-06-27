$(function() {
// Create a new moment object



var forumL = $('.forumDate')
for (var i = 0; i < forumL.length; i++) {
	// console.log( $(forumL[i]).html() );
	var getDatePosted = $(forumL[i]).html();
	var getRelativeTime = getDatePosted.substring(0, 10)
	var showRelativeTime = moment(getRelativeTime, "YYYY-MM-DD").fromNow()
	
	$(forumL[i]).html(showRelativeTime)
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