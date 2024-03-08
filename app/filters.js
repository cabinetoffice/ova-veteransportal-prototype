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

  var singleFilterList = []
  searchableFilters.forEach(f => {
    f.data.forEach(data => {
      singleFilterList.push(data)
    })
  })

  var results = []

  singleFilterList.forEach(f => {
    var result = orgs.filter(o => Object.values(o).some(function search(v) {
      return v && typeof v === 'object' ? Object.values(v).some(search) : v === f;
    }));
    results.push(result)
  })

  let uniqueResults = [...new Set(results.flat(1))];

  if (singleFilterList.length == 1) {
    return uniqueResults
  }

  var helpsWithTopic = false
  var helpsWithLocation = false
  searchableFilters.forEach(filter => {
    if (topics.includes(filter.filterType)) {
      helpsWithTopic = true
    }
    if (locations.includes(filter.filterType)) {
      helpsWithLocation = true
    }
    if (helpsWithTopic && helpsWithLocation) {
      return
    }
  })

  var shouldCheckBoth = helpsWithTopic && helpsWithLocation

  var finalResults = []

  if (shouldCheckBoth) {
    uniqueResults.forEach(r => {
      if (includesAny(r.helpsWith, singleFilterList) && includesAny(r.location, singleFilterList)) {
        finalResults.push(r)
      }
    })
    return finalResults
  } else {
    return uniqueResults
  }

})

const topics = [
  "health",
  "finance",
  "legalHelp",
  "employment",
  "educationTraining",
  "housing",
  "family",
  "community",]

const locations = [
  "ukWide",
  "england",
  "northernIreland",
  "scotland",
  "wales",]

const includesAny = (arr, values) => values.some(v => arr.includes(v));

