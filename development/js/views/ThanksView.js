var ThanksView = (function(e, t) {

    $el = $('<div/>');
    template = t;
    exam = e;
    render();

    function render() {
        $el.html(template(exam));
    }

    return {"render": render, "html": $el};
});
