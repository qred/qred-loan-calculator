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
const loanCalculator = LoanCalculator({
  amount: 50000, // validated by loanCalculator.loanRange , default: depending on market { se: 50000, dk: 50000, fi: 5000, nl: 5000}
  termInMonths: 6, // [6, 9 or 12], default: 6
  market: 'dk' // supported markets ['se', 'dk', 'fi', 'nl'], default: 'se',
  firstMonthFree: false // Used for first month free offers. default: false
})

// Get the monthly fee e.g: { value: 1000, currency: 'SEK'}
const monthlyFee = loanCalculator.monthlyFee

// Get the monthly total  e.g: { value: 1000, currency: 'SEK'}
const monthlyTotal = loanCalculator.monthlyTotal

// Get the total to pay of the loan  e.g: { value: 1000, currency: 'SEK'}
const totalToPay = loanCalculator.totalToPay

// Get  the depends on market get the e.g: { min: 10000, max: 500000, currency: 'SEK'}
const loanRange = loanCalculator.loanRange

```

## Properties

### monthlyFee
Qred's monthly fee to be added to the amortisation

```
const loanCalculator = LoanCalculator()
const monthlyFee = loanCalculator.monthlyFee
// monthlyFee = { amount: 50000, currency: 'SEK'}
```

### monthlyTotal
Qred's monthly fee + amortisation

```
const loanCalculator = LoanCalculator()
const monthlyTotal = loanCalculator.monthlyTotal
// monthlyTotal = { amount: 9333, currency: 'SEK'}
```

### totalToPay

The total cost of the loan repayment over the duration of the period

```
const loanCalculator = LoanCalculator()
const totalToPay = loanCalculator.totalToPay
// totalToPay = { amount: 56 000, currency: 'SEK'}
```

### loanRange

The min and max loan values we offer per market

```
const loanCalculator = LoanCalculator()
const loanRange = loanCalculator.loanRange
// loanRange = { min: 10000, max: 500000, currency: 'SEK'}
```