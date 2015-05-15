var plsRemindMe;
(function (plsRemindMe) {
    /// <reference path="../../Scripts/typings/References.ts" />
    (function (Models) {
        var UpcomingReminderStatModel = (function () {
            function UpcomingReminderStatModel(name, count, statType, selected) {
                if (typeof name === "undefined") { name = ""; }
                if (typeof count === "undefined") { count = 0; }
                if (typeof statType === "undefined") { statType = 0; }
                if (typeof selected === "undefined") { selected = false; }
                this.Name = ko.observable("");
                this.Count = ko.observable(0);
                this.StatType = ko.observable(0);
                this.Selected = ko.observable(false);
                this.Name(name);
                this.Count(count);
                this.StatType(statType);
                this.Selected(selected);
            }
            return UpcomingReminderStatModel;
        })();
        Models.UpcomingReminderStatModel = UpcomingReminderStatModel;
    })(plsRemindMe.Models || (plsRemindMe.Models = {}));
    var Models = plsRemindMe.Models;
})(plsRemindMe || (plsRemindMe = {}));
