var Syncronize = (function() {
  if (!testDone) {
    API_Request("/send_exam/", {}, function(response) {
      if (response.message == "NO_TEST") {
        console.log("NO TEST YET");
        location.hash = "wait";
      } else {
        console.log("GOT TEST!");
        exam = response.exam;
        location.hash = "exam";
      }
    });
  } else {
    location.hash = "done";
  }
});
