/// <reference path="../Enums.ts" />
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />

module plsRemindMe.Models {
    export class ReminderFrequencyModel {

        public Name: KnockoutObservable<string> = ko.observable("");
        public Id: KnockoutObservable<number> = ko.observable(0);
        public Selected: KnockoutObservable<boolean> = ko.observable(false);
        
        constructor(id: number, name: string, selected: boolean = false) {
            this.Id(id);
            this.Name(name);
            this.Selected(selected);
        }
    }
}