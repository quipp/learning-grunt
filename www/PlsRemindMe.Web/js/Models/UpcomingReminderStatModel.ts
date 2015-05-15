/// <reference path="../../Scripts/typings/References.ts" />

module plsRemindMe.Models {
    export class UpcomingReminderStatModel {
        public Name: KnockoutObservable<string> = ko.observable("");
        public Count: KnockoutObservable<number> = ko.observable(0);
        public StatType: KnockoutObservable<number> = ko.observable(0);
        public Selected: KnockoutObservable<boolean> = ko.observable(false);
        
        constructor(name: string = "", count: number = 0, statType: number = 0, selected: boolean = false) {
            this.Name(name);
            this.Count(count);
            this.StatType(statType);
            this.Selected(selected);
        }
    }
}