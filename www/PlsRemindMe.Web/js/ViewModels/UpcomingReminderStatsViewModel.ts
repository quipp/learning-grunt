/// <reference path="../MessageTypes.ts" />
/// <reference path="../Models/ModelReferences.ts" />
/// <reference path="_baseViewModel.ts" />
/// <reference path="../../Scripts/typings/References.ts" />
/// <reference path="../Enums.ts" />
/// <reference path="../Helpers.ts" />
/// <reference path="../Routes.ts" />

module plsRemindMe {
    export class UpcomingReminderStatsViewModel {


        public SelectedStat: KnockoutObservable<Models.UpcomingReminderStatModel> = ko.observable().publishOn(plsRemindMe.MessageTypes.SelectedReminderStateChanged);
        public Stats: KnockoutObservableArray<Models.UpcomingReminderStatModel> = ko.observableArray([]);

        public ReminderAddedChanged: KnockoutComputed<void >;
        public ReminderAddedSubscriber: KnockoutObservable<Models.UpcomingReminderModel> = ko.observable().subscribeTo(plsRemindMe.MessageTypes.NewReminderAdded);

        constructor() {           
            this.ReminderAddedChanged = ko.computed(() => {
                if (this.ReminderAddedSubscriber()) {
                    this.updateStats(this.ReminderAddedSubscriber());
                }
            });   
        }

        public fetch() {
            var self = this;
            var route = Routes.ReminderStats + '/e0aed236-3177-4ff7-9a39-25bb16c8ed62';
            $.get(route)
                .done((results) => {

                    var convertedResults = [];
                    _.each(results, (result) => {
                        convertedResults.push(ko.mapping.fromJS(result, {}, new Models.UpcomingReminderStatModel()));
                    });

                    self.Stats(convertedResults);
                })
                .fail();
        }

        public selectReminderStat(stat: Models.UpcomingReminderStatModel) {
            var filtered = _.filter(this.Stats(), (stat: Models.UpcomingReminderStatModel) => {
                return stat.Selected() === true;
            });

            _.each(filtered, (stat: Models.UpcomingReminderStatModel) => { stat.Selected(false); });

            stat.Selected(true);
            this.SelectedStat(stat);
        }

        private updateStats(reminder: Models.UpcomingReminderModel) {
            var types = reminder.ForcastTypes();

            _.each(this.Stats(), (stat: Models.UpcomingReminderStatModel) => {
                
                if (types.indexOf(stat.StatType()) >= 0) {
                    stat.Count( stat.Count() + 1 );
                }
            });
        }
    }
}