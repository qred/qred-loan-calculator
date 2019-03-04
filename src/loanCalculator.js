import _ from 'lodash'

const defaultProperties = {
  amount: 50000,
  termInMonths: 6,
  market: 'se',
  firstMonthFree: false
}

export default class LoanCalculator {
  constructor(args = {}) {
    const { amount, termInMonths, market, firstMonthFree } = args
    const filteredArgs = {
      amount: amount || null,
      termInMonths: termInMonths || null,
      market: market || null,
      firstMonthFree: firstMonthFree || null
    }
    this.properties = _.assignIn(defaultProperties, _.omitBy(filteredArgs, _.isNull))
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

    return {
      amount: amount + Math.min(amount, 100000) * (interest / 100) * term + Math.max((amount - 100000), 0) * (scalingRate / 100) * term,
      currency: this.currency
    }
  }

  get monthlyFee() {
    const { amount, termInMonths } = this.properties
    const totalToPay = this.totalToPay

    return {
      amount: (totalToPay.amount - amount) / termInMonths,
      currency: this.currency
    }
  }

  get monthlyAmortisation() {
    const { amount, termInMonths } = this.properties

    return amount / termInMonths
  }

  get monthlyTotal() {
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
