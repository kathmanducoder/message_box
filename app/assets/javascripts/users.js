$(function(){

  $("a.load_inbox").on("click", function(e) {
    $.ajax(
      {
        url: this.href,
        success: function(json) {
          $("div#mainbox").html("")
          printHeader("inbox");

          json.forEach(function(message) {
            createMessageHtml(message, "inbox")
          })
        }
      })
    e.preventDefault();
  })

  $("a.load_outbox").on("click", function(e) {
    $.ajax(
      {
        url: this.href,
        success: function(json) {
          $("div#mainbox").html("")
          printHeader("outbox");

          json.forEach(function(message) {
            createMessageHtml(message, "outbox")
          })
        }
      })
    e.preventDefault();
  })

  $("a.load_new_message").on("click", function(e) {
    $.ajax(
      {
        url: this.href,
        success: function(response) {
          $("div#mainbox").html("")
          $("div#mainbox").html(response)
        }
      })
    e.preventDefault();
  })

})

function printHeader(boxType) {
  $("div#mainbox").append('<div class="row message-header-row">');

  $(".message-header-row ").append('<div class="col-sm-3 name-header-column">');
  if (boxType == "inbox") {
    $(".name-header-column").append('<strong>From</strong>')
  } else {
    $(".name-header-column").append('<strong>To</strong>')
  }
  $(".message-header-row").append('</div>');

  $(".message-header-row ").append('<div class="col-sm-6 message-header-column">');
  $(".message-header-column").append('<strong>Message</strong>')
  $(".message-header-row").append('</div>');

  $(".message-header-row ").append('<div class="col-sm-3 date-header-column">');
  $(".date-header-column").append('<strong>Date</strong>')
  $(".message-header-row").append('</div>');

  $("div#mainbox").append('</div>');
}


function createMessageHtml(message, boxType) {
  $("div#mainbox").append('<div class="row message-row">');
  let moreMessageHref = '<a id="more_message" href="/messages/';

      //sender/receiver name
  $(".message-row ").append('<div class="col-sm-3 name-column">');
  if (boxType == "inbox") {
    $(".name-column").append(message.sender.name)
  } else {
    $(".name-column").append(message.recipient.name)
  }
  $(".message-row").append("</div>")

    //message content
  $(".message-row").append('<div class="col-sm-6 message-column">');
  $(".message-column").append
  (`<div id="body-${message.id}" class="message-body">` + ($.trim(message.content).substring(0,30).trim(this)) + '</div>');
  moreMessageHref = moreMessageHref + message.id + '/content">...</a>';
  let moreMessageLink = $(moreMessageHref).click(function(e) {
      $.get("/messages/" + message.id + "/content", function(data) {
        $("div#body-"+message.id).text(data);
      });
      e.preventDefault();
    });
  $(".message-column").append(moreMessageLink)
  $(".message-column").append("</div>")
  $(".message-row").append("</div>")

  $(".message-row").append('<div class="col-sm-3 date-column">');
  $(".date-column").append(message.created_at);
  $(".message-row").append("</div>")

  $("div#mainbox").append('</div>');
}
