var testDone = false;
var test = null;
var exam = null;
var examView = null;
(function() {
    /* ---------------------------------- Local Variables ---------------------------------- */
    handleMessagesAddon = "<script>{{#if message }} var message = '{{message}}'; alert(message); {{/if }}</script>";
    // Initial, Loading and Thanks Templates
    var loadingTemplate = Handlebars.compile($("#loading-tpl").html());
    var syncTemplate = Handlebars.compile($("#sync-tpl").html());
    var waitTemplate = Handlebars.compile($("#wait-tpl").html());
    var thanksTemplate = Handlebars.compile($("#thanks-tpl").html());
    var doneTemplate = Handlebars.compile($("#done-tpl").html());
    // Main Templates
    var questionTemplate = Handlebars.compile($("#question-tpl").html());
    var answersTemplate = Handlebars.compile($("#answers-tpl").html());
    var nameTemplate = Handlebars.compile($("#name-tpl").html());

    router.addRoute('', function() {
        $("body").html(new LoadingView(loadingTemplate).html);
        var ip = prompt("Por favor insira o endereço do servidor de prova.", "127.0.0.1");
        if (ip.length > 7) {
            API_URL = "http://"+ip+":8080/api";
        }
         API_URL = "http://192.168.1.104:8080/api";
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
        examView = new ExamView(exam, nameTemplate, questionTemplate, answersTemplate, thanksTemplate);
        $("body").html(examView.html);
    });

    router.addRoute('thanks', function() {
        $("body").html(new ThanksView(exam, thanksTemplate).html);
    });

    router.addRoute('done', function() {
        $("body").html(new DoneView(doneTemplate).html);
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
