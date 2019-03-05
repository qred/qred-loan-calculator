const defaultProperties = {
  amount: 50000,
  termInMonths: 6,
  market: 'se',
  firstMonthFree: false
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

export default class LoanCalculator {
  constructor(args = {}) {
    const { amount, termInMonths, market, firstMonthFree } = args
    // TODO: validate termInMonths is [6, 9 or 12] and is int otherwise 6
    // TODO: validate amount is between loanRange and is int 
    // TODO: if market !== se change default amount and is string
    // TODO: validate market is [se, dk, fi or nl] otherwise throw error 

    // TODO(luxury): Add format property (decimals, seperator etc)

    const filteredArgs = {
      amount: amount || null,
      termInMonths: termInMonths || null,
      market: market || null,
      firstMonthFree: firstMonthFree || null
    }
    this.properties = Object.assign(defaultProperties, omitBy(filteredArgs))
  }

  setAmount(amount) {
    // TODO: validate amount is int and withinRange
    // TODO: rounding on amount
    this.properties.amount = amount
  }

  setTermInMonths(termInMonths) {
    // TODO: validate termInMonths
    this.properties.termInMonths = termInMonths
  }

  get interest() {
    const { termInMonths } = this.properties

    if (termInMonths === 9) {
      return {
        interest: 1.9,
        scalingRate: 1.45
      }
    } else if (termInMonths === 12) {
      return {
        interest: 1.8,
        scalingRate: 1.4
      }
    }

    return {
      interest: 2,
      scalingRate: 1.5
    }
  }

  get totalToPay() {
    const { termInMonths, amount, firstMonthFree } = this.properties
    let term = termInMonths
    const { interest, scalingRate } = this.interest

    if (firstMonthFree) {
      term -= 1
    }

    // TODO: rounding on amount
    return {
      amount: amount + Math.min(amount, 100000) * (interest / 100) * term + Math.max((amount - 100000), 0) * (scalingRate / 100) * term,
      currency: this.currency
    }
  }

  get monthlyFee() {
    const { amount, termInMonths } = this.properties
    const totalToPay = this.totalToPay

    // TODO: rounding on amount
    return {
      amount: (totalToPay.amount - amount) / termInMonths,
      currency: this.currency
    }
  }

  get monthlyAmortisation() {
    const { amount, termInMonths } = this.properties

    // TODO: rounding on amount
    return amount / termInMonths
  }

  get monthlyTotal() {
    // TODO: rounding on amount
    return {
      amount: this.monthlyAmortisation + this.monthlyFee.amount,
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

  get getloanRange() {
    const { market } = this.properties

    switch(market) {
      case 'fi':
        return { min: 1000, max: 50000, currency: this.currency }
      case 'nl':
        return { min: 1000, max: 50000, currency: this.currency }
      case 'dk':
        return { min: 10000, max: 250000, currency: this.currency }
      default:
        return { min: 10000, max: 500000,  currency: this.currency }
    }
  }
}
