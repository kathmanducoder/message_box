$(function(){

  $("a.load_inbox").on("click", function(e) {
    $.ajax(
      {
        url: this.href,
        success: function(json) {
          let moreMessageHref = '<a id="more_message" href="/messages/';
          json.forEach(function(message) {
            $("div#inbox").append(message.sender.name)
            $("div#inbox").append("<br>")
            $("div#inbox").append
            (`<div id="body-${message.id}">` + ($.trim(message.content).substring(0,10).trim(this)) + '</div>');
            moreMessageHref = moreMessageHref + message.id + '/content">...</a>';
            let moreMessageLink = $(moreMessageHref).click(function(e) {
                $.get("/messages/" + message.id + "/content", function(data) {
                  $("div#body-"+message.id).text(data);
                });
                e.preventDefault();
              });
            $("div#inbox").append(moreMessageLink)
            $("div#inbox").append("</div>")

            $("div#inbox").append("<br>")
            $("div#inbox").append(message.created_at);
            $("div#inbox").append("<br>")
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
          json.forEach(function(message) {
            $("div#outbox").append(message.recipient.name)
            $("div#outbox").append("  |  ")
            $("div#outbox").append(message.content)
            $("div#outbox").append("  |  ")
            $("div#outbox").append(message.created_at);
            $("div#outbox").append("<br>")
          })
        }
      })
    e.preventDefault();
  })


})
