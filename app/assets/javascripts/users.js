$(function(){

  $("a.load_inbox").on("click", function(e) {
    $.ajax(
      {
        url: this.href,
        success: function(json) {
          $("div#mainbox").html("")
          let moreMessageHref = '<a id="more_message" href="/messages/';
          json.forEach(function(message) {
            $("div#mainbox").append(message.sender.name)
            $("div#mainbox").append("<br>")
            $("div#mainbox").append
            (`<div id="body-${message.id}">` + ($.trim(message.content).substring(0,10).trim(this)) + '</div>');
            moreMessageHref = moreMessageHref + message.id + '/content">...</a>';
            let moreMessageLink = $(moreMessageHref).click(function(e) {
                $.get("/messages/" + message.id + "/content", function(data) {
                  $("div#body-"+message.id).text(data);
                });
                e.preventDefault();
              });
            $("div#mainbox").append(moreMessageLink)
            $("div#mainbox").append("</div>")

            $("div#mainbox").append("<br>")
            $("div#mainbox").append(message.created_at);
            $("div#mainbox").append("<br>")
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
          let moreMessageHref = '<a id="more_message" href="/messages/';
          json.forEach(function(message) {
            $("div#mainbox").append(message.sender.name)
            $("div#mainbox").append("<br>")
            $("div#mainbox").append
            (`<div id="body-${message.id}">` + ($.trim(message.content).substring(0,10).trim(this)) + '</div>');
            moreMessageHref = moreMessageHref + message.id + '/content">...</a>';
            let moreMessageLink = $(moreMessageHref).click(function(e) {
                $.get("/messages/" + message.id + "/content", function(data) {
                  $("div#body-"+message.id).text(data);
                });
                e.preventDefault();
              });
            $("div#mainbox").append(moreMessageLink)
            $("div#mainbox").append("</div>")

            $("div#mainbox").append("<br>")
            $("div#mainbox").append(message.created_at);
            $("div#mainbox").append("<br>")
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
