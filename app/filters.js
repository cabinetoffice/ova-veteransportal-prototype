const govukPrototypeKit = require('govuk-prototype-kit')
const addFilter = govukPrototypeKit.views.addFilter

addFilter('bold', function (content) {
  return '<strong>' + content + '</strong>'
}, { renderAsHtml: true })

addFilter('sortResults', function (filters) {
  var searchableFilters = []
  filters.forEach(f => {
    if (typeof f.data === "string" && f.data.length === 0) {
      return
    }
    if (f.data != null || f.data != undefined) {
      searchableFilters.push(f)
    }
  })

  if (searchableFilters.length == 0) {
    return orgs
  }

  var results = []
  searchableFilters.forEach(filter => {
    switch (filter.filterType) {
      case "topic":
        orgs.forEach(org => {
          if (filter.data.includes(org.helpsWith) && !results.includes(org)) {
          results.push(org)
          }
        })
        break
      case "location":
        orgs.forEach(org => {
          if (filter.data.includes(org.location) && !results.includes(org)) {
            results.push(org)
          }
        })
        break
      default:
        results.push(orgs)
        break
    }
  })

  if (searchableFilters.length == 1) {
    return results
  }

  var singleFilterList = []
  searchableFilters.forEach(f => {
    f.data.forEach(data => {
      singleFilterList.push(data)
    })
  })

  var finalResults = []

  results.forEach(r => {
    if (singleFilterList.includes(r.helpsWith) && singleFilterList.includes(r.location)) {
      finalResults.push(r)
    }
  })

  return finalResults
})

var orgs = [
  {
    name: "Association of Service Drop in Centres (ASDIC)",
    link: "https://www.asdic.org.uk/",
    description: "ASDIC connects the national network of drop-Ins to offer local community support  to the ex-military community and their families.",
    helpsWith: "Social and community",
    location: "UK Wide"
  },
  {
    name: "Blesma: The Limbless Veterans Charity",
    link: "https://blesma.org/",
    description: "A service charity that supports veterans who have a life-altering injury such as loss of a limb or eye, offering practical and emotional support to  and them and their families.",
    helpsWith: "Social and community",
    location: "UK Wide"
  },
  {
    name: "Blind Veterans Uk",
    link: "https://www.blindveterans.org.uk/",
    description: "Provides rehabilitation, training, practical advice and emotional support to veterans regardless of how or when they lost their sight.",
    helpsWith: "Physical health",
    location: "UK Wide"
  },
  {
    name: "Broughton House",
    link: "https://www.broughtonhouse.com/",
    description: "A residential and nursing care home for veterans in Salford, Greater Manchester.",
    helpsWith: "Housing",
    location: "England"
  },
  {
    name: "Building Heroes",
    link: "https://www.buildingheroes.org.uk/",
    description: "Training and employment support for veterans who want to work in the construction industry.",
    helpsWith: "Employment",
    location: "Wales"
  },
  {
    name: "Combat Stress",
    link: "https://www.defencediscountservice.co.uk",
    description: "A Ministry of Defence vetted discount card that allows veterans and members of the armed forces community to receive military discounts.",
    helpsWith: "Finance",
    location: "UK Wide"
  },
  {
    name: "Defence Discount",
    link: "https://www.buildingheroes.org.uk/",
    description: "Training and employment support for veterans who want to work in the construction industry.",
    helpsWith: "Employment",
    location: "Wales"
  },
  {
    name: "Haig Housing",
    link: "https://www.haighousing.org.uk/",
    description: "Haig Housing provides UK wide housing built for veterans and their families in housing need.",
    helpsWith: "Housing",
    location: "UK Wide"
  },
  {
    name: "Help for Heroes",
    link: "https://www.helpforheroes.org.uk/",
    description: "Help for Heroes supports members of the armed forces community with their and mental health and a range of welfare issues.",
    helpsWith: "Mental health",
    location: "UK Wide"
  },
  {
    name: "Links Combined Forces",
    link: "https://www.links.uk.net/",
    description: "Links Combined Forces provides mental health support for veterans and blue light teams and their families living in Carmarthenshire.",
    helpsWith: "Mental health",
    location: "Wales"
  },
  {
    name: "Op Courage",
    link: "https://www.nhs.uk/nhs-services/armed-forces-community/mental-health/veterans-reservists/",
    description: "A specialist mental health service designed to help veterans, their families and serving personnel preparing to leave the armed forces.",
    helpsWith: "Mental health",
    location: "England"
  },
  {
    name: "Op Fortitude",
    link: "https://www.riverside.org.uk/care-and-support/veterans/opfortitude/",
    description: "Op Fortitude is centralised referral pathway into veteran supported housing. Referrals can be made by veterans themselves as well as any organisations supporting them.",
    helpsWith: "Housing",
    location: "UK Wide"
  },
  {
    name: "Op Nova",
    link: "/#",
    description: "Op Nova provides support for veterans who are in contact with the justice system, helping them to access the services they need, including employment, legal advice and referrals to support with housing and mental health.",
    helpsWith: "Employment",
    location: "UK Wide"
  },
  {
    name: "Op Restore",
    link: "https://www.nhs.uk/nhs-services/armed-forces-community/veterans-service-leavers-non-mobilised-reservists/",
    description: "Op Restore supports veterans with service attributable physical health conditions, regardless of how long they served for and when they left the Armed Forces.",
    helpsWith: "Physical health",
    location: "England"
  },
  {
    name: "Outside the Wire",
    link: "https://www.matthewproject.org/outsidethewire",
    description: "A bespoke drug and alcohol service offering confidential advice and support to current and ex HM Forces personnel and their families, across Norfolk, Suffolk, Essex, and Cambridgeshire.",
    helpsWith: "Mental health",
    location: "England"
  },
  {
    name: "Phoenix Heroes",
    link: "https://www.phoenixheroes.co.uk/",
    description: "A Community Interest Company based in Colchester, that supports veterans UK wide by providing them with access to outdoor activities and offers support with those struggling with mental health difficulties.",
    helpsWith: "Mental health",
    location: "UK Wide"
  }
]