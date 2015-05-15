/// <reference path="../Models/CurrentUserModel.ts" />
/// <reference path="NewReminderViewModel.ts" />
/// <reference path="../MessageTypes.ts" />
/// <reference path="../Models/ModelReferences.ts" />
/// <reference path="_baseViewModel.ts" />
/// <reference path="../../Scripts/typings/References.ts" />
/// <reference path="../Enums.ts" />
/// <reference path="../Helpers.ts" />
/// <reference path="../Routes.ts" />
var plsRemindMe;
(function (plsRemindMe) {
    var UpcomingRemindersViewModel = (function () {
        function UpcomingRemindersViewModel(currentUser) {
            this.CurrentUser = ko.observable(undefined);
            this.Stats = ko.observableArray([]);
            this.NavigationStats = ko.observableArray([]);
            this.FilterStats = ko.observableArray([]);
            this.Reminders = ko.observableArray([]);
            this.RemindersUnFiltered = ko.observableArray([]);
            this.SelectedNavFilter = ko.observable();
            this.SelectedRangeFilter = ko.observable();
            this.ReminderAddedPublisher = ko.observable().publishOn(plsRemindMe.MessageTypes.NewReminderAdded);
            this.DataLoadStatus = ko.observable(plsRemindMe.DataLoadStatuses.Initial);
            this.pageSize = 8;
            this.activePage = 1;
            this.CurrentUser(currentUser);
        }
        UpcomingRemindersViewModel.prototype.deleteReminder = function (reminder) {
            var self = this;
            var elementKey = "[data-key='" + reminder.Id() + "']";
            $(elementKey).hide({
                effect: 'highlight',
                complete: function () {
                    var route = plsRemindMe.Routes.DeleteReminder + '/' + reminder.Id();
                    $.ajax({
                        url: route,
                        type: 'DELETE'
                    }).done(function (results) {
                    }).always();

                    self.updateStatusStats(reminder, false);
                    self.Reminders.remove(reminder);
                    self.RemindersUnFiltered.remove(reminder);
                }
            });
        };

        UpcomingRemindersViewModel.prototype.determinePriorityIndicator = function (reminder) {
            switch (reminder.Priority()) {
                case plsRemindMe.ReminderPriorityTypes.Normal:
                    return "prm-normal-priority-indicator";
                case plsRemindMe.ReminderPriorityTypes.High:
                    return "prm-high-priority-indicator";
                case plsRemindMe.ReminderPriorityTypes.Urgent:
                    return "prm-urgent-priority-indicator";
                case plsRemindMe.ReminderPriorityTypes.HairsOnFire:
                    return "prm-onfire-priority-indicator";

                default:
                    return "";
            }
        };

        UpcomingRemindersViewModel.prototype.editReminder = function (reminder) {
            var self = this;
        };

        UpcomingRemindersViewModel.prototype.fetchReminders = function () {
            var self = this;
            var route = plsRemindMe.Routes.UpcomingReminders + '/' + self.CurrentUser().Id();
            self.DataLoadStatus(plsRemindMe.DataLoadStatuses.Fetching);
            $.get(route).done(function (results) {
                var convertedResults = [];
                _.each(results, function (result) {
                    var mappedReminder = ko.mapping.fromJS(result, {}, new plsRemindMe.Models.UpcomingReminderModel());
                    convertedResults.push(mappedReminder);
                });

                self.RemindersUnFiltered(convertedResults);
                self.DataLoadStatus(convertedResults.length === 0 ? plsRemindMe.DataLoadStatuses.NoResults : plsRemindMe.DataLoadStatuses.FoundResults);

                if (convertedResults.length > 0) {
                    self.filter(1, 1, 1, true);
                }

                // we want to turn this on in order to show the assocated persons name
                $("[data-toggle='tooltip']").tooltip();
            }).fail();
        };

        UpcomingRemindersViewModel.prototype.fetchStats = function () {
            var self = this;
            var route = plsRemindMe.Routes.ReminderStats + '/' + self.CurrentUser().Id();
            $.get(route).done(function (results) {
                var convertedResults = [];
                _.each(results, function (result) {
                    var converted = ko.mapping.fromJS(result, {}, new plsRemindMe.Models.UpcomingReminderStatModel());
                    convertedResults.push(converted);

                    if (converted.StatType() == plsRemindMe.ForcastingType.All) {
                        var navStat = converted;
                        var rangeStat = ko.mapping.fromJS(result, {}, new plsRemindMe.Models.UpcomingReminderStatModel());
                        navStat.Selected(true);
                        rangeStat.Selected(true);
                        self.NavigationStats.push(navStat);
                        self.FilterStats.push(rangeStat);
                        self.SelectedNavFilter(navStat);
                        self.SelectedRangeFilter(rangeStat);
                    } else if (converted.StatType() == plsRemindMe.ForcastingType.Overdue || converted.StatType() == plsRemindMe.ForcastingType.Scheduled) {
                        self.NavigationStats.push(converted);
                    } else {
                        self.FilterStats.push(converted);
                    }
                });

                self.Stats(convertedResults);
            }).fail();
        };

        UpcomingRemindersViewModel.prototype.filter = function (statusFilterKey, rangeFilterKey, currentPage, setupPaging) {
            if (typeof currentPage === "undefined") { currentPage = 1; }
            if (typeof setupPaging === "undefined") { setupPaging = false; }
            var self = this;
            self.DataLoadStatus(plsRemindMe.DataLoadStatuses.Fetching);

            var filtered = _.filter(self.RemindersUnFiltered(), function (item) {
                var forcastMatch = _.any(item.ForcastTypes(), function (type) {
                    var typeMatch = type == statusFilterKey;
                    return typeMatch;
                });

                return forcastMatch;
            });

            filtered = _.filter(filtered, function (item) {
                var forcastMatch = _.any(item.ForcastTypes(), function (type) {
                    var typeMatch = type == rangeFilterKey;
                    return typeMatch;
                });

                return forcastMatch;
            });

            filtered = _.sortBy(filtered, function (item) {
                return item.Date();
            });

            var start = currentPage == 1 ? 0 : ((currentPage - 1) * self.pageSize);
            var end = (start + self.pageSize <= filtered.length) ? self.pageSize : undefined;
            var paged = filtered.slice(start, end);

            self.Reminders([]);
            self.Reminders(paged);

            self.DataLoadStatus(paged.length > 0 ? plsRemindMe.DataLoadStatuses.FoundResults : plsRemindMe.DataLoadStatuses.NoFilterResults);

            if (setupPaging) {
                self.setupPaging(1, filtered.length);
            }
        };

        UpcomingRemindersViewModel.prototype.newReminder = function () {
            var self = this;

            var helper = new plsRemindMe.Helpers.jQuery();
            var dialog = helper.getScriptContents("reminderDialogHtml");

            dialog.on('hidden', function () {
                dialog.off('shown');

                if (newReminder.IsSaved()) {
                    _.each(newReminder.CreatedReminders(), function (reminder) {
                        self.RemindersUnFiltered.unshift(reminder);
                        self.ReminderAddedPublisher(reminder);
                        self.updateStatusStats(reminder);
                    });

                    var navFilterType = self.SelectedNavFilter() ? self.SelectedNavFilter().StatType() : 1;
                    var rangeFilterType = self.SelectedRangeFilter() ? self.SelectedRangeFilter().StatType() : 1;
                    self.filter(navFilterType, rangeFilterType, 1, true);
                }

                dialog.remove();
            });

            dialog.on('shown', function () {
                newReminder.postRenderSetup();
            });

            var newReminder = new plsRemindMe.NewReminderViewModel(this.CurrentUser());
            newReminder.Modal = dialog;
            var dom = dialog[0];

            ko.applyBindingsWithValidation(newReminder, dom, plsRemindMe.Helpers.ValidationConfiguration);
            dialog.modal('show');
        };

        UpcomingRemindersViewModel.prototype.afterRender = function (element, viewModel) {
            if ($(element).length > 1) {
                viewModel.setupPaging(1, viewModel.Reminders().length);
            }
        };

        UpcomingRemindersViewModel.prototype.setupPaging = function (currentPage, totalRecordsToPage) {
            var self = this;
            var totalPages = Math.floor((totalRecordsToPage / this.pageSize) + 1);

            if (totalPages > 1) {
                var options = {
                    currentPage: 1,
                    totalPages: totalPages,
                    useBootstrapTooltip: true,
                    onPageClicked: function (e, event, type, page) {
                        self.onPageClicked(e, event, type, page);
                    }
                };

                $("#prm-remindersPaginator").show();
                $("#prm-remindersPaginator").bootstrapPaginator(options);
            } else {
                $("#prm-remindersPaginator").hide();
            }
        };

        UpcomingRemindersViewModel.prototype.onPageClicked = function (e, event, type, page) {
            var self = this;

            self.activePage = page;
            var navFilterType = self.SelectedNavFilter() ? self.SelectedNavFilter().StatType() : 1;
            var rangeFilterType = self.SelectedRangeFilter() ? self.SelectedRangeFilter().StatType() : 1;

            self.filter(navFilterType, rangeFilterType, page, false);
        };

        UpcomingRemindersViewModel.prototype.selectNavFilter = function (filter) {
            var self = this;
            _.each(self.NavigationStats(), function (item) {
                item.Selected(item == filter);
            });

            self.SelectedNavFilter(filter);

            self.filter(self.SelectedNavFilter().StatType(), self.SelectedRangeFilter().StatType(), 1, true);
        };

        UpcomingRemindersViewModel.prototype.selectRangeFilter = function (filter) {
            var self = this;
            _.each(self.FilterStats(), function (item) {
                item.Selected(item == filter);
            });

            self.SelectedRangeFilter(filter);
            self.filter(self.SelectedNavFilter().StatType(), self.SelectedRangeFilter().StatType(), 1, true);
        };

        UpcomingRemindersViewModel.prototype.showDatePicker = function (reminder, event) {
            var self = this;

            var helper = new plsRemindMe.Helpers.jQuery();
            var html = helper.getScriptContents("reminderDateHtml");

            $(event.target).popover({
                html: true,
                placement: 'right',
                title: 'Change Date',
                content: html
            }).click(function (event) {
                event.stopPropagation();
                $(event.target).popover('show');
            });

            $('html').click(function () {
                $(event.target).popover('hide');
            });
        };

        UpcomingRemindersViewModel.prototype.updateStatusStats = function (reminder, beingAdded) {
            if (typeof beingAdded === "undefined") { beingAdded = true; }
            var hasScheduled, hasOverdue = false;

            if (reminder.ForcastTypes().indexOf(plsRemindMe.ForcastingType.Scheduled) >= 0) {
                hasScheduled = true;
            } else if (reminder.ForcastTypes().indexOf(plsRemindMe.ForcastingType.Overdue) >= 0) {
                hasOverdue = true;
            }

            _.each(this.NavigationStats(), function (stat) {
                switch (stat.StatType()) {
                    case plsRemindMe.ForcastingType.All:
                        if (beingAdded) {
                            stat.Count(stat.Count() + 1);
                        } else {
                            stat.Count(stat.Count() - 1);
                        }
                        break;
                    case plsRemindMe.ForcastingType.Scheduled:
                        if (hasScheduled) {
                            if (beingAdded) {
                                stat.Count(stat.Count() + 1);
                            } else {
                                stat.Count(stat.Count() - 1);
                            }
                        }
                        break;
                    case plsRemindMe.ForcastingType.Overdue:
                        if (hasOverdue) {
                            if (beingAdded) {
                                stat.Count(stat.Count() + 1);
                            } else {
                                stat.Count(stat.Count() - 1);
                            }
                        }
                        break;
                }
            });
        };
        return UpcomingRemindersViewModel;
    })();
    plsRemindMe.UpcomingRemindersViewModel = UpcomingRemindersViewModel;
})(plsRemindMe || (plsRemindMe = {}));
