/// <reference path="../Models/CurrentUserModel.ts" />
/// <reference path="NewReminderViewModel.ts" />
/// <reference path="../MessageTypes.ts" />
/// <reference path="../Models/ModelReferences.ts" />

/// <reference path="_baseViewModel.ts" />

/// <reference path="../../Scripts/typings/References.ts" />
/// <reference path="../Enums.ts" />
/// <reference path="../Helpers.ts" />
/// <reference path="../Routes.ts" />

module plsRemindMe {
    export class UpcomingRemindersViewModel {
        public CurrentUser: KnockoutObservable<Models.CurrentUserModel> = ko.observable(undefined);

        public Stats: KnockoutObservableArray<Models.UpcomingReminderStatModel> = ko.observableArray([]);
        public NavigationStats: KnockoutObservableArray<Models.UpcomingReminderStatModel> = ko.observableArray([]);
        public FilterStats: KnockoutObservableArray<Models.UpcomingReminderStatModel> = ko.observableArray([]);

        public Reminders: KnockoutObservableArray<Models.UpcomingReminderModel> = ko.observableArray([]);
        public RemindersUnFiltered: KnockoutObservableArray<Models.UpcomingReminderModel> = ko.observableArray([]);
        
        public SelectedNavFilter: KnockoutObservable<Models.UpcomingReminderStatModel> = ko.observable();
        public SelectedRangeFilter: KnockoutObservable<Models.UpcomingReminderStatModel> = ko.observable();
        public ReminderAddedPublisher: KnockoutObservable<Models.UpcomingReminderModel> = ko.observable().publishOn(plsRemindMe.MessageTypes.NewReminderAdded);
        public DataLoadStatus: KnockoutObservable<DataLoadStatuses> = ko.observable(DataLoadStatuses.Initial);

        private pageSize = 8;
        private activePage = 1;        

        constructor(currentUser: Models.CurrentUserModel) {  
            this.CurrentUser(currentUser);
        }

        public deleteReminder(reminder: Models.UpcomingReminderModel) {
            var self = this;
            var elementKey = "[data-key='" + reminder.Id() + "']";
            $(elementKey).hide({
                effect: 'highlight',
                complete: () => {
                    var route = Routes.DeleteReminder + '/' + reminder.Id();
                    $.ajax({
                        url: route,
                        type: 'DELETE'
                        })
                        .done(results => { })
                        .always();

                    self.updateStatusStats(reminder, false);
                    self.Reminders.remove(reminder);
                    self.RemindersUnFiltered.remove(reminder);
                }
            })
            
        }

        public determinePriorityIndicator(reminder: Models.UpcomingReminderModel) {
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
        }

        public editReminder(reminder: Models.UpcomingReminderModel) {
            var self = this;
        }

        public fetchReminders() {
            var self = this;
            var route = Routes.UpcomingReminders + '/' + self.CurrentUser().Id();
            self.DataLoadStatus(DataLoadStatuses.Fetching);
            $.get(route)
                .done((results) => {

                    var convertedResults = [];
                    _.each(results, (result) => {
                        var mappedReminder = ko.mapping.fromJS(result, {}, new Models.UpcomingReminderModel());
                        convertedResults.push(mappedReminder);
                    });

                    self.RemindersUnFiltered(convertedResults);
                    self.DataLoadStatus(convertedResults.length === 0 ? DataLoadStatuses.NoResults : DataLoadStatuses.FoundResults);

                    if (convertedResults.length > 0) {
                        self.filter(1, 1, 1, true);
                    }

                    // we want to turn this on in order to show the assocated persons name
                    $("[data-toggle='tooltip']").tooltip();

                })
                .fail();

        }

        public fetchStats() {
            var self = this;
            var route = Routes.ReminderStats + '/' + self.CurrentUser().Id();
            $.get(route)    
                .done((results) => {

                    var convertedResults = [];
                    _.each(results, (result) => {
                        var converted = ko.mapping.fromJS(result, {}, new Models.UpcomingReminderStatModel());
                        convertedResults.push(converted);

                        if (converted.StatType() == plsRemindMe.ForcastingType.All) {
                            var navStat = converted;
                            var rangeStat = ko.mapping.fromJS(result, {}, new Models.UpcomingReminderStatModel());
                            navStat.Selected(true);
                            rangeStat.Selected(true);
                            self.NavigationStats.push(navStat);
                            self.FilterStats.push(rangeStat);
                            self.SelectedNavFilter(navStat);
                            self.SelectedRangeFilter(rangeStat)
                        }
                        else if (converted.StatType() == plsRemindMe.ForcastingType.Overdue || converted.StatType() == plsRemindMe.ForcastingType.Scheduled) {
                            self.NavigationStats.push(converted);                           
                        }
                        else {
                            self.FilterStats.push(converted);
                        }
                    });

                    self.Stats(convertedResults);
                })
                .fail();
        }

