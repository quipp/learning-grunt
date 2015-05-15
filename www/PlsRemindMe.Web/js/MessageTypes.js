var plsRemindMe;
(function (plsRemindMe) {
    (function (MessageTypes) {
        MessageTypes.SelectedReminderStateChanged = "SelectedReminderStateChanged";
        MessageTypes.NewReminderAdded = "NewReminderAdded";
    })(plsRemindMe.MessageTypes || (plsRemindMe.MessageTypes = {}));
    var MessageTypes = plsRemindMe.MessageTypes;
})(plsRemindMe || (plsRemindMe = {}));
