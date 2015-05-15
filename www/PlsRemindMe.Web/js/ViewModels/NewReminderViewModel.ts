/// <reference path="../Models/UpcomingReminderModel.ts" />
/// <reference path="../Models/ModelReferences.ts" />
/// <reference path="_baseViewModel.ts" />
/// <reference path="../../Scripts/typings/References.ts" />
/// <reference path="../Enums.ts" />
/// <reference path="../Helpers.ts" />
/// <reference path="../Routes.ts" />
/// <reference path="../MessageTypes.ts" />

module plsRemindMe {
    export class NewReminderViewModel extends _baseViewModel {
        public Reminder: KnockoutObservable<Models.UpcomingReminderModel> = ko.observable(new Models.UpcomingReminderModel());
        public CreatedReminders: KnockoutObservableArray<Models.UpcomingReminderModel> = ko.observableArray([]);
        public ReminderFrequencies: KnockoutObservableArray<Models.ReminderFrequencyModel> = ko.observableArray([]);
        public ReminderPriorities: KnockoutObservableArray<Models.ReminderPriorityModel> = ko.observableArray([]);
        public ReminderGuests: KnockoutObservableArray<Models.GuestToRemindModel> = ko.observableArray([]);

        public tempEmailAddress: KnockoutObservable<string> = ko.observable("");
        
        public Modal: any = undefined;
        public IsSaved: KnockoutObservable<boolean> = ko.observable(false);

        public AllDayChecked: KnockoutComputed<void >;
        public TimeChanged: KnockoutComputed<void >;
        public ShowOccurrences: KnockoutComputed<boolean>;

        constructor(currentUser: Models.CurrentUserModel) {
            super(currentUser);

            this.AllDayChecked = ko.computed(() => {
                if (this.Reminder().AllDay()) {
                    this.Reminder().Time("");
                }
            });

            this.TimeChanged = ko.computed(() => {
                if (this.Reminder().Time() !== "") {
                    this.Reminder().AllDay(false);
                }
            });

            this.ShowOccurrences = ko.computed(() => {
                return this.Reminder().Frequency() != plsRemindMe.FrequencyTypes.Once;
            });
          
            this.setupFrequencies();
            this.setupPriorities();
            this.setupValidation();
            this.fetchConnections();
        }

        public fetchConnections() {
            var self = this;
            var route = Routes.ReminderConnections + '/e0aed236-3177-4ff7-9a39-25bb16c8ed62';
            $.get(route)
                .done((results) => {

                    var convertedResults = [];
                    _.each(results, (result) => {
                        convertedResults.push(ko.mapping.fromJS(result, {}, new Models.GuestToRemindModel));
                    });

                    self.ReminderGuests(convertedResults);
                    console.log("Connections");
                })
                .fail();
        }

        public postRenderSetup() {
            var self = this;
            console.log("Post Render");
            var othersToRemindSource = _.map(self.ReminderGuests(), (otherToRemind: Models.GuestToRemindModel) => {
                return otherToRemind.EmailAddress();
            });

            $('#remindOthersInput').typeahead({
                source: othersToRemindSource,
                updater: (item) => {
                    console.log(item);
                    var match = _.find(self.ReminderGuests(), (guest: Models.GuestToRemindModel) => {
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
        }

        public addOtherReminder(emailAddress: KnockoutObservable<string>) {
            var self = this;

            var guestToRemind = new Models.GuestToRemindModel();
            guestToRemind.EmailAddress(emailAddress());

            self.Reminder().OthersToRemind.push(guestToRemind);
            self.tempEmailAddress("");
        }

        public removeOtherReminder(guestToRemind: Models.GuestToRemindModel) {
            var self = this;

            self.Reminder().OthersToRemind.remove(guestToRemind);
        }

        public saveReminder() {
            var self = this;
            if (!(<any>this.Reminder()).isValid()) {
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
            
            
            $.post(route, model)
                .done(results => {

                    _.each(results, (newReminder: Models.UpcomingReminderModel) => {
                        
                        var converted = ko.mapping.fromJS(newReminder, {}, new Models.UpcomingReminderModel());
                        
                        // makes the bindings happy
                        converted.isValid = () => { return true; };

                        self.CreatedReminders.push(converted);
                    });
                                        
                    this.Modal.modal('hide');
                })
                .fail(reason => {
                    self.ErrorMessage(reason.message);
                })
                .always(result => { });
        }

        public selectFrequency(frequency: Models.ReminderFrequencyModel) {
            var self = this;
            _.each(self.ReminderFrequencies(), (item: Models.ReminderFrequencyModel) => {
                if (item.Selected()) {
                    item.Selected(false);
                }
            });

            frequency.Selected(true);
            self.Reminder().Frequency(frequency.Id());
        }

        public selectPriority(priority: Models.ReminderPriorityModel) {
            var self = this;
            _.each(self.ReminderPriorities(), (item: Models.ReminderPriorityModel) => {
                if (item.Selected()) {
                    item.Selected(false);
                }
            });

            priority.Selected(true);
            self.Reminder().Priority(priority.Id());
        }

        private setupValidation() {
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
                    onlyIf: () => { return self.Reminder().AllDay() === false && self.Reminder().Time() === ""; }       
                }               
            });

            self.Reminder().Frequency.extend({
                required: true
            });

            self.Reminder().Occurrences.extend({
                validation: {
                    validator: (value, seed) => {
                        if (!seed) { return true; }

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
        }
        
        public setupPriorities() {
            this.ReminderPriorities.push(new Models.ReminderPriorityModel(plsRemindMe.ReminderPriorityTypes.Normal, "Normal", true));
            this.ReminderPriorities.push(new Models.ReminderPriorityModel(plsRemindMe.ReminderPriorityTypes.High, "High"));
            this.ReminderPriorities.push(new Models.ReminderPriorityModel(plsRemindMe.ReminderPriorityTypes.Urgent, "Urgent"));
            this.ReminderPriorities.push(new Models.ReminderPriorityModel(plsRemindMe.ReminderPriorityTypes.HairsOnFire, "On Fire"));

        }
        
        public setupFrequencies() {
            this.ReminderFrequencies.push(new Models.ReminderFrequencyModel(plsRemindMe.FrequencyTypes.Once, "Once", true));
            this.ReminderFrequencies.push(new Models.ReminderFrequencyModel(plsRemindMe.FrequencyTypes.Weekly, "Weekly"));
            this.ReminderFrequencies.push(new Models.ReminderFrequencyModel(plsRemindMe.FrequencyTypes.BiWeekly, "Bi-Weekly"));
            this.ReminderFrequencies.push(new Models.ReminderFrequencyModel(plsRemindMe.FrequencyTypes.Monthly, "Montly"));
            //this.ReminderFrequencies.push(new Models.ReminderFrequencyModel(plsRemindMe.FrequencyTypes.BiMonthly, "Bi-Monthly"));
            this.ReminderFrequencies.push(new Models.ReminderFrequencyModel(plsRemindMe.FrequencyTypes.Quarterly, "Quarterly"));
            //this.ReminderFrequencies.push(new Models.ReminderFrequencyModel(plsRemindMe.FrequencyTypes.SemiAnnually, "Semi-Annually"));
            this.ReminderFrequencies.push(new Models.ReminderFrequencyModel(plsRemindMe.FrequencyTypes.Yearly, "Yearly"));
        }
    }
}