        public filter(statusFilterKey: number, rangeFilterKey: number, currentPage: number = 1, setupPaging: boolean = false) {
            var self = this;
            self.DataLoadStatus(DataLoadStatuses.Fetching);

            var filtered = _.filter(self.RemindersUnFiltered(), (item: Models.UpcomingReminderModel) => {
                var forcastMatch = _.any(item.ForcastTypes(), (type: number) => {
                    var typeMatch = type == statusFilterKey;
                    return typeMatch;
                });

                return forcastMatch;
            });

            filtered = _.filter(filtered, (item: Models.UpcomingReminderModel) => {
                var forcastMatch = _.any(item.ForcastTypes(), (type: number) => {
                    var typeMatch = type == rangeFilterKey;
                    return typeMatch;
                });

                return forcastMatch;
            });
                
            filtered =  _.sortBy(filtered, (item: Models.UpcomingReminderModel) => {
                return item.Date();
            });

            var start = currentPage == 1 ? 0 : ((currentPage - 1) * self.pageSize);
            var end = (start + self.pageSize <= filtered.length) ? self.pageSize : undefined;
            var paged = filtered.slice(start, end);

            self.Reminders([]);
            self.Reminders(paged);

            self.DataLoadStatus(paged.length > 0 ? DataLoadStatuses.FoundResults : DataLoadStatuses.NoFilterResults);

            if (setupPaging) {
                self.setupPaging(1, filtered.length)
            }            
        }

        public newReminder() {
            var self = this;
            
            var helper = new plsRemindMe.Helpers.jQuery();
            var dialog = helper.getScriptContents("reminderDialogHtml");
                    
            dialog.on('hidden', () => {
                dialog.off('shown');

                if (newReminder.IsSaved()) {

                    _.each(newReminder.CreatedReminders(), (reminder: Models.UpcomingReminderModel) => {
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

            dialog.on('shown', () => {
                newReminder.postRenderSetup();
            });

            var newReminder = new plsRemindMe.NewReminderViewModel(this.CurrentUser());
            newReminder.Modal = dialog;
            var dom = dialog[0];
        
            ko.applyBindingsWithValidation(newReminder, dom, plsRemindMe.Helpers.ValidationConfiguration);
            dialog.modal('show');
        }

        public afterRender(element, viewModel) {
            if ($(element).length > 1) {
                viewModel.setupPaging(1, viewModel.Reminders().length);
            }        
        }

        private setupPaging(currentPage, totalRecordsToPage) {
            var self = this;
            var totalPages = Math.floor( (totalRecordsToPage / this.pageSize) + 1);
            
            if (totalPages > 1) {
                var options = {
                    currentPage: 1,
                    totalPages: totalPages,
                    useBootstrapTooltip: true,
                    onPageClicked: (e, event, type, page) => { self.onPageClicked(e, event, type, page); }
                };

                $("#prm-remindersPaginator").show();
                $("#prm-remindersPaginator").bootstrapPaginator(options); 
            }
            else {
                $("#prm-remindersPaginator").hide();
            }
        
        }

        private onPageClicked(e, event, type, page) {
            var self = this;

            self.activePage = page;            
            var navFilterType = self.SelectedNavFilter() ? self.SelectedNavFilter().StatType() : 1;
            var rangeFilterType = self.SelectedRangeFilter() ? self.SelectedRangeFilter().StatType() : 1;
            
            self.filter(navFilterType, rangeFilterType, page, false);

        }

        public selectNavFilter(filter: Models.UpcomingReminderStatModel) {
            var self = this;
            _.each(self.NavigationStats(), (item: Models.UpcomingReminderStatModel) => {
                item.Selected(item == filter);
            });

            self.SelectedNavFilter(filter);

            self.filter(self.SelectedNavFilter().StatType(), self.SelectedRangeFilter().StatType(), 1, true);
        }
        
        public selectRangeFilter(filter: Models.UpcomingReminderStatModel) {
            var self = this;
            _.each(self.FilterStats(), (item: Models.UpcomingReminderStatModel) => {
                item.Selected(item == filter);
            });

            self.SelectedRangeFilter(filter);
            self.filter(self.SelectedNavFilter().StatType(), self.SelectedRangeFilter().StatType(), 1, true);
        }

        public showDatePicker(reminder: Models.UpcomingReminderModel, event: any) {
            var self = this;

            var helper = new plsRemindMe.Helpers.jQuery();
            var html = helper.getScriptContents("reminderDateHtml");

            $(event.target).popover({
                html: true,
                placement: 'right',
                title: 'Change Date',
                content: html
            }).click((event) => {
                event.stopPropagation();
                $(event.target).popover('show');
            });

            $('html').click(() => {
                $(event.target).popover('hide');
            });
        }

        private updateStatusStats(reminder: Models.UpcomingReminderModel, beingAdded: boolean = true) {

            var hasScheduled: boolean, hasOverdue: boolean = false;

            if (reminder.ForcastTypes().indexOf(plsRemindMe.ForcastingType.Scheduled) >= 0) {
                hasScheduled = true;
            }
            else if (reminder.ForcastTypes().indexOf(plsRemindMe.ForcastingType.Overdue) >= 0) {
                hasOverdue = true;
            }

            _.each(this.NavigationStats(), (stat: Models.UpcomingReminderStatModel) => {
                switch (stat.StatType()) {
                    case plsRemindMe.ForcastingType.All:
                        if (beingAdded) {
                            stat.Count(stat.Count() + 1);
                        }
                        else {
                            stat.Count(stat.Count() - 1);
                        }                        
                        break;
                    case plsRemindMe.ForcastingType.Scheduled:
                        if (hasScheduled) {
                            if (beingAdded) {
                                stat.Count(stat.Count() + 1);
                            }
                            else {
                                stat.Count(stat.Count() - 1);
                            }     
                        }
                        break;
                    case plsRemindMe.ForcastingType.Overdue:
                        if (hasOverdue) {
                            if (beingAdded) {
                                stat.Count(stat.Count() + 1);
                            }
                            else {
                                stat.Count(stat.Count() - 1);
                            }     
                        }
                        break;
                }
            });
            
        }
    }
}