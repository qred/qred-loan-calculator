# Qred loan calculator

## Purpose

This repository is a public node library for calculating loan estimates given a term in months and an amount.

## Installation

`npm install qred-loan-calculator`

or 

`yarn add qred-loan-calculator`

## Usage

Unknown yet

```
import loanCalculator from 'qred-loan-calculator'


// 
loanCalculator.set({
  amount: 50000, // validated by loanCalculator.loanRange , default: depending on market { se: 50000, dk: 50000, fi: 5000, nl: 5000}
  termInMonths: 6, // [6, 9 or 12], default: 6
  market: 'dk' // supported markets ['se', 'dk', 'fi', 'nl'], default: 'se'
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

###