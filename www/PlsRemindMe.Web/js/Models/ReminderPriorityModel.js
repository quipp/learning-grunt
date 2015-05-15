var plsRemindMe;
(function (plsRemindMe) {
    /// <reference path="../Enums.ts" />
    /// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />
    (function (Models) {
        var ReminderPriorityModel = (function () {
            function ReminderPriorityModel(id, name, selected) {
                if (typeof selected === "undefined") { selected = false; }
                this.Name = ko.observable("");
                this.Id = ko.observable(0);
                this.Selected = ko.observable(false);
                this.Id(id);
                this.Name(name);
                this.Selected(selected);
            }
            return ReminderPriorityModel;
        })();
        Models.ReminderPriorityModel = ReminderPriorityModel;
    })(plsRemindMe.Models || (plsRemindMe.Models = {}));
    var Models = plsRemindMe.Models;
})(plsRemindMe || (plsRemindMe = {}));
