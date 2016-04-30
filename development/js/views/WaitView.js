var WaitView = (function(t) {

    var $el = $('<div/>');
    $el.on('click', '#toSync', redirectToSync);
    var template = t;
    var counter = 30;
    var intervalID;
    render();

    function render() {
        $el.html(template());
    }

    intervalID = setInterval(function () {
        counter -= 1;
        $("#seconds").html(counter);
        if (counter === 0) {
            console.log("Go to sync");
            clearInterval(intervalID);
            location.hash = "sync";
        }
    }, 1000);

    function redirectToSync() {
        clearInterval(intervalID);
        location.hash = "sync";
    }

    return {"render": render, "html": $el};
});
