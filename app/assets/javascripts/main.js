$(function(){
  $("a.load_inbox").on("click", function(e) {

    $.ajax(
      {
        url: this.href,
        success: function(json) {
          $("div#inbox").html("")
          json.forEach(function(message) {
            $("div#inbox").append(message.content);
          })
        }
      })
    e.preventDefault();
  })
})
