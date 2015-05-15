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
