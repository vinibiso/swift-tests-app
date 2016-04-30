var ExamView = (function(e, name_t, exam_t, answers_t) {

    $el = $('<div/>');
    start = true;
    exam = e;
    nameTemplate = name_t;
    examTemplate = exam_t;
    answersTemplate = answers_t;
    render();

    function render() {
        var template = nameTemplate();
        if (!start) {
            start = false;
        } else {

        }
        $el.html(template);
    }

    return {"render": render, "html": $el};
});
