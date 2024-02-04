// ==UserScript==
// @name         BLS Spain Visa Auto Filler
// @namespace    https://hexpy.fyi
// @version      2024-02-04
// @description  This tampermonkey script makes it easy as a breeze to finally get an appointment for a visa to spain
// @author       @hExPY
// @match        https://*.blsspainvisa.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=blsspainvisa.com
// @grant        none
// ==/UserScript==

// ### ------- Value lookup on the embassy page ------- ###
// Depending on the country you're residing, some values
// may change. You have to open up the embassy page of your
// residing country and use your browsers dev tools to
// find the matching values. As an example, in Ecuador
// field "VisaTypeId" is "167" for "Short Term Visa".
// ### ------- Value lookup on the embassy page ------- ###

// All personal related data -> REPLACE EVERY FIELD
const phoneCountryCode = "000" // Enter your phone country code
const phoneNumber = "00000000" // Enter your phone number
const emailAddress = "my@email.address" // Enter your email address
const visaTypeId = "000" // See section "Value lookup on the embassy page"
const firstNames = "MY FIRST NAMES" // Enter your first names in capital letters
const lastNames = "MY LAST NAMES" // Enter your last names in capital letters
const dateOfBirth = "2024-12-31" // Enter your date of birth in YEAR-MONTH-DAY (YYYY-MM-DD)
const nationalityId = "00" // See section "Value lookup on the embassy page"
const passportType = "00" // See section "Value lookup on the embassy page"
const passportNumber = "X9999999" // Enter your passport ID (Read from your passport)
const passportIssueDate = "2024-12-31" // Enter the date when the passport has been issued in YEAR-MONTH-DAY (YYYY-MM-DD) (Read from your passport)
const passportExpiryDate = "2024-12-31" // Enter the date when the passport has been expired in YEAR-MONTH-DAY (YYYY-MM-DD) (Read from your passport)
const passportIssuePalace = "COUNTRY" // Enter the country where the passport has been issued (Read from your passport)

// The following two datasets are used to map the field ID (you can find the ID using your browsers dev tools) and "to-be-filled" data
/// The format is the following [["FIELD_ID_1", "FIELD_VALUE_1"], ["FIELD_ID_2", "FIELD_VALUE_2], ...]
//// This dataset will be used to request the code "Impreso de Solicitud de Cita"
const generalDataParaIniciarLaCita = [
    ["phone_code", phoneCountryCode],
    ["phone", phoneNumber],
    ["email", emailAddress]
]

//// This dataset will be used to pre-fill all fields on the page where you choose your desired appointment date
const personalDataParaLaCita = [
    ["VisaTypeId", visaTypeId],
    ["first_name", firstNames],
    ["last_name", lastNames],
    ["dateOfBirth", dateOfBirth],
    ["phone_code", phoneCountryCode],
    ["phone", phoneNumber],
    ["nationalityId", nationalityId],
    ["passportType", passportType],
    ["passport_no", passportNumber],
    ["pptIssueDate", passportIssueDate],
    ["pptExpiryDate", passportExpiryDate],
    ["pptIssuePalace", passportIssuePalace]
]

const autofillForms = (formMap) => {
    formMap.map((field) => {
        const [fieldId, fieldValue] = field;
        try {
            const fieldObject = document.getElementById(fieldId)
            fieldObject.value = fieldValue;
            console.log(`changed ${fieldId} to ${fieldValue}`)
        } catch (e) {
            console.log(e)
            alert("something went wrong while filling, please check console!")
        }

    })
}

(function() {
    'use strict';
    if (document.getElementById("app_type1")) {
        console.log("Filling Impreso de Solicitud de Cita...")
        autofillForms(generalDataParaIniciarLaCita);
        return;
    }
    if (document.getElementById("app_date")) {
        console.log("Filling the page where you choose the date...")
        autofillForms(personalDataParaLaCita);
        return;
    }
    console.log("Neither Impreso de Solicitud de Cita or the page where you choose the date has been found. Exiting!")
})();