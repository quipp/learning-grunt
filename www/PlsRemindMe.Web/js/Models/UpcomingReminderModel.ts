/// <reference path="../Helpers.ts" />
/// <reference path="../../Scripts/typings/References.ts" />
/// <reference path="../Enums.ts" />


module plsRemindMe.Models {
    export class UpcomingReminderModel {
        public Id: KnockoutObservable<number> = ko.observable(0);
        public Title: KnockoutObservable<string> = ko.observable("");
        public Description: KnockoutObservable<string> = ko.observable("");
        public Date: KnockoutObservable<string> = ko.observable(undefined);
        public Time: KnockoutObservable<string> = ko.observable(undefined);
        public AllDay: KnockoutObservable<boolean> = ko.observable(false);
        public Frequency: KnockoutObservable<number> = ko.observable(plsRemindMe.FrequencyTypes.Once);
        public Occurrences: KnockoutObservable<number> = ko.observable(1);
        public Priority: KnockoutObservable<number> = ko.observable(plsRemindMe.ReminderPriorityTypes.Normal);
        public NotifyByEmail: KnockoutObservable<boolean> = ko.observable(false);
        public NotifyBySms: KnockoutObservable<boolean> = ko.observable(false);
        public NotifyByCall: KnockoutObservable<boolean> = ko.observable(false);
        public Status: KnockoutObservable<ReminderStatuses> = ko.observable(0);
        public ForcastTypes: KnockoutObservableArray<number> = ko.observableArray([]);
        public OthersToRemind: KnockoutObservableArray<GuestToRemindModel> = ko.observableArray([]);

        public FrequencyName: KnockoutComputed<string>;
        public StatusName: KnockoutComputed<string>;

        constructor() {
            this.FrequencyName = ko.computed(() => {
                return plsRemindMe.Helpers.FrequencyNameBuilder(this.Frequency());
            });

            this.StatusName = ko.computed(() => {
                return plsRemindMe.Helpers.StatusNameBuilder(this.Status());
            });
        }

    }

    export class GuestToRemindModel{
        public Id: KnockoutObservable<number> = ko.observable(0);
        public FirstName: KnockoutObservable<string> = ko.observable("");
        public LastName: KnockoutObservable<string> = ko.observable("");
        public EmailAddress: KnockoutObservable<string> = ko.observable("");

        public DisplayName: KnockoutObservable<string> = ko.observable("");

    }
}