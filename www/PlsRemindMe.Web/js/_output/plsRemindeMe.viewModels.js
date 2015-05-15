var plsRemindMe;
(function (plsRemindMe) {
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
var plsRemindMe;
(function (plsRemindMe) {
    (function (Templates) {
        Templates.UpcomingReminders = "reminders.upcoming";
        Templates.ReminderStats = "reminders.stats";
        Templates.Reminders = "reminders.main";
    })(plsRemindMe.Templates || (plsRemindMe.Templates = {}));
    var Templates = plsRemindMe.Templates;
})(plsRemindMe || (plsRemindMe = {}));
var plsRemindMe;
(function (plsRemindMe) {
    (function (DataLoadStatuses) {
        DataLoadStatuses[DataLoadStatuses["Initial"] = 1] = "Initial";
        DataLoadStatuses[DataLoadStatuses["Fetching"] = 2] = "Fetching";
        DataLoadStatuses[DataLoadStatuses["NoResults"] = 3] = "NoResults";
        DataLoadStatuses[DataLoadStatuses["NoFilterResults"] = 4] = "NoFilterResults";
        DataLoadStatuses[DataLoadStatuses["FoundResults"] = 5] = "FoundResults";
    })(plsRemindMe.DataLoadStatuses || (plsRemindMe.DataLoadStatuses = {}));
    var DataLoadStatuses = plsRemindMe.DataLoadStatuses;

    (function (ReminderStatuses) {
        ReminderStatuses[ReminderStatuses["Pending"] = 1] = "Pending";
        ReminderStatuses[ReminderStatuses["Overdue"] = 2] = "Overdue";
    })(plsRemindMe.ReminderStatuses || (plsRemindMe.ReminderStatuses = {}));
    var ReminderStatuses = plsRemindMe.ReminderStatuses;

    (function (FrequencyTypes) {
        FrequencyTypes[FrequencyTypes["Once"] = 1] = "Once";
        FrequencyTypes[FrequencyTypes["Weekly"] = 2] = "Weekly";
        FrequencyTypes[FrequencyTypes["BiWeekly"] = 3] = "BiWeekly";
        FrequencyTypes[FrequencyTypes["Monthly"] = 4] = "Monthly";
        FrequencyTypes[FrequencyTypes["BiMonthly"] = 5] = "BiMonthly";
        FrequencyTypes[FrequencyTypes["Quarterly"] = 6] = "Quarterly";
        FrequencyTypes[FrequencyTypes["SemiAnnually"] = 7] = "SemiAnnually";
        FrequencyTypes[FrequencyTypes["Yearly"] = 8] = "Yearly";
    })(plsRemindMe.FrequencyTypes || (plsRemindMe.FrequencyTypes = {}));
    var FrequencyTypes = plsRemindMe.FrequencyTypes;

    (function (ReminderPriorityTypes) {
        ReminderPriorityTypes[ReminderPriorityTypes["Normal"] = 1] = "Normal";
        ReminderPriorityTypes[ReminderPriorityTypes["High"] = 2] = "High";
        ReminderPriorityTypes[ReminderPriorityTypes["Urgent"] = 3] = "Urgent";
        ReminderPriorityTypes[ReminderPriorityTypes["HairsOnFire"] = 4] = "HairsOnFire";
    })(plsRemindMe.ReminderPriorityTypes || (plsRemindMe.ReminderPriorityTypes = {}));
    var ReminderPriorityTypes = plsRemindMe.ReminderPriorityTypes;

    (function (ForcastingType) {
        ForcastingType[ForcastingType["All"] = 1] = "All";
        ForcastingType[ForcastingType["Today"] = 2] = "Today";
        ForcastingType[ForcastingType["Tomorrow"] = 3] = "Tomorrow";
        ForcastingType[ForcastingType["ThisWeek"] = 4] = "ThisWeek";
        ForcastingType[ForcastingType["NextWeek"] = 5] = "NextWeek";
        ForcastingType[ForcastingType["ThisMonth"] = 6] = "ThisMonth";
        ForcastingType[ForcastingType["NextMonth"] = 7] = "NextMonth";
        ForcastingType[ForcastingType["Overdue"] = 98] = "Overdue";
        ForcastingType[ForcastingType["Scheduled"] = 99] = "Scheduled";
    })(plsRemindMe.ForcastingType || (plsRemindMe.ForcastingType = {}));
    var ForcastingType = plsRemindMe.ForcastingType;
})(plsRemindMe || (plsRemindMe = {}));
var plsRemindMe;
(function (plsRemindMe) {
    (function (Helpers) {
        Helpers.ValidationConfiguration = {
            registerExtenders: true,
            messagesOnModified: true,
            insertMessages: false,
            parseInputAttributes: true,
            messageTemplate: null,
            decorateElement: true,
            errorElementClass: "prm-inline-field-validation-error"
        };

        Helpers.FrequencyNameBuilder = function (frequency) {
            switch (frequency) {
                case 1 /* Once */:
                    return "Just Once";

                case 2 /* Weekly */:
                    return "Every Week";

                case 3 /* BiWeekly */:
                    return "Every 2 Weeks";

                case 4 /* Monthly */:
                    return "Every Month";

                case 6 /* Quarterly */:
                    return "Every 3 Months";

                case 8 /* Yearly */:
                    return "Once a Year";
            }

            return "";
        };

        Helpers.StatusNameBuilder = function (staus) {
            switch (staus) {
                case 1 /* Pending */:
                    return "Scheduled";

                case 2 /* Overdue */:
                    return "Overdue";
            }

            return "";
        };

        var jQuery = (function () {
            function jQuery() {
            }
            jQuery.prototype.getScriptContents = function (id) {
                var script = $("#" + id);

                if (script.html() === undefined) {
                    throw "Id of " + id + " was not found";
                }

                var contents = $($.parseHTML(script.html())[1]);

                return contents;
            };
            return jQuery;
        })();
        Helpers.jQuery = jQuery;
    })(plsRemindMe.Helpers || (plsRemindMe.Helpers = {}));
    var Helpers = plsRemindMe.Helpers;
})(plsRemindMe || (plsRemindMe = {}));
var plsRemindMe;
(function (plsRemindMe) {
    (function (Models) {
        var UpcomingReminderModel = (function () {
            function UpcomingReminderModel() {
                var _this = this;
                this.Id = ko.observable(0);
                this.Title = ko.observable("");
                this.Description = ko.observable("");
                this.Date = ko.observable(undefined);
                this.Time = ko.observable(undefined);
                this.AllDay = ko.observable(false);
                this.Frequency = ko.observable(1 /* Once */);
                this.Occurrences = ko.observable(1);
                this.Priority = ko.observable(1 /* Normal */);
                this.NotifyByEmail = ko.observable(false);
                this.NotifyBySms = ko.observable(false);
                this.NotifyByCall = ko.observable(false);
                this.Status = ko.observable(0);
                this.ForcastTypes = ko.observableArray([]);
                this.OthersToRemind = ko.observableArray([]);
                this.FrequencyName = ko.computed(function () {
                    return plsRemindMe.Helpers.FrequencyNameBuilder(_this.Frequency());
                });

                this.StatusName = ko.computed(function () {
                    return plsRemindMe.Helpers.StatusNameBuilder(_this.Status());
                });
            }
            return UpcomingReminderModel;
        })();
        Models.UpcomingReminderModel = UpcomingReminderModel;

        var GuestToRemindModel = (function () {
            function GuestToRemindModel() {
                this.Id = ko.observable(0);
                this.FirstName = ko.observable("");
                this.LastName = ko.observable("");
                this.EmailAddress = ko.observable("");
                this.DisplayName = ko.observable("");
            }
            return GuestToRemindModel;
        })();
        Models.GuestToRemindModel = GuestToRemindModel;
    })(plsRemindMe.Models || (plsRemindMe.Models = {}));
    var Models = plsRemindMe.Models;
})(plsRemindMe || (plsRemindMe = {}));
var plsRemindMe;
(function (plsRemindMe) {
    (function (Models) {
        var UpcomingReminderStatModel = (function () {
            function UpcomingReminderStatModel(name, count, statType, selected) {
                if (typeof name === "undefined") { name = ""; }
                if (typeof count === "undefined") { count = 0; }
                if (typeof statType === "undefined") { statType = 0; }
                if (typeof selected === "undefined") { selected = false; }
                this.Name = ko.observable("");
                this.Count = ko.observable(0);
                this.StatType = ko.observable(0);
                this.Selected = ko.observable(false);
                this.Name(name);
                this.Count(count);
                this.StatType(statType);
                this.Selected(selected);
            }
            return UpcomingReminderStatModel;
        })();
        Models.UpcomingReminderStatModel = UpcomingReminderStatModel;
    })(plsRemindMe.Models || (plsRemindMe.Models = {}));
    var Models = plsRemindMe.Models;
})(plsRemindMe || (plsRemindMe = {}));
var plsRemindMe;
(function (plsRemindMe) {
    (function (Models) {
        var ReminderPriorityModel = (function () {
            function ReminderPriorityModel(id, name, selected) {
                if (typeof selected === "undefined") { selected = false; }
                this.Name = ko.observable("");
                this.Id = ko.observable(0);
                this.Selected = ko.observable(false);
                this.Id(id);
                this.Name(name);
                this.Selected(selected);
            }
            return ReminderPriorityModel;
        })();
        Models.ReminderPriorityModel = ReminderPriorityModel;
    })(plsRemindMe.Models || (plsRemindMe.Models = {}));
    var Models = plsRemindMe.Models;
})(plsRemindMe || (plsRemindMe = {}));
var plsRemindMe;
(function (plsRemindMe) {
    (function (Models) {
        var ReminderFrequencyModel = (function () {
            function ReminderFrequencyModel(id, name, selected) {
                if (typeof selected === "undefined") { selected = false; }
                this.Name = ko.observable("");
                this.Id = ko.observable(0);
                this.Selected = ko.observable(false);
                this.Id(id);
                this.Name(name);
                this.Selected(selected);
            }
            return ReminderFrequencyModel;
        })();
        Models.ReminderFrequencyModel = ReminderFrequencyModel;
    })(plsRemindMe.Models || (plsRemindMe.Models = {}));
    var Models = plsRemindMe.Models;
})(plsRemindMe || (plsRemindMe = {}));
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
var plsRemindMe;
(function (plsRemindMe) {
    (function (Routes) {
        Routes.UpcomingReminders = "api/Reminders/Upcoming";
        Routes.ReminderStats = "api/Reminders/Stats";
        Routes.CreateReminder = "api/Reminders/Create";
        Routes.DeleteReminder = "api/Reminders/Delete";

        Routes.ReminderConnections = "api/Connections/ReminderConnections";
    })(plsRemindMe.Routes || (plsRemindMe.Routes = {}));
    var Routes = plsRemindMe.Routes;
})(plsRemindMe || (plsRemindMe = {}));
var plsRemindMe;
(function (plsRemindMe) {
    (function (MessageTypes) {
        MessageTypes.SelectedReminderStateChanged = "SelectedReminderStateChanged";
        MessageTypes.NewReminderAdded = "NewReminderAdded";
    })(plsRemindMe.MessageTypes || (plsRemindMe.MessageTypes = {}));
    var MessageTypes = plsRemindMe.MessageTypes;
})(plsRemindMe || (plsRemindMe = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var plsRemindMe;
(function (plsRemindMe) {
    var NewReminderViewModel = (function (_super) {
        __extends(NewReminderViewModel, _super);
        function NewReminderViewModel(currentUser) {
            var _this = this;
            _super.call(this, currentUser);
            this.Reminder = ko.observable(new plsRemindMe.Models.UpcomingReminderModel());
            this.CreatedReminders = ko.observableArray([]);
            this.ReminderFrequencies = ko.observableArray([]);
            this.ReminderPriorities = ko.observableArray([]);
            this.ReminderGuests = ko.observableArray([]);
            this.tempEmailAddress = ko.observable("");
            this.Modal = undefined;
            this.IsSaved = ko.observable(false);

            this.AllDayChecked = ko.computed(function () {
                if (_this.Reminder().AllDay()) {
                    _this.Reminder().Time("");
                }
            });

            this.TimeChanged = ko.computed(function () {
                if (_this.Reminder().Time() !== "") {
                    _this.Reminder().AllDay(false);
                }
            });

            this.ShowOccurrences = ko.computed(function () {
                return _this.Reminder().Frequency() != 1 /* Once */;
            });

            this.setupFrequencies();
            this.setupPriorities();
            this.setupValidation();
            this.fetchConnections();
        }
        NewReminderViewModel.prototype.fetchConnections = function () {
            var self = this;
            var route = plsRemindMe.Routes.ReminderConnections + '/e0aed236-3177-4ff7-9a39-25bb16c8ed62';
            $.get(route).done(function (results) {
                var convertedResults = [];
                _.each(results, function (result) {
                    convertedResults.push(ko.mapping.fromJS(result, {}, new plsRemindMe.Models.GuestToRemindModel));
                });

                self.ReminderGuests(convertedResults);
                console.log("Connections");
            }).fail();
        };

        NewReminderViewModel.prototype.postRenderSetup = function () {
            var self = this;
            console.log("Post Render");
            var othersToRemindSource = _.map(self.ReminderGuests(), function (otherToRemind) {
                return otherToRemind.EmailAddress();
            });

            $('#remindOthersInput').typeahead({
                source: othersToRemindSource,
                updater: function (item) {
                    console.log(item);
                    var match = _.find(self.ReminderGuests(), function (guest) {
                        return guest.EmailAddress() == item;
                    });

                    self.Reminder().OthersToRemind.push(match);
                    self.tempEmailAddress("");
                }
            });

            var picker = $('.dueDatePicker');
            picker.datepicker({
                autoclose: true
            });

            var timePIcker = $('.dueTimePicker');
            timePIcker.timepicker();
        };

        NewReminderViewModel.prototype.addOtherReminder = function (emailAddress) {
            var self = this;

            var guestToRemind = new plsRemindMe.Models.GuestToRemindModel();
            guestToRemind.EmailAddress(emailAddress());

            self.Reminder().OthersToRemind.push(guestToRemind);
            self.tempEmailAddress("");
        };

        NewReminderViewModel.prototype.removeOtherReminder = function (guestToRemind) {
            var self = this;

            self.Reminder().OthersToRemind.remove(guestToRemind);
        };

        NewReminderViewModel.prototype.saveReminder = function () {
            var _this = this;
            var self = this;
            if (!this.Reminder().isValid()) {
                this.ErrorMessage("Please provide all required pieces of information.");
                $('#newReminderErrorAlert').show();
                return;
            }

            if (moment(this.Reminder().Date()).isBefore(moment().startOf('day'))) {
                this.ErrorMessage("The reminder date cannot be in the past.");
                $('#newReminderErrorAlert').show();
                return;
            }

            var model = ko.mapping.toJS(this.Reminder);
            var route = plsRemindMe.Routes.CreateReminder;
            this.IsSaved(true);

            $.post(route, model).done(function (results) {
                _.each(results, function (newReminder) {
                    var converted = ko.mapping.fromJS(newReminder, {}, new plsRemindMe.Models.UpcomingReminderModel());

                    converted.isValid = function () {
                        return true;
                    };

                    self.CreatedReminders.push(converted);
                });

                _this.Modal.modal('hide');
            }).fail(function (reason) {
                self.ErrorMessage(reason.message);
            }).always(function (result) {
            });
        };

        NewReminderViewModel.prototype.selectFrequency = function (frequency) {
            var self = this;
            _.each(self.ReminderFrequencies(), function (item) {
                if (item.Selected()) {
                    item.Selected(false);
                }
            });

            frequency.Selected(true);
            self.Reminder().Frequency(frequency.Id());
        };

        NewReminderViewModel.prototype.selectPriority = function (priority) {
            var self = this;
            _.each(self.ReminderPriorities(), function (item) {
                if (item.Selected()) {
                    item.Selected(false);
                }
            });

            priority.Selected(true);
            self.Reminder().Priority(priority.Id());
        };

        NewReminderViewModel.prototype.setupValidation = function () {
            var self = this;
            self.Reminder().Title.extend({
                required: true
            });

            self.Reminder().Date.extend({
                required: true,
                date: true
            });

            self.Reminder().Time.extend({
                required: {
                    onlyIf: function () {
                        return self.Reminder().AllDay() === false && self.Reminder().Time() === "";
                    }
                }
            });

            self.Reminder().Frequency.extend({
                required: true
            });

            self.Reminder().Occurrences.extend({
                validation: {
                    validator: function (value, seed) {
                        if (!seed) {
                            return true;
                        }

                        if (self.Reminder().Frequency() != 1 /* Once */) {
                            return value > 0;
                        }

                        return true;
                    },
                    message: "Must provide Occurrences",
                    params: true
                }
            });

            ko.validation.group(self.Reminder()).showAllMessages();
        };

        NewReminderViewModel.prototype.setupPriorities = function () {
            this.ReminderPriorities.push(new plsRemindMe.Models.ReminderPriorityModel(1 /* Normal */, "Normal", true));
            this.ReminderPriorities.push(new plsRemindMe.Models.ReminderPriorityModel(2 /* High */, "High"));
            this.ReminderPriorities.push(new plsRemindMe.Models.ReminderPriorityModel(3 /* Urgent */, "Urgent"));
            this.ReminderPriorities.push(new plsRemindMe.Models.ReminderPriorityModel(4 /* HairsOnFire */, "On Fire"));
        };

        NewReminderViewModel.prototype.setupFrequencies = function () {
            this.ReminderFrequencies.push(new plsRemindMe.Models.ReminderFrequencyModel(1 /* Once */, "Once", true));
            this.ReminderFrequencies.push(new plsRemindMe.Models.ReminderFrequencyModel(2 /* Weekly */, "Weekly"));
            this.ReminderFrequencies.push(new plsRemindMe.Models.ReminderFrequencyModel(3 /* BiWeekly */, "Bi-Weekly"));
            this.ReminderFrequencies.push(new plsRemindMe.Models.ReminderFrequencyModel(4 /* Monthly */, "Montly"));

            this.ReminderFrequencies.push(new plsRemindMe.Models.ReminderFrequencyModel(6 /* Quarterly */, "Quarterly"));

            this.ReminderFrequencies.push(new plsRemindMe.Models.ReminderFrequencyModel(8 /* Yearly */, "Yearly"));
        };
        return NewReminderViewModel;
    })(plsRemindMe._baseViewModel);
    plsRemindMe.NewReminderViewModel = NewReminderViewModel;
})(plsRemindMe || (plsRemindMe = {}));
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
            this.DataLoadStatus = ko.observable(1 /* Initial */);
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
                case 1 /* Normal */:
                    return "prm-normal-priority-indicator";
                case 2 /* High */:
                    return "prm-high-priority-indicator";
                case 3 /* Urgent */:
                    return "prm-urgent-priority-indicator";
                case 4 /* HairsOnFire */:
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
            self.DataLoadStatus(2 /* Fetching */);
            $.get(route).done(function (results) {
                var convertedResults = [];
                _.each(results, function (result) {
                    var mappedReminder = ko.mapping.fromJS(result, {}, new plsRemindMe.Models.UpcomingReminderModel());
                    convertedResults.push(mappedReminder);
                });

                self.RemindersUnFiltered(convertedResults);
                self.DataLoadStatus(convertedResults.length === 0 ? 3 /* NoResults */ : 5 /* FoundResults */);

                if (convertedResults.length > 0) {
                    self.filter(1, 1, 1, true);
                }

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

                    if (converted.StatType() == 1 /* All */) {
                        var navStat = converted;
                        var rangeStat = ko.mapping.fromJS(result, {}, new plsRemindMe.Models.UpcomingReminderStatModel());
                        navStat.Selected(true);
                        rangeStat.Selected(true);
                        self.NavigationStats.push(navStat);
                        self.FilterStats.push(rangeStat);
                        self.SelectedNavFilter(navStat);
                        self.SelectedRangeFilter(rangeStat);
                    } else if (converted.StatType() == 98 /* Overdue */ || converted.StatType() == 99 /* Scheduled */) {
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
            self.DataLoadStatus(2 /* Fetching */);

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

            self.DataLoadStatus(paged.length > 0 ? 5 /* FoundResults */ : 4 /* NoFilterResults */);

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

            if (reminder.ForcastTypes().indexOf(99 /* Scheduled */) >= 0) {
                hasScheduled = true;
            } else if (reminder.ForcastTypes().indexOf(98 /* Overdue */) >= 0) {
                hasOverdue = true;
            }

            _.each(this.NavigationStats(), function (stat) {
                switch (stat.StatType()) {
                    case 1 /* All */:
                        if (beingAdded) {
                            stat.Count(stat.Count() + 1);
                        } else {
                            stat.Count(stat.Count() - 1);
                        }
                        break;
                    case 99 /* Scheduled */:
                        if (hasScheduled) {
                            if (beingAdded) {
                                stat.Count(stat.Count() + 1);
                            } else {
                                stat.Count(stat.Count() - 1);
                            }
                        }
                        break;
                    case 98 /* Overdue */:
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
var plsRemindMe;
(function (plsRemindMe) {
    var RemindersViewModel = (function () {
        function RemindersViewModel(currentUser) {
            this.CurrentUser = ko.observable(undefined);
            this.ReminderStats = new plsRemindMe.UpcomingReminderStatsViewModel();
            this.PrimaryViewTemplate = ko.observable();
            this.SecondaryViewTemplate = ko.observable();
            this.CurrentUser(currentUser);
            this.UpcomingReminders = new plsRemindMe.UpcomingRemindersViewModel(currentUser);

            this.PrimaryViewTemplate(new ViewTemplate(plsRemindMe.Templates.UpcomingReminders, this.UpcomingReminders));
            this.SecondaryViewTemplate(new ViewTemplate(plsRemindMe.Templates.ReminderStats, this.ReminderStats));

            this.UpcomingReminders.fetchReminders();
            this.UpcomingReminders.fetchStats();
        }
        return RemindersViewModel;
    })();
    plsRemindMe.RemindersViewModel = RemindersViewModel;

    var ViewTemplate = (function () {
        function ViewTemplate(template, viewModel) {
            this.Template = ko.observable();
            this.ViewModel = ko.observable();
            this.Template(template);
            this.ViewModel(viewModel);
        }
        return ViewTemplate;
    })();
    plsRemindMe.ViewTemplate = ViewTemplate;
})(plsRemindMe || (plsRemindMe = {}));
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
