/// <reference path="../Models/UpcomingReminderModel.ts" />
/// <reference path="../Models/ModelReferences.ts" />
/// <reference path="_baseViewModel.ts" />
/// <reference path="../../Scripts/typings/References.ts" />
/// <reference path="../Enums.ts" />
/// <reference path="../Helpers.ts" />
/// <reference path="../Routes.ts" />
/// <reference path="../MessageTypes.ts" />
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
                return _this.Reminder().Frequency() != plsRemindMe.FrequencyTypes.Once;
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
                    convertedResults.push(ko.mapping.fromJS(result, {}, new plsRemindMe.Models.GuestToRemindModel()));
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
            if (!(this.Reminder()).isValid()) {
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

                    // makes the bindings happy
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

                        if (self.Reminder().Frequency() != plsRemindMe.FrequencyTypes.Once) {
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
            this.ReminderPriorities.push(new plsRemindMe.Models.ReminderPriorityModel(plsRemindMe.ReminderPriorityTypes.Normal, "Normal", true));
            this.ReminderPriorities.push(new plsRemindMe.Models.ReminderPriorityModel(plsRemindMe.ReminderPriorityTypes.High, "High"));
            this.ReminderPriorities.push(new plsRemindMe.Models.ReminderPriorityModel(plsRemindMe.ReminderPriorityTypes.Urgent, "Urgent"));
            this.ReminderPriorities.push(new plsRemindMe.Models.ReminderPriorityModel(plsRemindMe.ReminderPriorityTypes.HairsOnFire, "On Fire"));
        };

        NewReminderViewModel.prototype.setupFrequencies = function () {
            this.ReminderFrequencies.push(new plsRemindMe.Models.ReminderFrequencyModel(plsRemindMe.FrequencyTypes.Once, "Once", true));
            this.ReminderFrequencies.push(new plsRemindMe.Models.ReminderFrequencyModel(plsRemindMe.FrequencyTypes.Weekly, "Weekly"));
            this.ReminderFrequencies.push(new plsRemindMe.Models.ReminderFrequencyModel(plsRemindMe.FrequencyTypes.BiWeekly, "Bi-Weekly"));
            this.ReminderFrequencies.push(new plsRemindMe.Models.ReminderFrequencyModel(plsRemindMe.FrequencyTypes.Monthly, "Montly"));

            //this.ReminderFrequencies.push(new Models.ReminderFrequencyModel(plsRemindMe.FrequencyTypes.BiMonthly, "Bi-Monthly"));
            this.ReminderFrequencies.push(new plsRemindMe.Models.ReminderFrequencyModel(plsRemindMe.FrequencyTypes.Quarterly, "Quarterly"));

            //this.ReminderFrequencies.push(new Models.ReminderFrequencyModel(plsRemindMe.FrequencyTypes.SemiAnnually, "Semi-Annually"));
            this.ReminderFrequencies.push(new plsRemindMe.Models.ReminderFrequencyModel(plsRemindMe.FrequencyTypes.Yearly, "Yearly"));
        };
        return NewReminderViewModel;
    })(plsRemindMe._baseViewModel);
    plsRemindMe.NewReminderViewModel = NewReminderViewModel;
})(plsRemindMe || (plsRemindMe = {}));
