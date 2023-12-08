//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

router.post('/financial-emergency', function(request, response) {

    var financialEmergency = request.session.data['financialEmergency']
    if (financialEmergency == "Yes"){
        response.redirect("/current/get-emergency-help")
    } else if (financialEmergency == "No"){
        response.redirect("/current/finance-type")
    } else {
        response.redirect("/ineligible")
    }
})

router.post('/finance-type', function(request, response) {

    var financeType = request.session.data['financeType']
    if (financeType == "General"){
        response.redirect("")
    } else if (financeType == "Specific"){
        response.redirect("/current/specific-help-list")
    } else {
        response.redirect("/ineligible")
    }
})

router.post('/vets-id-card', function(request, response) {

    var vetsIdCard = request.session.data['vetsIdCard']
    if (vetsIdCard == "Yes"){
        response.redirect("/current/veterans-id-card-details")
    } else if (vetsIdCard == "No"){
        response.redirect("/current/service-details")
    } else if (vetsIdCard == "Applied"){
        response.redirect("/current/service-details")
    } else {
        response.redirect("/ineligible")
    }
})

router.post('/is-eligible', function(request, response) {
    var eligible = request.session.data['eligible']

    if (eligible == "no") {
        response.redirect("/current/not-eligible")
    } else {
        response.redirect("/current/i-need-help-with")
    }
})

router.post('/sprint-003/does-consent-to-contact', function(request, response) {
    var consent = request.session.data['doYouConsentToContact']

    if (consent == "no") {
        response.redirect("/sprint-003/not-eligible")
    } else {
        response.redirect("/sprint-003/contact-preferences")
    }
})

router.post('/sprint-003/does-consent-to-refer', function(request, response) {
    var consent = request.session.data['doYouConsentToRefer']

    if (consent == "no") {
        response.redirect("/sprint-003/refer-not-eligible")
    } else {
        response.redirect("/sprint-003/full-name")
    }
})

// Sprint 004

router.post('/sprint-004/country', function(request, response) {
    var country = request.session.data['country']

    if (country == "england") {
        response.redirect("/sprint-004/eligibility/when-did-you-leave")
    } else if (country == "scotland") {
        response.redirect("/sprint-004/eligibility/when-did-you-leave")
    } else if (country == "wales") {
        response.redirect("/sprint-004/eligibility/when-did-you-leave")
    } else if (country == "ni") {
        response.redirect("/sprint-004/eligibility/when-did-you-leave")
    } else if (country == "none") {
        response.redirect("/sprint-004/eligibility/non-uk")
    }
})

router.post('/sprint-004/whatBestDescribesYou', function(request, response) {
    var whatBestDescribesYou = request.session.data['whatBestDescribesYou']

    if (whatBestDescribesYou == "yes") {
        response.redirect("/sprint-004/eligibility/referral/discharge-year")
    } else if (whatBestDescribesYou == "no") {
        response.redirect("/sprint-004/eligibility/referral/non-veteran")
    } else if (whatBestDescribesYou == "serving") {
        response.redirect("/sprint-004/eligibility/referral/active-service")
    } else if (whatBestDescribesYou == "onBehalf") {
        response.redirect("/sprint-004/eligibility/referral/non-veteran")
    }
})
