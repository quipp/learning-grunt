/// <reference path="Enums.ts" />
/// <reference path="../Scripts/typings/References.ts" />

module plsRemindMe.Helpers {
    export var ValidationConfiguration = {
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
    export var FrequencyNameBuilder = (frequency: number) => {
        switch (frequency) {
            case plsRemindMe.FrequencyTypes.Once:
                return "Just Once";
                //break;

            case plsRemindMe.FrequencyTypes.Weekly:
                return "Every Week";
                //break;

            case plsRemindMe.FrequencyTypes.BiWeekly:
                return "Every 2 Weeks";
                //break;

            case plsRemindMe.FrequencyTypes.Monthly:
                return "Every Month";
                //break;

            case plsRemindMe.FrequencyTypes.Quarterly:
                return "Every 3 Months";
                //break;

            case plsRemindMe.FrequencyTypes.Yearly:
                return "Once a Year";
                //break;
        }
        
        return "";
    };

    export var StatusNameBuilder = (staus: number) => {
        switch (staus) {
            case plsRemindMe.ReminderStatuses.Pending:
                return "Scheduled";

            case plsRemindMe.ReminderStatuses.Overdue:
                return "Overdue";
        }

        return "";
    };

    export class jQuery{
        public getScriptContents(id: string) : any {
            var script = $("#" + id);

            if (script.html() === undefined) {
                throw "Id of " + id + " was not found";
            }

            var contents = $($.parseHTML(script.html())[1]);

            return contents;
        }
    }

}