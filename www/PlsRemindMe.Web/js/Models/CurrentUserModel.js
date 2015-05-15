var plsRemindMe;
(function (plsRemindMe) {
    /// <reference path="../../Scripts/typings/knockout/knockout.d.ts" />
    (function (Models) {
        var CurrentUserModel = (function () {
            function CurrentUserModel(id, firstName, lastName) {
                var _this = this;
                this.FirstName = ko.observable("");
                this.LastName = ko.observable("");
                this.EmailAddress = ko.observable("");
                this.Id = ko.observable("");
                this.Id(id);
                this.FirstName(firstName);
                this.LastName(lastName);

                this.Name = ko.computed(function () {
                    return _this.FirstName() + " " + _this.LastName();
                });
            }
            return CurrentUserModel;
        })();
        Models.CurrentUserModel = CurrentUserModel;
    })(plsRemindMe.Models || (plsRemindMe.Models = {}));
    var Models = plsRemindMe.Models;
})(plsRemindMe || (plsRemindMe = {}));
