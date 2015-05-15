/// <reference path="../Models/CurrentUserModel.ts" />
/// <reference path="../Templates.ts" />
/// <reference path="UpcomingRemindersViewModel.ts" />
/// <reference path="UpcomingReminderStatsViewModel.ts" />
/// <reference path="../../Scripts/typings/References.ts" />


module plsRemindMe {
    export class RemindersViewModel {
        public CurrentUser: KnockoutObservable<Models.CurrentUserModel> = ko.observable(undefined);
        public UpcomingReminders: UpcomingRemindersViewModel;
        public ReminderStats = new UpcomingReminderStatsViewModel();

        public PrimaryViewTemplate: KnockoutObservable<ViewTemplate> = ko.observable();
        public SecondaryViewTemplate: KnockoutObservable<ViewTemplate> = ko.observable();

        constructor(currentUser: Models.CurrentUserModel) {

            this.CurrentUser(currentUser);
            this.UpcomingReminders = new UpcomingRemindersViewModel(currentUser);

            this.PrimaryViewTemplate(new ViewTemplate(plsRemindMe.Templates.UpcomingReminders, this.UpcomingReminders));
            this.SecondaryViewTemplate(new ViewTemplate(plsRemindMe.Templates.ReminderStats, this.ReminderStats));
            
            this.UpcomingReminders.fetchReminders();
            this.UpcomingReminders.fetchStats();
            //this.ReminderStats.fetch();
        }
    }

    export class ViewTemplate{
        public Template: KnockoutObservable<string> = ko.observable();
        public ViewModel: KnockoutObservable<any> = ko.observable();

        constructor(template: string, viewModel: any) {
            this.Template(template);
            this.ViewModel(viewModel);
        }
    }
}