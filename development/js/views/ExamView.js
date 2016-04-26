var ExamView = (function(name_t, exam_t, answers_t) {

    $el = $('<div/>');
    template = name_t;
    examTemplate = exam_t;
    answersTemplate = answers_t;
    render();

    function render() {
        $el.html(template());
    }

    return {"render": render, "html": $el};
});
