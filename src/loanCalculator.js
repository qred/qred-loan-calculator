import _ from 'lodash'

const defaultProperties = {
  amount: 50000,
  termInMonths: 6,
  market: 'se'
}

export default class Dog {
  constructor(args) {
    this.properties = _.assignIn(defaultProperties, args)
  }
  get name() {
    return this._name;
  }

  get monthlyFee() {
    return 'monthlyFee'
  }

  get monthlyTotal() {
    return 'monthlyTotal'
  }

  getloanRange() {
    return 'loanRange'
  }
}
