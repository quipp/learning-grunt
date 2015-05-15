var plsRemindMe;
(function (plsRemindMe) {
    /// <reference path="Enums.ts" />
    /// <reference path="../Scripts/typings/References.ts" />
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

        // will cause a jsHint error of W027
        // add back the breaks
        Helpers.FrequencyNameBuilder = function (frequency) {
            switch (frequency) {
                case plsRemindMe.FrequencyTypes.Once:
                    return "Just Once";

                case plsRemindMe.FrequencyTypes.Weekly:
                    return "Every Week";

                case plsRemindMe.FrequencyTypes.BiWeekly:
                    return "Every 2 Weeks";

                case plsRemindMe.FrequencyTypes.Monthly:
                    return "Every Month";

                case plsRemindMe.FrequencyTypes.Quarterly:
                    return "Every 3 Months";

                case plsRemindMe.FrequencyTypes.Yearly:
                    return "Once a Year";
            }

            return "";
        };

        Helpers.StatusNameBuilder = function (staus) {
            switch (staus) {
                case plsRemindMe.ReminderStatuses.Pending:
                    return "Scheduled";

                case plsRemindMe.ReminderStatuses.Overdue:
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
