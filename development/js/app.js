var testDone = false;
var exam = null;
(function() {
    /* ---------------------------------- Local Variables ---------------------------------- */
    handleMessagesAddon = "<script>{{#if message }} var message = '{{message}}'; alert(message); {{/if }}</script>";
    // Initial, Loading and Thanks Templates
    var loadingTemplate = Handlebars.compile($("#loading-tpl").html());
    var syncTemplate = Handlebars.compile($("#sync-tpl").html());
    var waitTemplate = Handlebars.compile($("#wait-tpl").html());
    var thanksTemplate = Handlebars.compile($("#thanks-tpl").html());
    // Main Templates
    var questionTemplate = Handlebars.compile($("#question-tpl").html());
    var answersTemplate = Handlebars.compile($("#answers-tpl").html());
    var nameTemplate = Handlebars.compile($("#name-tpl").html());

    router.addRoute('', function() {
        $("body").html(new LoadingView(loadingTemplate).html);
        location.hash = "wait";
    });

    router.addRoute('sync_redirect', function() {
        $("body").html("");
        location.hash = "sync";
    });

    router.addRoute('sync', function() {
        $("body").html(new SyncView(syncTemplate).html);
        new Syncronize();
    });

    router.addRoute('wait', function() {
        $("body").html(new WaitView(waitTemplate).html);
    });

    router.addRoute('exam', function() {
        $("body").html(new ExamView(nameTemplate, examTemplate, answersTemplate).html);
    });

    router.addRoute('thanks', function() {
        $("body").html(new ThanksView(thanksTemplate).html);
    });

    router.start();

    /* --------------------------------- Event Registration -------------------------------- */
    document.addEventListener('deviceready', function() {
        if (navigator.notification) { // Override default HTML alert with native dialog
            window.alert = function(message) {
                navigator.notification.alert(
                    message, // message
                    null, // callback
                    "Swift Tests", // title
                    'OK' // buttonName
                );
            };

        }
        FastClick.attach(document.body);
    }, false);

    /* ---------------------------------- Local Functions ---------------------------------- */
}());
