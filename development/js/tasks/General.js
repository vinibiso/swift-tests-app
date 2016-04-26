// FUNCTION - Shows user that a severe error ocourred on the local database
// NO INPUT
// NO RETURN
function local_database_error() {
    alert("Ocorreu um problema no banco de dados local");
}

// FUNCTION - Redirects user to SyncView
// NO INPUT
// NO RETURN
function toSync() {
    location.hash = "sync";
}

function escape_string (str) {
  if (str !== null) {
    return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
      switch (char) {
        case "\0":
        return "\\0";
        case "\x08":
        return "\\b";
        case "\x09":
        return "\\t";
        case "\x1a":
        return "\\z";
        case "\n":
        return "\\n";
        case "\r":
        return "\\r";
        case "\"":
        case "'":
          return "''";
        case "\\":
        case "%":
        return "\\"+char; // prepends a backslash to backslash, percent,
        // and double/single quotes
      }
    });
  } else {
    return str;
  }
}

function format_date(string_date, withTime) {
    var d = string_date.split("-");
    d[3] = d[2].split(":");
    d[4] = d[3][0].split(" ");
    d[2] = d[4][0];
    d[3][0] = d[4][1];
    if (withTime) {
        return d[2]+"/"+d[1]+"/"+d[0]+" "+d[3][0]+":"+d[3][1];
    } else {
        return d[2]+"/"+d[1]+"/"+d[0];
    }
}

// Test if content in selector is between min and max
function lengthTest(message, selector, min, max) {
  var l = selector.val().length;
  if (l < min || l > max) {
    return makeErrorMessage(message, selector);
  } else {
    return true;
  }
}

// Alert user of error and focus on selector
function makeErrorMessage(message, selector) {
  alert(message);
  selector.focus();
  return false;
}

function handle_input_string(str) {
  return str.replace(/'/gi, '');
}

function handle_money(number) {
  return number.toFixed(2).replace(/./g, function(c, i, a) {
    return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
  });
}

Handlebars.registerHelper('money', function(number) {
  return handle_money(number);
});

Handlebars.registerHelper('date', function(date) {
  if (date !== null && date !== "") {
    return format_date(date, false);
  } else {
    return "Não Enviado";
  }
});
