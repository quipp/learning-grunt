/// <reference path="../../Scripts/typings/References.ts" />


interface KnockoutBindingHandlers {
    asFormattedDateText: KnockoutBindingHandler;
}

(() => {
    ko.bindingHandlers.asFormattedDateText = {
        init: (element, valueAccessor) => {
            var value = ko.utils.unwrapObservable(valueAccessor());

            if (value) {
                var formattedDate = moment(value).format('MMM Do YYYY');

                ko.utils.setHtml(element, formattedDate);
            }

        },
        update: (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) => {
            var value = ko.utils.unwrapObservable(valueAccessor());

            if (value) {
                var formattedDate = moment(value).format('MMM Do YYYY');

                ko.utils.setHtml(element, formattedDate);
            }
        }
    };
})();