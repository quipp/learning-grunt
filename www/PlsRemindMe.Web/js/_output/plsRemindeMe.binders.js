
(function () {
    ko.bindingHandlers.asFormattedDateText = {
        init: function (element, valueAccessor) {
            var value = ko.utils.unwrapObservable(valueAccessor());

            if (value) {
                var formattedDate = moment(value).format('MMM Do YYYY');

                ko.utils.setHtml(element, formattedDate);
            }
        },
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var value = ko.utils.unwrapObservable(valueAccessor());

            if (value) {
                var formattedDate = moment(value).format('MMM Do YYYY');

                ko.utils.setHtml(element, formattedDate);
            }
        }
    };
})();

(function () {
    ko.bindingHandlers.connectionDisplayName = {
        init: function (element, valueAccessor) {
            var value = ko.utils.unwrapObservable(valueAccessor());

            if (value) {
                var displayValue = "";
                if (value.FirstName() && value.FirstName().length > 0) {
                    displayValue = value.FirstName() + " " + value.LastName();
                } else if (value.EmailAddress() && value.EmailAddress().length > 0) {
                    displayValue = value.EmailAddress();
                }

                ko.utils.setHtml(element, displayValue);
            }
        },
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var value = ko.utils.unwrapObservable(valueAccessor());

            if (value) {
                var displayValue = "";
                if (value.FirstName() && value.FirstName().length > 0) {
                    displayValue = value.FirstName() + " " + value.LastName();
                } else if (value.EmailAddress() && value.EmailAddress().length > 0) {
                    displayValue = value.EmailAddress();
                }

                ko.utils.setHtml(element, displayValue);
            }
        }
    };
})();
