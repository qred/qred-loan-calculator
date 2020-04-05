const defaultProperties = {
  termInMonths: 12,
  market: 'se',
  firstMonthFree: false
}

function getMarketDefaultAmount(market) {
  switch(market) {
    case 'nl':
      return 10000
    case 'dk':
      return 100000
    case 'fi':
      return 10000
    default:
      return 100000
  }
}

function omitBy(obj) {
  if (obj) {
    const newObj = {}

    Object.keys(obj).forEach(key => {
      let value = obj[key]

      if (value !== null) {
         newObj[key] = obj[key]
      }
    })

    return newObj
  }
  return {}
}

function formatMoney(value) {
  return parseFloat(Number.parseFloat(value).toFixed(2))
}

function validate(value, field) {
  if (value === undefined || value === null)
    return null

  switch (field) {
    case 'amount':
      // TODO: validate amount is between loanRange
      if (Number(value) === value && value % 1 === 0) {
        return value
      } else {
        return null
      }
    case 'termInMonths':
      if ([6, 12, 18].includes(Number(value))) {
        return value
      } else {
        return defaultProperties.termInMonths
      }
    case 'market':
      if (['se', 'fi', 'dk', 'nl'].includes(value)) {
        return value
      } else {
        return defaultProperties.market
      }
    case 'firstMonthFree':
      return !!value
  }
}

export default class LoanCalculator {
  constructor(args = {}) {
    const { amount, termInMonths, market, firstMonthFree } = args

    const filteredArgs = {
      amount: validate(amount, 'amount'),
      termInMonths: validate(termInMonths, 'termInMonths'),
      market: validate(market, 'market'),
      firstMonthFree: validate(firstMonthFree, 'firstMonthFree')
    }

    if (!filteredArgs.amount) {
      filteredArgs.amount = getMarketDefaultAmount(filteredArgs.market)
    }

    this.properties = Object.assign({}, defaultProperties, omitBy(filteredArgs))
  }

  setAmount(amount) {
    const validatedAmount = validate(amount, 'amount')

    if (!validatedAmount) {
      this.properties.amount = getMarketDefaultAmount(this.properties.market)
    } else {
      this.properties.amount = validatedAmount
    }
  }

  setTermInMonths(termInMonths) {
    const validatedTerm = validate(termInMonths, 'termInMonths')
    this.properties.termInMonths = validatedTerm
  }

  setMarket(market) {
    const validatedMarket = validate(market, 'market')

    this.properties.market = validatedMarket
  }

  get interest() {
    const { termInMonths } = this.properties

    if (termInMonths === 18) {
      return {
        interest: 1.49,
        scalingRate: 1
      }
    } else if (termInMonths === 12) {
      return {
        interest: 1.66,
        scalingRate: 1.4,
      }
    }

    return {
      interest: 1.99,
      scalingRate: 1.5
    }
  }

  get totalToPay() {
    const { termInMonths, amount, firstMonthFree, market } = this.properties
    let term = termInMonths
    const { interest, scalingRate } = this.interest
    let unformatted = ''

    if (firstMonthFree) {
      term -= 1
    }
    if ( market === 'fi' || market === 'nl') {
      unformatted = amount + Math.min(amount, 10000) * (interest / 100) * term + Math.max((amount - 10000), 0) * (scalingRate / 100) * term
    } else {
       unformatted = amount + Math.min(amount, 100000) * (interest / 100) * term + Math.max((amount - 100000), 0) * (scalingRate / 100) * term
    }
    
    return {
      value: formatMoney(unformatted),
      currency: this.currency
    }
  }

  get monthlyFee() {
    const { amount, termInMonths } = this.properties
    const totalToPay = this.totalToPay

    return {
      value: formatMoney((totalToPay.value - amount) / termInMonths),
      currency: this.currency
    }
  }

  get monthlyAmortisation() {
    const { amount, termInMonths } = this.properties

    return {
      value: formatMoney((amount / termInMonths)),
      currency: this.currency
    }
  }

  get monthlyTotal() {
    return {
      value: formatMoney(Number(this.monthlyAmortisation.value + this.monthlyFee.value)),
      currency: this.currency
    }
  }

  get currency() {
    const { market } = this.properties

    switch(market) {
      case 'fi':
        return 'EUR'
      case 'nl':
        return 'EUR'
      case 'dk':
        return 'DKK'
      default:
        return 'SEK'
    }
  }

  get loanRange() {
    const { market } = this.properties

    switch(market) {
      case 'fi':
        return { min: 1000, max: 100000, currency: this.currency }
      case 'nl':
        return { min: 1000, max: 100000, currency: this.currency }
      case 'dk':
        return { min: 10000, max: 500000, currency: this.currency }
      default:
        return { min: 10000, max: 1000000,  currency: this.currency }
    }
  }
}
