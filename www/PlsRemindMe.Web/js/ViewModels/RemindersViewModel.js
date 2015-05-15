/// <reference path="../Models/CurrentUserModel.ts" />
/// <reference path="../Templates.ts" />
/// <reference path="UpcomingRemindersViewModel.ts" />
/// <reference path="UpcomingReminderStatsViewModel.ts" />
/// <reference path="../../Scripts/typings/References.ts" />
var plsRemindMe;
(function (plsRemindMe) {
    var RemindersViewModel = (function () {
        function RemindersViewModel(currentUser) {
            this.CurrentUser = ko.observable(undefined);
            this.ReminderStats = new plsRemindMe.UpcomingReminderStatsViewModel();
            this.PrimaryViewTemplate = ko.observable();
            this.SecondaryViewTemplate = ko.observable();
            this.CurrentUser(currentUser);
            this.UpcomingReminders = new plsRemindMe.UpcomingRemindersViewModel(currentUser);

            this.PrimaryViewTemplate(new ViewTemplate(plsRemindMe.Templates.UpcomingReminders, this.UpcomingReminders));
            this.SecondaryViewTemplate(new ViewTemplate(plsRemindMe.Templates.ReminderStats, this.ReminderStats));

            this.UpcomingReminders.fetchReminders();
            this.UpcomingReminders.fetchStats();
            //this.ReminderStats.fetch();
        }
        return RemindersViewModel;
    })();
    plsRemindMe.RemindersViewModel = RemindersViewModel;

    var ViewTemplate = (function () {
        function ViewTemplate(template, viewModel) {
            this.Template = ko.observable();
            this.ViewModel = ko.observable();
            this.Template(template);
            this.ViewModel(viewModel);
        }
        return ViewTemplate;
    })();
    plsRemindMe.ViewTemplate = ViewTemplate;
})(plsRemindMe || (plsRemindMe = {}));
