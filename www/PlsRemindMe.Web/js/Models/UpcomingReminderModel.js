var plsRemindMe;
(function (plsRemindMe) {
    /// <reference path="../Helpers.ts" />
    /// <reference path="../../Scripts/typings/References.ts" />
    /// <reference path="../Enums.ts" />
    (function (Models) {
        var UpcomingReminderModel = (function () {
            function UpcomingReminderModel() {
                var _this = this;
                this.Id = ko.observable(0);
                this.Title = ko.observable("");
                this.Description = ko.observable("");
                this.Date = ko.observable(undefined);
                this.Time = ko.observable(undefined);
                this.AllDay = ko.observable(false);
                this.Frequency = ko.observable(plsRemindMe.FrequencyTypes.Once);
                this.Occurrences = ko.observable(1);
                this.Priority = ko.observable(plsRemindMe.ReminderPriorityTypes.Normal);
                this.NotifyByEmail = ko.observable(false);
                this.NotifyBySms = ko.observable(false);
                this.NotifyByCall = ko.observable(false);
                this.Status = ko.observable(0);
                this.ForcastTypes = ko.observableArray([]);
                this.OthersToRemind = ko.observableArray([]);
                this.FrequencyName = ko.computed(function () {
                    return plsRemindMe.Helpers.FrequencyNameBuilder(_this.Frequency());
                });

                this.StatusName = ko.computed(function () {
                    return plsRemindMe.Helpers.StatusNameBuilder(_this.Status());
                });
            }
            return UpcomingReminderModel;
        })();
        Models.UpcomingReminderModel = UpcomingReminderModel;

        var GuestToRemindModel = (function () {
            function GuestToRemindModel() {
                this.Id = ko.observable(0);
                this.FirstName = ko.observable("");
                this.LastName = ko.observable("");
                this.EmailAddress = ko.observable("");
                this.DisplayName = ko.observable("");
            }
            return GuestToRemindModel;
        })();
        Models.GuestToRemindModel = GuestToRemindModel;
    })(plsRemindMe.Models || (plsRemindMe.Models = {}));
    var Models = plsRemindMe.Models;
})(plsRemindMe || (plsRemindMe = {}));
