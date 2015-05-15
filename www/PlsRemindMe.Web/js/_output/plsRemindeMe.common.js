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
    (function (MessageTypes) {
        MessageTypes.SelectedReminderStateChanged = "SelectedReminderStateChanged";
        MessageTypes.NewReminderAdded = "NewReminderAdded";
    })(plsRemindMe.MessageTypes || (plsRemindMe.MessageTypes = {}));
    var MessageTypes = plsRemindMe.MessageTypes;
})(plsRemindMe || (plsRemindMe = {}));
var plsRemindMe;
(function (plsRemindMe) {
    (function (Routes) {
        Routes.UpcomingReminders = "api/Reminders/Upcoming";
        Routes.ReminderStats = "api/Reminders/Stats";
        Routes.CreateReminder = "api/Reminders/Create";
        Routes.DeleteReminder = "api/Reminders/Delete";

        Routes.ReminderConnections = "api/Connections/ReminderConnections";
    })(plsRemindMe.Routes || (plsRemindMe.Routes = {}));
    var Routes = plsRemindMe.Routes;
})(plsRemindMe || (plsRemindMe = {}));
var plsRemindMe;
(function (plsRemindMe) {
    (function (Templates) {
        Templates.UpcomingReminders = "reminders.upcoming";
        Templates.ReminderStats = "reminders.stats";
        Templates.Reminders = "reminders.main";
    })(plsRemindMe.Templates || (plsRemindMe.Templates = {}));
    var Templates = plsRemindMe.Templates;
})(plsRemindMe || (plsRemindMe = {}));
