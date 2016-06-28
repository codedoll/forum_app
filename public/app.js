$(function() {

    simpleGreeting();
    markedComments();
    momentsTopics();
    momentsComments();

    var simplemde = new SimpleMDE({ element: $("#MyID")[0] });

    markedSingleTopic();

});


function simpleGreeting() {
    var hourInt = parseFloat(moment().format("HH"))
    if (hourInt < 11) {
        $('#greeterScript').html("Good morning, ")
    } 

    else {
        $('#greeterScript').html("Good afternoon, ")
    }
    // // console.log($('#greeterScript').html());
    // console.log(parseFloat(moment().format("HH:mm")));
    // console.log(typeof parseFloat(moment().format("HH:mm")));
}


function momentsTopics() {

    var forumL = $('.forumDate')

    for (var i = 0; i < forumL.length; i++) {

        var getDatePosted = $(forumL[i]).html();
        var showDatePretty = moment(getDatePosted, "YYYY-MM-DD HH:mm").format("MMMM Do YY");

        if (showDatePretty === moment().format("MMMM Do YY")) {
            showDatePretty = "today"
        }

        var showRelativeTime = moment(getDatePosted, "YYYY-MM-DD HH:mm").fromNow()

        $(forumL[i]).html(`${showRelativeTime}, ${showDatePretty}`)

    }

}


function momentsComments() {
//exactly like momentsTopics() except for comments in the single topic page.

    var commentL = $('.commentDate')
    for (var i = 0; i < commentL.length; i++) {

        var getDatePostedComment = $(commentL[i]).html();
        var showDatePretty = moment(getDatePostedComment, "YYYY-MM-DD HH:mm").format("MMMM Do YY");

        if (showDatePretty === moment().format("MMMM Do YY")) {
            showDatePretty = "today"
        }

        var showRelativeTime = moment(getDatePostedComment, "YYYY-MM-DD HH:mm").fromNow()

        $(commentL[i]).html(`${showRelativeTime}, ${showDatePretty}`)
    }
}

function markedComments() {

    var getComment = $('.commentText')

    for (var i = 0; i < getComment.length; i++) {

        var oneComment = $(getComment[i])
        var commentHTML = $(oneComment).html()
        var markedComment = marked(commentHTML)

        $(getComment[i]).html(`${markedComment}`)

    }
}


function markedSingleTopic() {
    $('#singleTopicTitle').html(marked($('#singleTopicTitle').html()))
}