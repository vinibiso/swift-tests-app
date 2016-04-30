// GLOBAL-VARIABLE - Keeps, API URL
  var API_URL = "http://localhost:8080/api";

// FUNCTION - Handles Generic Comunication errors
// NO INPUT
// NO RETURN
// PS:
//    Logs full error
function API_com_error(e) {
  console.log(e);
  alert("Ocorreu um erro de comunicação");
}

// FUNCTION - Show user that server is not available
// NO INPUT
// NO RETURN
function API_not_on() {
  alert("O Servidor não esta online. Tente novamente mais tarde.");
}

// FUNCTION - pings server before making a request and handles errors
// INPUT:
//    url [URL to make the request]
//    data [data to send]
//    success_fun [function that handles success]
// NO RETURN
// PS:
//    Only calls success_fun if no errors ocurred
function API_Request(url, data, success_fun) {
  $.ajax({
      type: "POST",
      crossDomain: true,
      url: API_URL+"/ping/",
      data: {},
      datatype: "json",
      success: function(response) {
        response = JSON.parse(response);
        if (response.message == "UP") {
          $.ajax({
            type: "POST",
            crossDomain: true,
            url: API_URL+url,
            data: data,
            datatype: "json",
            success: function (response) {
              response = JSON.parse(response);
              message = response.message;
              success_fun(response);
            },
            error: API_com_error
          });
        } else {
          API_not_on();
        }
      },
      error: API_com_error
  });
}
