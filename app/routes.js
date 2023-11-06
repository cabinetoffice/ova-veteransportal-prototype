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
        response.redirect("#")
    } else if (vetsIdCard == "Applied"){
        response.redirect("#")
    } else {
        response.redirect("/ineligible")
    }
})
