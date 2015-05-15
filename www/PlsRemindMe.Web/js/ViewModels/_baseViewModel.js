/// <reference path="../Models/CurrentUserModel.ts" />
/// <reference path="../../Scripts/typings/References.ts" />
var plsRemindMe;
(function (plsRemindMe) {
    var _baseViewModel = (function () {
        function _baseViewModel(currentUser) {
            this.ErrorMessage = ko.observable("");
            this.WarningMessage = ko.observable("");
            this.CurrentUser = ko.observable(undefined);
            this.CurrentUser(currentUser);
        }
        return _baseViewModel;
    })();
    plsRemindMe._baseViewModel = _baseViewModel;
})(plsRemindMe || (plsRemindMe = {}));
