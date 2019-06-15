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

  $("div#mainbox").append(`<div class="row message-row-${message.id}">`);

      //sender/receiver name
  $(`.message-row-${message.id}`).append('<div class="col-sm-3 name-column">');
  if (boxType == "inbox") {
    $(`.message-row-${message.id} .name-column`).append(message.sender.name)
  } else {
    $(`.message-row-${message.id} .name-column`).append(message.recipient.name)
  }
  $(`.message-row-${message.id}`).append("</div>")

    //message content
  $(`.message-row-${message.id}`).append('<div class="col-sm-6 message-column">');
  $(`.message-row-${message.id} .message-column`).append(
    `<div id="body-${message.id}" class="message-body">` + ($.trim(message.content).substring(0,40).trim(this)) + '</div>'
  );

  if (message.content.length > 40) {
    let moreMessageHref = '<a id="more_message" href="/messages/' + message.id + '/content">...</a>';
    let moreMessageLink = $(moreMessageHref).click(function(e) {
        $.get("/messages/" + message.id + "/content", function(data) {
          $("div#body-"+message.id).text(data);
        });
        e.preventDefault();
      });
    $(`.message-row-${message.id} .message-column .message-body`).append(moreMessageLink)
  }
  $(`.message-row-${message.id}`).append("</div>")

  $(`.message-row-${message.id}`).append('<div class="col-sm-3 date-column">');
  $(`.message-row-${message.id} .date-column`).append(message.created_at);
  $(`.message-row-${message.id}`).append("</div>")

  $("div#mainbox").append('</div>');
}
