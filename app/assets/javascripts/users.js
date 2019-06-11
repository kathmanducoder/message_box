$(function(){
  $("a.load_inbox").on("click", function(e) {
    $.ajax(
      {
        url: this.href,
        success: function(json) {
          json.forEach(function(message) {
            $("div#inbox").append(message.sender.name)
            $("div#inbox").append("  |  ")
            $("div#inbox").append(message.subject)
            $("div#inbox").append("  |  ")
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
            $("div#outbox").append(message.subject)
            $("div#outbox").append("  |  ")
            $("div#outbox").append(message.created_at);
            $("div#outbox").append("<br>")
          })
        }
      })
    e.preventDefault();
  })
})
