var events = {
    events: {},
    on: function(eventName, func) {
        this.events[eventName] = this.events[eventName] || [];
        this.events[eventName].push(func);
    },
    off: function(eventName, func) {
        if (this.events[eventName]) {
            for (var i = 0; i < this.events[eventName].length; i++) {
                if (this.events[eventName][i] === func) {
                    this.events[eventName].splice(i, 1);
                    break;
                };
            };
        };
    },
    emit: function(eventName, data) {
        if (this.events[eventName]) {
            this.events[eventName].forEach(function(func) {
                func(data);
            });
        }
    }
}