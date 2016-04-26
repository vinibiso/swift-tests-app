var SyncView = (function(t) {

    $el = $('<div/>');
    template = t;
    render();

    function render() {
        $el.html(template());
    }

    return {"render": render, "html": $el};
});
