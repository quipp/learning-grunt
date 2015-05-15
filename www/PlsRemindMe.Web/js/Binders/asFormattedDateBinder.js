/// <reference path="../../Scripts/typings/References.ts" />
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
