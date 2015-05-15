/// <reference path="../../Scripts/typings/References.ts" />
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
