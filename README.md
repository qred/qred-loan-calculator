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

// supported markets ['se', 'dk', 'fi', 'nl']
// default: 'se'
loanCalculator.set({
  amount: 
  termInMonths: 6, // [6, 9 or 12]
  market: 'dk'
})

// Get currency
const currency = loanCalculator.currency
// Get the monthly fee
const monthlyFee = loanCalculator.monthlyFee
// Get the monthly total
const monthlyTotal = loanCalculator.monthlyTotal
// Get the total to pay of the loan
const totalToPay = loanCalculator.totalToPay
// Depending on market 
const loanRange = loanCalculator.loanRange

```

###