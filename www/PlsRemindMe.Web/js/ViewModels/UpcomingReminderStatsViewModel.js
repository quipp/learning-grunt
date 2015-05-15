/// <reference path="../MessageTypes.ts" />
/// <reference path="../Models/ModelReferences.ts" />
/// <reference path="_baseViewModel.ts" />
/// <reference path="../../Scripts/typings/References.ts" />
/// <reference path="../Enums.ts" />
/// <reference path="../Helpers.ts" />
/// <reference path="../Routes.ts" />
var plsRemindMe;
(function (plsRemindMe) {
    var UpcomingReminderStatsViewModel = (function () {
        function UpcomingReminderStatsViewModel() {
            var _this = this;
            this.SelectedStat = ko.observable().publishOn(plsRemindMe.MessageTypes.SelectedReminderStateChanged);
            this.Stats = ko.observableArray([]);
            this.ReminderAddedSubscriber = ko.observable().subscribeTo(plsRemindMe.MessageTypes.NewReminderAdded);
            this.ReminderAddedChanged = ko.computed(function () {
                if (_this.ReminderAddedSubscriber()) {
                    _this.updateStats(_this.ReminderAddedSubscriber());
                }
            });
        }
        UpcomingReminderStatsViewModel.prototype.fetch = function () {
            var self = this;
            var route = plsRemindMe.Routes.ReminderStats + '/e0aed236-3177-4ff7-9a39-25bb16c8ed62';
            $.get(route).done(function (results) {
                var convertedResults = [];
                _.each(results, function (result) {
                    convertedResults.push(ko.mapping.fromJS(result, {}, new plsRemindMe.Models.UpcomingReminderStatModel()));
                });

                self.Stats(convertedResults);
            }).fail();
        };

        UpcomingReminderStatsViewModel.prototype.selectReminderStat = function (stat) {
            var filtered = _.filter(this.Stats(), function (stat) {
                return stat.Selected() === true;
            });

            _.each(filtered, function (stat) {
                stat.Selected(false);
            });

            stat.Selected(true);
            this.SelectedStat(stat);
        };

        UpcomingReminderStatsViewModel.prototype.updateStats = function (reminder) {
            var types = reminder.ForcastTypes();

            _.each(this.Stats(), function (stat) {
                if (types.indexOf(stat.StatType()) >= 0) {
                    stat.Count(stat.Count() + 1);
                }
            });
        };
        return UpcomingReminderStatsViewModel;
    })();
    plsRemindMe.UpcomingReminderStatsViewModel = UpcomingReminderStatsViewModel;
})(plsRemindMe || (plsRemindMe = {}));
