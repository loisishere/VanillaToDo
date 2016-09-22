var todostats = (function() {
    var activeElem = document.querySelector('.active');
    var active = 0;
    events.on('activeTasks', setActive);
    render();

    function render() {
        activeElem.textContent = active;
    }

    function setActive(set) {
        active = set;
        render();
    }

})();