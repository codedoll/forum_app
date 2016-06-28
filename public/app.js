$(function() {

    markedComments();
    momentsComments();

    var simplemde = new SimpleMDE({ element: $("#MyID")[0] });

});


function momentsComments() {

    var forumL = $('.forumDate')

    for (var i = 0; i < forumL.length; i++) {

        var getDatePosted = $(forumL[i]).html();
        var showDatePretty = moment(getDatePosted, "YYYY-MM-DD HH:mm").format("MMMM Do YY");

	        if (showDatePretty === moment().format("MMMM Do YY")) {
	            showDatePretty = "today"
	        }
	        var hourInt = parseFloat(moment().format("HH"))
	        if ( hourInt < 11) {
	        	$('#greeterScript').html("Good morning, ")
	        }
	        else {
	        	$('#greeterScript').html("Good afternoon, ")

	        }

	        // console.log($('#greeterScript').html());
	        console.log(parseFloat(moment().format("HH:mm")));
	       	console.log(typeof parseFloat(moment().format("HH:mm")));

        
        var showRelativeTime = moment(getDatePosted, "YYYY-MM-DD HH:mm").fromNow()

        $(forumL[i]).html(`${showRelativeTime}, ${showDatePretty}`)

    }

}



function markedComments() {

    var getComment = $('.commentText')

    for (var i = 0; i < getComment.length; i++) {
        // console.log($(getComment[i]))
        var oneComment = $(getComment[i])
        var commentHTML = $(oneComment).html()
        var markedComment = marked(commentHTML)
            // console.log($(A).html())
            // console.log(typeof B)
            // console.log(marked(B));

        $(getComment[i]).html(`${markedComment}`)

    }
}
