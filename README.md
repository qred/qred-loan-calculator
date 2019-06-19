# Qred loan calculator

Webpack boilerplate from: `https://github.com/krasimir/webpack-library-starter`

## Purpose

This repository is a public node library for calculating loan estimates given a term in months and an amount.

## Installation

`npm install qred-loan-calculator`

or 

`yarn add qred-loan-calculator`

## Usage

```
import LoanCalculator from 'qred-loan-calculator'

// Instantiate qred-loan-calculator
// all properties are optional
const loanCalculator = new LoanCalculator({
  amount: 100000, // validated by loanCalculator.loanRange , default: depending on market { se: 100000, dk: 100000, fi: 10000, nl: 10000}
  termInMonths: 6, // [6, 12 or 18], default: 6
  market: 'dk' // supported markets ['se', 'dk', 'fi', 'nl'], default: 'se',
  firstMonthFree: false // Used for first month free offers. default: false
})

// Get the monthly fee e.g: { value: 1000, currency: 'SEK'}
const monthlyFee = loanCalculator.monthlyFee

// Get the monthly total  e.g: { value: 1000, currency: 'SEK'}
const monthlyTotal = loanCalculator.monthlyTotal

// Get the total to pay of the loan  e.g: { value: 1000, currency: 'SEK'}
const totalToPay = loanCalculator.totalToPay

// Get  the depends on market get the e.g: { min: 10000, max: 1000000, currency: 'SEK'}
const loanRange = loanCalculator.loanRange

```

## Properties

### monthlyFee
Qred's monthly fee to be added to the amortisation

```
const loanCalculator = new LoanCalculator()
const monthlyFee = loanCalculator.monthlyFee
// monthlyFee = { value: 50000, currency: 'SEK'}
```

### monthlyTotal
Qred's monthly fee + amortisation

```
const loanCalculator = new LoanCalculator()
const monthlyTotal = loanCalculator.monthlyTotal
// monthlyTotal = { value: 9333, currency: 'SEK'}
```

### totalToPay

The total cost of the loan repayment over the duration of the period

```
const loanCalculator = new LoanCalculator()
const totalToPay = loanCalculator.totalToPay
// totalToPay = { value: 56 000, currency: 'SEK'}
```

### loanRange

The min and max loan values we offer per market

```
const loanCalculator = new LoanCalculator()
const loanRange = loanCalculator.loanRange
// loanRange = { min: 10000, max: 500000, currency: 'SEK'}
```

### monthlyAmortisation

```
const loanCalculator = new LoanCalculator()
const monthlyAmortisation = loanCalculator.monthlyAmortisation
// monthlyAmortisation = { value: 8333, currency: 'SEK' }
```

## Methods

### setTermInMonths

Change the termInMonths of which fees are calculated

```
const loanCalculator = new LoanCalculator()
loanCalculator.setTermInMonths(12) // 6, 12 or 18

// loanCalculator.properties.termInMonths = 12

```

### setAmount

Change the loan amount, of which fees are calculated

```
const loanCalculator = new LoanCalculator()
const loanRange = loanCalculator.loanRange
const value = 60000

if (value >= loanRange.min && value <= loanRange.max) {
  loanCalculator.setAmount(value)
}

// loanCalculator.properties.amount = 60000

```

### setMarket

Change the market, this will change the currency and loan range.
Valid markets : `['se', 'dk', 'fi', 'nl']`
Default: `'se'`

```
const loanCalculator = new LoanCalculator()

loanCalculator.setMarket('dk')

// loanCalculator.properties.market = 'dk'

```