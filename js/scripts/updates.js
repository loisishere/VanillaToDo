var todostats = (function() {
    var activeText = document.querySelector('.active');
    var active = 0;
    var activeElem = document.querySelector('.display__active');
    events.on('activeTasks', setActive);

    render();

    function render() {
        activeText.textContent = active;
    }

    function setActive(set) {
        active = set;
        render();
    }


})();