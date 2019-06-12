$(function(){

  $("a.load_inbox").on("click", function(e) {
    $.ajax(
      {
        url: this.href,
        success: function(json) {
          $("div#mainbox").html("")
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
