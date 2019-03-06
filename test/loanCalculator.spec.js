import chai from 'chai'
import LoanCalculator from '../lib/qred-loan-calculator.js'

chai.expect()

const expect = chai.expect

let lib
let lib2
let badLib

describe('Given an instance of LoanCalculator', () => {
  beforeEach(() => {
    lib = new LoanCalculator()

    badLib = new LoanCalculator({
      market: 'gg',
      termInMonths: 100,
      amount: 'cheese'
    })
  })

  describe('When I instatiate with default values', () => {
    it('should return expected data', () => {
      expect(lib.properties.amount).to.be.equal(50000)
      expect(lib.properties.market).to.be.equal('se')
      expect(lib.properties.termInMonths).to.be.equal(6)
      expect(lib.properties.firstMonthFree).to.be.equal(false)
    })

    it('should allow for termInMonths to be changed', () => {
      lib.setTermInMonths(12)
      expect(lib.properties.termInMonths).to.be.equal(12)
    })

    it('should allow for amount to be changed', () => {
      lib.setAmount(60000)
      expect(lib.properties.amount).to.be.equal(60000)
    })
  })

  describe('When I instatiate with bad data', () => {
    it('should return expected default data', () => {
      expect(badLib.properties.amount).to.be.equal(50000)
      expect(badLib.properties.market).to.be.equal('se')
      expect(badLib.properties.termInMonths).to.be.equal(6)
      expect(badLib.properties.firstMonthFree).to.be.equal(false)
    })
  })

  describe('When I change market', () => {
    it('should change to the appropiate currency', () => {
    })

    it('should change the loan range', () => {
    })
  })

  describe('When I want loan calculation estimates', () => {
    it('should return some expected values #1', () => {

    })

    it('should return some expected values #2', () => {

    })

    it('should return some expected values #3', () => {

    })

    it('should return some expected values #4', () => {

    })

    it('should return some expected values #5', () => {

    })
  })
})