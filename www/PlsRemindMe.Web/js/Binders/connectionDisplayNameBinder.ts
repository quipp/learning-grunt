/// <reference path="../../Scripts/typings/References.ts" />


interface KnockoutBindingHandlers {
    connectionDisplayName: KnockoutBindingHandler;
}

(() => {
    ko.bindingHandlers.connectionDisplayName = {
        init: (element, valueAccessor) => {
            var value = ko.utils.unwrapObservable(valueAccessor());

            if (value) {
                var displayValue = "";
                if (value.FirstName() && value.FirstName().length > 0) {
                    displayValue = value.FirstName() + " " + value.LastName();
                }
                else if ( value.EmailAddress() && value.EmailAddress().length > 0 ) {
                    displayValue = value.EmailAddress();
                }

                ko.utils.setHtml(element, displayValue);
            }

        },
        update: (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) => {
            var value = ko.utils.unwrapObservable(valueAccessor());

            if (value) {
                var displayValue = "";
                if (value.FirstName() && value.FirstName().length > 0) {
                    displayValue = value.FirstName() + " " + value.LastName();
                }
                else if (value.EmailAddress() && value.EmailAddress().length > 0) {
                    displayValue = value.EmailAddress();
                }

                ko.utils.setHtml(element, displayValue);
            }
        }
    };
})();