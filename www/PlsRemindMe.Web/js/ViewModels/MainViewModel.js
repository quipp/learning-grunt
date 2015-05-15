/// <reference path="../Models/CurrentUserModel.ts" />
/// <reference path="RemindersViewModel.ts" />
/// <reference path="../../Scripts/typings/infuser/infuser.d.ts" />
var plsRemindMe;
(function (plsRemindMe) {
    var MainViewModel = (function () {
        function MainViewModel() {
            this.CurrentViewModel = {};
            this.SetupTemplateEngine();
            this.CurrentUser = ko.observable(new plsRemindMe.Models.CurrentUserModel("e0aed236-3177-4ff7-9a39-25bb16c8ed62", "Derik", "Whittaker"));

            this.CurrentViewModel = new plsRemindMe.RemindersViewModel(this.CurrentUser());
        }
        MainViewModel.prototype.SetupTemplateEngine = function () {
            infuser.defaults.templatePrefix = "_";
            infuser.defaults.templateSuffix = ".tmpl.html";
            infuser.defaults.templateUrl = "/Templates";
        };
        return MainViewModel;
    })();
    plsRemindMe.MainViewModel = MainViewModel;
})(plsRemindMe || (plsRemindMe = {}));
