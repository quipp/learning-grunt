/// <reference path="../Models/CurrentUserModel.ts" />
/// <reference path="RemindersViewModel.ts" />
/// <reference path="../../Scripts/typings/infuser/infuser.d.ts" />

module plsRemindMe{
    export class MainViewModel {
        public CurrentViewModel = {};
        public CurrentUser: KnockoutObservable<Models.CurrentUserModel>;
        
        constructor() {
            this.SetupTemplateEngine(); 
            this.CurrentUser = ko.observable(new Models.CurrentUserModel("e0aed236-3177-4ff7-9a39-25bb16c8ed62", "Derik", "Whittaker"))

            this.CurrentViewModel = new plsRemindMe.RemindersViewModel(this.CurrentUser());
        }

        private SetupTemplateEngine() {
            infuser.defaults.templatePrefix = "_";
            infuser.defaults.templateSuffix = ".tmpl.html";
            infuser.defaults.templateUrl = "/Templates";
        }
    }
}
