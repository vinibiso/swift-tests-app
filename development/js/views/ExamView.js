var ExamView = (function(e, name_t, question_t, answers_t, thanks_t) {

    var $el = $('<div/>');
    $el.on('click', '#previous', previous);
    $el.on('click', '#start-exam', getName);
    $el.on('click', '#done-exam', syncVote);
    var start = true;
    var intervalID = null;
    var voteSent = false;
    var exam = e;
    var counter = 0;
    var nameTemplate = name_t;
    var questionTemplate = question_t;
    var answersTemplate = answers_t;
    var thanksTemplate = thanks_t;
    var answer = {
      "exam": exam.id,
      "name": "",
      "answers": []
    };
    render();

    function render() {
        var template = nameTemplate(exam);
        if (start) {
            start = false;
        } else {
            if (exam.questions.length > counter) {
                exam.questions[counter].number = counter + 1;
                exam.questions[counter].has_previous = counter > 0 ? true : false;
                for (var x = 0; x < exam.questions[counter].alternatives.length; x++) {
                    exam.questions[counter].alternatives[x].number = x+1;
                }
                template = questionTemplate(exam.questions[counter]);
            } else {
                var answers = [];
                for (var i = 0; i < exam.questions.length; i++) {
                    var a = {"question": exam.questions[i], "alternative": null};
                    for (var j = 0; j < exam.questions[i].alternatives.length; j++) {
                        if (exam.questions[i].alternatives[j].id == answer.answers[i]) {
                            a.alternative = exam.questions[i].alternatives[j];
                            break;
                        }
                    }
                    answers.push(a);
                }
                template = answersTemplate({"answers": answers, "answer": answer, "exam": exam});
            }
        }
        $el.html(template);
    }

    function selectAlternative(id) {
        answer.answers[counter] = id;
        counter += 1;
        render();
    }

    function previous() {
        counter -= 1;
        render();
    }

    function getName() {
        var name = $("#name").val();
        if (name.length > 4) {
            answer.name = name;
            render();
        } else {
            alert("Por favor preecha seu nome!");
        }
    }

    function syncVote() {
        console.log("SENDING VOTE!");
        sendVote();
        testDone = true;
        $el.html(thanksTemplate(exam));
        intervalID = setInterval(function () {
            if (!voteSent) {
                console.log("VOTE NOT SENT! TRYING AGAIN");
                sendVote();
            } else {
                console.log("VOTE SENT! CLEARING INTERVAL");
                clearInterval(intervalID);
                location.hash = "done";
            }
        }, 5000);
    }

    function sendVote() {
        API_Request("/receive_vote/", {"answer": JSON.stringify(answer)}, function(response) {
            voteSent = true;
        });
    }

    return {"render": render, "html": $el, "selectAlternative": selectAlternative};
});
