var plsRemindMe;
(function (plsRemindMe) {
    (function (Models) {
        var CurrentUserModel = (function () {
            function CurrentUserModel(id, firstName, lastName) {
                var _this = this;
                this.FirstName = ko.observable("");
                this.LastName = ko.observable("");
                this.EmailAddress = ko.observable("");
                this.Id = ko.observable("");
                this.Id(id);
                this.FirstName(firstName);
                this.LastName(lastName);

                this.Name = ko.computed(function () {
                    return _this.FirstName() + " " + _this.LastName();
                });
            }
            return CurrentUserModel;
        })();
        Models.CurrentUserModel = CurrentUserModel;
    })(plsRemindMe.Models || (plsRemindMe.Models = {}));
    var Models = plsRemindMe.Models;
})(plsRemindMe || (plsRemindMe = {}));
var plsRemindMe;
(function (plsRemindMe) {
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
var plsRemindMe;
(function (plsRemindMe) {
    (function (DataLoadStatuses) {
        DataLoadStatuses[DataLoadStatuses["Initial"] = 1] = "Initial";
        DataLoadStatuses[DataLoadStatuses["Fetching"] = 2] = "Fetching";
        DataLoadStatuses[DataLoadStatuses["NoResults"] = 3] = "NoResults";
        DataLoadStatuses[DataLoadStatuses["NoFilterResults"] = 4] = "NoFilterResults";
        DataLoadStatuses[DataLoadStatuses["FoundResults"] = 5] = "FoundResults";
    })(plsRemindMe.DataLoadStatuses || (plsRemindMe.DataLoadStatuses = {}));
    var DataLoadStatuses = plsRemindMe.DataLoadStatuses;

    (function (ReminderStatuses) {
        ReminderStatuses[ReminderStatuses["Pending"] = 1] = "Pending";
        ReminderStatuses[ReminderStatuses["Overdue"] = 2] = "Overdue";
    })(plsRemindMe.ReminderStatuses || (plsRemindMe.ReminderStatuses = {}));
    var ReminderStatuses = plsRemindMe.ReminderStatuses;

    (function (FrequencyTypes) {
        FrequencyTypes[FrequencyTypes["Once"] = 1] = "Once";
        FrequencyTypes[FrequencyTypes["Weekly"] = 2] = "Weekly";
        FrequencyTypes[FrequencyTypes["BiWeekly"] = 3] = "BiWeekly";
        FrequencyTypes[FrequencyTypes["Monthly"] = 4] = "Monthly";
        FrequencyTypes[FrequencyTypes["BiMonthly"] = 5] = "BiMonthly";
        FrequencyTypes[FrequencyTypes["Quarterly"] = 6] = "Quarterly";
        FrequencyTypes[FrequencyTypes["SemiAnnually"] = 7] = "SemiAnnually";
        FrequencyTypes[FrequencyTypes["Yearly"] = 8] = "Yearly";
    })(plsRemindMe.FrequencyTypes || (plsRemindMe.FrequencyTypes = {}));
    var FrequencyTypes = plsRemindMe.FrequencyTypes;

    (function (ReminderPriorityTypes) {
        ReminderPriorityTypes[ReminderPriorityTypes["Normal"] = 1] = "Normal";
        ReminderPriorityTypes[ReminderPriorityTypes["High"] = 2] = "High";
        ReminderPriorityTypes[ReminderPriorityTypes["Urgent"] = 3] = "Urgent";
        ReminderPriorityTypes[ReminderPriorityTypes["HairsOnFire"] = 4] = "HairsOnFire";
    })(plsRemindMe.ReminderPriorityTypes || (plsRemindMe.ReminderPriorityTypes = {}));
    var ReminderPriorityTypes = plsRemindMe.ReminderPriorityTypes;

    (function (ForcastingType) {
        ForcastingType[ForcastingType["All"] = 1] = "All";
        ForcastingType[ForcastingType["Today"] = 2] = "Today";
        ForcastingType[ForcastingType["Tomorrow"] = 3] = "Tomorrow";
        ForcastingType[ForcastingType["ThisWeek"] = 4] = "ThisWeek";
        ForcastingType[ForcastingType["NextWeek"] = 5] = "NextWeek";
        ForcastingType[ForcastingType["ThisMonth"] = 6] = "ThisMonth";
        ForcastingType[ForcastingType["NextMonth"] = 7] = "NextMonth";
        ForcastingType[ForcastingType["Overdue"] = 98] = "Overdue";
        ForcastingType[ForcastingType["Scheduled"] = 99] = "Scheduled";
    })(plsRemindMe.ForcastingType || (plsRemindMe.ForcastingType = {}));
    var ForcastingType = plsRemindMe.ForcastingType;
})(plsRemindMe || (plsRemindMe = {}));
var plsRemindMe;
(function (plsRemindMe) {
    (function (Helpers) {
        Helpers.ValidationConfiguration = {
            registerExtenders: true,
            messagesOnModified: true,
            insertMessages: false,
            parseInputAttributes: true,
            messageTemplate: null,
            decorateElement: true,
            errorElementClass: "prm-inline-field-validation-error"
        };

        Helpers.FrequencyNameBuilder = function (frequency) {
            switch (frequency) {
                case 1 /* Once */:
                    return "Just Once";

                case 2 /* Weekly */:
                    return "Every Week";

                case 3 /* BiWeekly */:
                    return "Every 2 Weeks";

                case 4 /* Monthly */:
                    return "Every Month";

                case 6 /* Quarterly */:
                    return "Every 3 Months";

                case 8 /* Yearly */:
                    return "Once a Year";
            }

            return "";
        };

        Helpers.StatusNameBuilder = function (staus) {
            switch (staus) {
                case 1 /* Pending */:
                    return "Scheduled";

                case 2 /* Overdue */:
                    return "Overdue";
            }

            return "";
        };

        var jQuery = (function () {
            function jQuery() {
            }
            jQuery.prototype.getScriptContents = function (id) {
                var script = $("#" + id);

                if (script.html() === undefined) {
                    throw "Id of " + id + " was not found";
                }

                var contents = $($.parseHTML(script.html())[1]);

                return contents;
            };
            return jQuery;
        })();
        Helpers.jQuery = jQuery;
    })(plsRemindMe.Helpers || (plsRemindMe.Helpers = {}));
    var Helpers = plsRemindMe.Helpers;
})(plsRemindMe || (plsRemindMe = {}));
var plsRemindMe;
(function (plsRemindMe) {
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
                this.Frequency = ko.observable(1 /* Once */);
                this.Occurrences = ko.observable(1);
                this.Priority = ko.observable(1 /* Normal */);
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
var plsRemindMe;
(function (plsRemindMe) {
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
var plsRemindMe;
(function (plsRemindMe) {
    (function (Models) {
        var ReminderFrequencyModel = (function () {
            function ReminderFrequencyModel(id, name, selected) {
                if (typeof selected === "undefined") { selected = false; }
                this.Name = ko.observable("");
                this.Id = ko.observable(0);
                this.Selected = ko.observable(false);
                this.Id(id);
                this.Name(name);
                this.Selected(selected);
            }
            return ReminderFrequencyModel;
        })();
        Models.ReminderFrequencyModel = ReminderFrequencyModel;
    })(plsRemindMe.Models || (plsRemindMe.Models = {}));
    var Models = plsRemindMe.Models;
})(plsRemindMe || (plsRemindMe = {}));
