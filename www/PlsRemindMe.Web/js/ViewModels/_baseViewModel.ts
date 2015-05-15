/// <reference path="../Models/CurrentUserModel.ts" />
/// <reference path="../../Scripts/typings/References.ts" />


module plsRemindMe {
    export class _baseViewModel {
        public ErrorMessage: KnockoutObservable<string> = ko.observable("");
        public WarningMessage: KnockoutObservable<string> = ko.observable("");
        public CurrentUser: KnockoutObservable<Models.CurrentUserModel> = ko.observable(undefined);

        constructor(currentUser: Models.CurrentUserModel) {
            this.CurrentUser(currentUser);
        }
    }

}
