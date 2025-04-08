"use strict";

var reg = function () {
    $("li:has(:contains('Скрытые поля'))").hide();
    $("div[data-label-name='Логическое поле 2']").removeClass("label-required");
    $("div[data-label-name='Логическое поле 3']").removeClass("label-required");
}

var fieldsProductOfNumbers = function () {
    var priceInput = $("input[name='Price']");
    var taxInput = $("input[name='Tax']");
    var taxSumInput = $("input[name='TaxSum']");

    if (!priceInput.val() || !taxInput.val()) {
        return;
    }

    taxSumInput.val(priceInput.val() * (taxInput.val() / 100));
}

var hideTable = function () {
    var logField1 = $("input[name='LogField1']");
    var tableContainer = $("[data-name='Table']").parent().parent();

    if (logField1.is(":checked")) {
        tableContainer.show();
    } else {
        tableContainer.hide();
    }
}

var categoryFiller = function () {
    var categoryField = $("input[name='Category']");
    var priceInput = $("input[name='Price']");


    if (priceInput.val() < 100000) {
        categoryField.val("Категория 1");
    } else
    if (priceInput.val() >= 100000 && priceInput.val() <= 500000) {
        categoryField.val("Категория 2");
    } else
    if (priceInput.val() > 500000) {
    categoryField.val("Категория 3");
    }
}

var alternativeCheckboxDisabler = function () {
    var logField2 = $("input[name='LogField2']");
    var logField3 = $("input[name='LogField3']");
    var textField5 = $("input[name='TextField5']");
    var approverField = $("input[name='Approver']");

    let disableCheckbox = (checkbox) => {
        checkbox.prop("required", false);
        checkbox.attr("disabled", true);
    }

    let activateCheckbox = (checkbox) => {
        checkbox.prop("required", true);
        checkbox.attr("disabled", false);
    }

    if (logField2.is(":checked")) {
        disableCheckbox(logField3);
        textField5.val("Значение 1");
        approverField.parent().parent().parent().show();
        approverField.prop("required", true);
        approverField.parent().parent().parent().find(".documentView-field-label").addClass("label-required");
    } else {
        activateCheckbox(logField3);
        approverField.prop("required", false);
        approverField.parent().parent().parent().find(".documentView-field-label").removeClass("label-required");
    }

    if (logField3.is(":checked")) {
        disableCheckbox(logField2);
        textField5.val("Значение 2");
        approverField.parent().parent().parent().hide();

    } else {
        activateCheckbox(logField2);
        approverField.parent().parent().parent().show();
    }
}

$("input[name='Price']").on('change', function () {
    categoryFiller();
    fieldsProductOfNumbers();
});

$("input[name='Tax']").on('change', function () {
    fieldsProductOfNumbers();
});

$("input[name='LogField2']").on('change', function () {
    alternativeCheckboxDisabler();
});

$("input[name='LogField3']").on('change', function () {
    alternativeCheckboxDisabler();
});

$("input[name='LogField1']").on('change', function () {
    hideTable();
});

scopes.onRegister(reg);
scopes.onRegister(hideTable);

scopes.onEdit(reg);
scopes.onEdit(hideTable);
scopes.onEdit(alternativeCheckboxDisabler);