const orgs = [
  {
    name: "Royal British Legion",
    link: "https://www.britishlegion.org.uk/",
    email: "test@example.com",
    number: "00000000000",
    description: "Helps with a broad range of veteran services and signposting, from supporting with housing, healthcare, social care, employment, families and children, across the board, including providing dedicated care homes for older veterans, support for carers, to helping ex-serving personnel and their families with independent living.",
    helpsWith: [
    " mental health",
    " physical health",
    " social care",
    " pensions",
    " compensations",
    " benefits",
    " financial help",
    " debt advice",
    " funeral costs",
    " discounts",
    " general legal advice",
    " support for those in the justice system",
    " transition support and career advice",
    " support for jobseekers",
    " starting a business",
    " apprenticeships and in-work training",
    " other training and education",
    " bursaries, scholarships and grants",
    " homelessness and crisis accommodation",
    " care homes and supported housing",
    " renting a home",
    " buying a home",
    " support for veterans' spouses and partners",
    " childcare and custody",
    " support with relationships",
    " domestic abuse",
    " drop-ins and breakfast clubs",
    " leisure activities",
    " volunteering opportunities"],
    location: ["UK Wide"]
  },
  {
    name: "Amicus",
    link: "https://www.amicustrust.org/",
    email: "test@example.com",
    number: "00000000000",
    description: "Provides supported accommodation to veterans (16 to 65 years old) who are homeless or at risk of homelessness in the East of England.",
    helpsWith: [" mental health", " physical health", " pensions", " Buying a home"],
    location: ["East of England"]
  },
  {
    name: "Army Benevolent Fund",
    link: "https://armybenevolentfund.org/",
    description: "Offers grants to individuals in need of help with a range of issues, including debt, funeral costs, household expenses, elderly care and mobility.",
    helpsWith: ["general legal advice"],
    location: ["East of England"]
  },
  {
    name: "Association of Service Drop in Centres (ASDIC)",
    link: "https://www.asdic.org.uk/",
    description: "ASDIC connects the national network of drop-Ins to offer local community support  to the ex-military community and their families.",
    helpsWith: ["drop-ins and breakfast clubs"],
    location: ["UK Wide"]
  },
  {
    name: "Blesma: The Limbless Veterans Charity",
    link: "https://blesma.org/",
    description: "A service charity that supports veterans who have a life-altering injury such as loss of a limb or eye, offering practical and emotional support to  and them and their families.",
    helpsWith: ["physical health"],
    location: ["UK Wide"]
  },
  {
    name: "Blind Veterans UK",
    link: "https://www.blindveterans.org.uk/",
    description: "Provides rehabilitation, training, practical advice and emotional support to veterans regardless of how or when they lost their sight.",
    helpsWith: ["physical health"],
    location: ["UK Wide"]
  },
  {
    name: "Broughton House",
    link: "https://www.broughtonhouse.com/",
    description: "A residential and nursing care home for veterans in Salford, Greater Manchester.",
    helpsWith: ["care homes and supported housing"],
    location: ["England wide"]
  },
  {
    name: "Combat Stress",
    link: "https://combatstress.org.uk/",
    description: "A Ministry of Defence vetted discount card that allows veterans and members of the armed forces community to receive military discounts.",
    helpsWith: [],
    location: ["UK Wide"]
  },
  {
    name: "Defence Discount",
    link: "https://www.defencediscountservice.co.uk",
    description: "Training and employment support for veterans who want to work in the construction industry.",
    helpsWith: ["transition support and career advice"],
    location: ["Wales wide"]
  },
  {
    name: "Defence Gardens",
    link: "https://defencegardens.org/",
    description: "A national network of gardens which host the delivery and evaluation of nature-based therapy for Armed Forces Service Leavers and Veterans and their families.",
    helpsWith: ["mental health"],
    location: ["UK Wide"]
  },
  {
    name: "Felix Fund",
    link: "https://www.felixfund.org.uk/",
    description: "Helps anyone who has conducted or assisted with Explosive Ordnance Disposal with a wide range of issues, including physical and mental health and accessing grants.",
    helpsWith: [],
    location: ["UK Wide"]
  },
  {
    name: "Fighting With Pride",
    link: "https://www.fightingwithpride.org.uk/",
    description: "Supports LGBT+ veterans, serving personnel and families guidance and signposting to partner organisations for a wide range of help including health, housing, employment and financial advice.",
    helpsWith: ["mental health"],
    location: ["UK Wide"]
  },
  {
    name: "Forces Money Plan",
    link: "https://forcesmoneyplan.org/",
    description: "Free, confidential advice from accredited financial advisors who have volunteered their time and expertise to support armed forces personnel and veterans with financial advice.",
    helpsWith: [],
    location: ["UK Wide"]
  },
  {
    name: "Forces Pension Society",
    link: "https://forcespensionsociety.org/",
    description: "An independent, not-for-profit organisation that acts as a pension watchdog for the military community. There is an annual membership fee to access their services.",
    helpsWith: [],
    location: ["UK Wide"]
  },
  {
    name: "Forward Assist",
    link: "https://www.forward-assist.com/",
    description: "Forward Assist provides support, advice, guidance and advocacy aimed at improving the mental and physical health of veterans.",
    helpsWith: ["mental health"],
    location: ["UK Wide"]
  },
  {
    name: "Haig Housing",
    link: "https://www.haighousing.org.uk/",
    description: "Haig Housing provides UK wide housing built for veterans and their families in housing need.",
    helpsWith: [],
    location: ["UK Wide"]
  },
  {
    name: "Help for Heroes",
    link: "https://www.helpforheroes.org.uk/",
    description: "Help for Heroes supports members of the armed forces community with their and mental health and a range of welfare issues.",
    helpsWith: ["mental health"],
    location: ["UK Wide"]
  },
  {
    name: "Housing Options Scotland",
    link: "https://housingoptionsscotland.org.uk/",
    description: "Housing Options Scotland helps disabled people, older adults and members of the Armed Forces community, including veterans, to find a home that suits their needs.",
    helpsWith: ["homelessness and crisis accommodation"],
    location: ["Scotland wide"],
  },
  {
    name: "Links Combined Forces",
    link: "https://www.links.uk.net/",
    description: "Links Combined Forces provides mental health support for veterans and blue light teams and their families living in Carmarthenshire.",
    helpsWith: ["mental health"],
    location: ["Wales wide"]
  },
  {
    name: "Op Courage",
    link: "https://www.nhs.uk/nhs-services/armed-forces-community/mental-health/veterans-reservists/",
    description: "A specialist mental health service designed to help veterans, their families and serving personnel preparing to leave the armed forces.",
    helpsWith: ["mental health"],
    location: ["England wide"],
  },
  {
    name: "Op Fortitude",
    link: "https://www.riverside.org.uk/care-and-support/veterans/opfortitude/",
    description: "Op Fortitude is centralised referral pathway into veteran supported housing. Referrals can be made by veterans themselves as well as any organisations supporting them.",
    helpsWith: ["homelessness and crisis accommodation"],
    location: ["UK Wide"]
  },
  {
    name: "Op Nova",
    link: "/#",
    description: "Op Nova provides support for veterans who are in contact with the justice system, helping them to access the services they need, including employment, legal advice and referrals to support with housing and mental health.",
    helpsWith: [],
    location: ["UK Wide"]
  },
  {
    name: "Op Restore",
    link: "https://www.nhs.uk/nhs-services/armed-forces-community/veterans-service-leavers-non-mobilised-reservists/",
    description: "Op Restore supports veterans with service attributable physical health conditions, regardless of how long they served for and when they left the Armed Forces.",
    helpsWith: ["physical health"],
    location: ["England wide"]
  },
  {
    name: "Outside the Wire",
    link: "https://www.matthewproject.org/outsidethewire",
    description: "A bespoke drug and alcohol service offering confidential advice and support to current and ex HM Forces personnel and their families, across Norfolk, Suffolk, Essex, and Cambridgeshire.",
    helpsWith: ["mental health"],
    location: ["England wide"]
  },
  {
    name: "Phoenix Heroes",
    link: "https://www.phoenixheroes.co.uk/",
    description: "A Community Interest Company based in Colchester, that supports veterans UK wide by providing them with access to outdoor activities and offers support with those struggling with mental health difficulties.",
    helpsWith: ["mental health"],
    location: ["UK Wide"]
  },
  {
    name: "PTSD Resolution",
    link: "https://ptsdresolution.org/",
    description: "Helps veterans and their families who are struggling with mental health. The programme is community-based, with treatment and support provided locally through a nationwide network of 200 therapists, accredited by the Professional Standards Authority.",
    helpsWith: ["mental health"],
    location: ["UK Wide"]
  },
  {
    name: "RAFA (Royal Air Force Association)",
    link: "https://rafa.org.uk/",
    description: "Helps members and ex-members of the RAF, as well as their spouses, widows and dependants with a range of issues, including mental health support.",
    helpsWith: ["mental health"],
    location: ["UK Wide"]
  },
  {
    name: "RBL (Royal British Legion",
    link: "https://www.britishlegion.org.uk/",
    description: "Helps serving members of the armed forces and veterans and their families with a range of issues, including mental health support via a helpline, or online chat or in locations across the UK.",
    helpsWith: ["mental health"],
    location: ["UK Wide"]
  },
  {
    name: "SSAFA",
    link: "https://www.ssafa.org.uk/",
    description: "SSAFA does not deliver medical, counselling or advocacy services, but can help with referral while offering practical support with a wide range of other issues.",
    helpsWith: ["mental health"],
    location: ["UK Wide"]
  },
  {
    name: "Stoll",
    link: "https://www.stoll.org.uk/",
    description: "Provides support and access to social housing for veterans.",
    helpsWith: ["homelessness and crisis accommodation"],
    location: ["UK Wide"]
  },
  {
    name: "Veterans Launchpad",
    link: "https://veteranslaunchpad.org.uk/",
    description: "Veterans Launchpad Provides accommodation and support to help veterans make a successful transition from military to civilian life.",
    helpsWith: [],
    location: ["UK Wide"]
  },
  {
    name: "Walking with the Wounded",
    link: "https://walkingwiththewounded.org.uk/",
    description: "Walking with the Wounded supports veterans and their families with mental health, employment and care coordination following discharge from service.",
    helpsWith: ["mental health"],
    location: ["UK Wide"]
  }
]