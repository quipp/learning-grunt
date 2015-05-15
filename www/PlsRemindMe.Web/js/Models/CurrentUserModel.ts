
/// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />

module plsRemindMe.Models {
    export class CurrentUserModel {

        public Name: KnockoutComputed<string>;
        public FirstName: KnockoutObservable<string> = ko.observable("");
        public LastName: KnockoutObservable<string> = ko.observable("");
        public EmailAddress: KnockoutObservable<string> = ko.observable("");
        public Id: KnockoutObservable<string> = ko.observable("");

        constructor(id: string, firstName: string, lastName: string) {
            this.Id(id);
            this.FirstName(firstName);
            this.LastName(lastName);

            this.Name = ko.computed(() => {
                return this.FirstName() + " " + this.LastName();
            });
        }
    }
}