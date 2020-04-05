import chai from 'chai'
import LoanCalculator from '../lib/qred-loan-calculator.js'

chai.expect()

const expect = chai.expect

function formatMoney(value) {
  return parseFloat(Number.parseFloat(value).toFixed(2))
}

let lib

describe('Given an instance of LoanCalculator', () => {
  beforeEach(() => {
    lib = new LoanCalculator()
  })

  describe('When I instatiate with DEFAULT values', () => {
    it('should return expected data', () => {
      expect(lib.properties.amount).to.be.equal(100000)
      expect(lib.properties.market).to.be.equal('se')
      expect(lib.properties.termInMonths).to.be.equal(12)
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
    it('should return expected DEFAULT data', () => {
      const badLib = new LoanCalculator({
        market: 'gg',
        termInMonths: 100,
        amount: 'cheese'
      })

      expect(badLib.properties.amount).to.be.equal(100000)
      expect(badLib.properties.market).to.be.equal('se')
      expect(badLib.properties.termInMonths).to.be.equal(12)
      expect(badLib.properties.firstMonthFree).to.be.equal(false)
    })
  })

  describe('When I change market', () => {
    it('should return appropiate currency from totalToPay', () => {
      expect(lib.totalToPay.currency).to.be.equal('SEK')
      lib.setMarket('dk')
      expect(lib.totalToPay.currency).to.be.equal('DKK')
    })

    it('should return appropiate currency from monthlyFee', () => {
      expect(lib.monthlyFee.currency).to.be.equal('SEK')
      lib.setMarket('dk')
      expect(lib.monthlyFee.currency).to.be.equal('DKK')
    })

    it('should return appropiate currency from monthlyTotal', () => {
      expect(lib.monthlyTotal.currency).to.be.equal('SEK')
      lib.setMarket('dk')
      expect(lib.monthlyTotal.currency).to.be.equal('DKK')
    })

    it('should return appropiate currency from monthlyAmortisation', () => {
      expect(lib.monthlyAmortisation.currency).to.be.equal('SEK')
      lib.setMarket('dk')
      expect(lib.monthlyAmortisation.currency).to.be.equal('DKK')
    })

    it('should change the loan range', () => {
      const expectedSE = {
        min: 10000, max: 1000000,  currency: 'SEK'
      }
      const expectedDK = {
        min: 10000, max: 500000,  currency: 'DKK'
      }
      expect(lib.loanRange).to.have.property('min').equal(expectedSE.min)
      expect(lib.loanRange).to.have.property('max').equal(expectedSE.max)
      expect(lib.loanRange).to.have.property('currency').equal(expectedSE.currency)

      lib.setMarket('dk')

      expect(lib.loanRange).to.have.property('min').equal(expectedDK.min)
      expect(lib.loanRange).to.have.property('max').equal(expectedDK.max)
      expect(lib.loanRange).to.have.property('currency').equal(expectedDK.currency)
    })
  })

  describe('When I want loan calculation estimates', () => {
    it('should return some expected values with DEFAULT values', () => {
      const expected = {
        monthlyTotal: formatMoney(9993.33),
        monthlyAmortisation: formatMoney(8333.33),
        monthlyFee: formatMoney(1660),
        totalToPay: formatMoney(119920)
      }

      expect(lib.totalToPay.value).to.be.equal(expected.totalToPay)
      expect(lib.monthlyFee.value).to.be.equal(expected.monthlyFee)
      expect(lib.monthlyAmortisation.value).to.be.equal(expected.monthlyAmortisation)
      expect(lib.monthlyTotal.value).to.be.equal(expected.monthlyTotal)
    })

    it('should return some expected values when term in months is changed', () => {
      const expectedEighteen = {
        monthlyTotal: formatMoney(7045.56),
        monthlyAmortisation: formatMoney(5555.56),
        monthlyFee: formatMoney(1490),
        totalToPay: formatMoney(126820)
      }

      const expectedTwelve = {
        monthlyTotal: formatMoney(9993.33),
        monthlyAmortisation: formatMoney(8333.33),
        monthlyFee: formatMoney(1660),
        totalToPay: formatMoney(119920)
      }

      lib.setTermInMonths(18)
      expect(lib.totalToPay.value).to.be.equal(expectedEighteen.totalToPay)
      expect(lib.monthlyFee.value).to.be.equal(expectedEighteen.monthlyFee)
      expect(lib.monthlyAmortisation.value).to.be.equal(expectedEighteen.monthlyAmortisation)
      expect(lib.monthlyTotal.value).to.be.equal(expectedEighteen.monthlyTotal)

      lib.setTermInMonths(12)
      expect(lib.totalToPay.value).to.be.equal(expectedTwelve.totalToPay)
      expect(lib.monthlyFee.value).to.be.equal(expectedTwelve.monthlyFee)
      expect(lib.monthlyAmortisation.value).to.be.equal(expectedTwelve.monthlyAmortisation)
      expect(lib.monthlyTotal.value).to.be.equal(expectedTwelve.monthlyTotal)
    })

    it('should return some expected values when amount is changed', () => {
      const expected100K = {
        monthlyTotal: formatMoney(9993.33),
        monthlyAmortisation: formatMoney(8333.33),
        monthlyFee: formatMoney(1660),
        totalToPay: formatMoney(119920)
      }

      const expected250K = {
        monthlyTotal: formatMoney(24593.33),
        monthlyAmortisation: formatMoney(20833.33),
        monthlyFee: formatMoney(3760),
        totalToPay: formatMoney(295120)
      }

      const expected320K = {
        monthlyTotal: formatMoney(31406.67),
        monthlyAmortisation: formatMoney(26666.67),
        monthlyFee: formatMoney(4740),
        totalToPay: formatMoney(376880)
      }

      lib.setAmount(100000)
      expect(lib.totalToPay.value).to.be.equal(expected100K.totalToPay)
      expect(lib.monthlyFee.value).to.be.equal(expected100K.monthlyFee)
      expect(lib.monthlyAmortisation.value).to.be.equal(expected100K.monthlyAmortisation)
      expect(lib.monthlyTotal.value).to.be.equal(expected100K.monthlyTotal)

      lib.setAmount(250000)
      expect(lib.totalToPay.value).to.be.equal(expected250K.totalToPay)
      expect(lib.monthlyFee.value).to.be.equal(expected250K.monthlyFee)
      expect(lib.monthlyAmortisation.value).to.be.equal(expected250K.monthlyAmortisation)
      expect(lib.monthlyTotal.value).to.be.equal(expected250K.monthlyTotal)

      lib.setAmount(320000)
      expect(lib.totalToPay.value).to.be.equal(expected320K.totalToPay)
      expect(lib.monthlyFee.value).to.be.equal(expected320K.monthlyFee)
      expect(lib.monthlyAmortisation.value).to.be.equal(expected320K.monthlyAmortisation)
      expect(lib.monthlyTotal.value).to.be.equal(expected320K.monthlyTotal)
    })

    it('should return some expected values when both termInMonths and amount is changed', () => {
      const expectedEighteen320K = {
        monthlyTotal: formatMoney(21467.78),
        monthlyAmortisation: formatMoney(17777.78),
        monthlyFee: formatMoney(3690),
        totalToPay: formatMoney(386420)
      }

      const expectedTwelve500K = {
        monthlyTotal: formatMoney(48926.67),
        monthlyAmortisation: formatMoney(41666.67),
        monthlyFee: formatMoney(7260),
        totalToPay: formatMoney(587120)
      }

      const expectedSix10K = {
        monthlyTotal: formatMoney(1865.67),
        monthlyAmortisation: formatMoney(1666.67),
        monthlyFee: formatMoney(199),
        totalToPay: formatMoney(11194)
      }

      lib.setAmount(320000)
      lib.setTermInMonths(18)
      expect(lib.totalToPay.value).to.be.equal(expectedEighteen320K.totalToPay)
      expect(lib.monthlyFee.value).to.be.equal(expectedEighteen320K.monthlyFee)
      expect(lib.monthlyAmortisation.value).to.be.equal(expectedEighteen320K.monthlyAmortisation)
      expect(lib.monthlyTotal.value).to.be.equal(expectedEighteen320K.monthlyTotal)

      lib.setAmount(500000)
      lib.setTermInMonths(12)
      expect(lib.totalToPay.value).to.be.equal(expectedTwelve500K.totalToPay)
      expect(lib.monthlyFee.value).to.be.equal(expectedTwelve500K.monthlyFee)
      expect(lib.monthlyAmortisation.value).to.be.equal(expectedTwelve500K.monthlyAmortisation)
      expect(lib.monthlyTotal.value).to.be.equal(expectedTwelve500K.monthlyTotal)

      lib.setAmount(10000)
      lib.setTermInMonths(6)
      expect(lib.totalToPay.value).to.be.equal(expectedSix10K.totalToPay)
      expect(lib.monthlyFee.value).to.be.equal(expectedSix10K.monthlyFee)
      expect(lib.monthlyAmortisation.value).to.be.equal(expectedSix10K.monthlyAmortisation)
      expect(lib.monthlyTotal.value).to.be.equal(expectedSix10K.monthlyTotal)

    })

    it('should return some expected DEFAULT values when market is changed', () => {
      const expectedDK = {
        monthlyTotal: formatMoney(9993.33),
        monthlyAmortisation: formatMoney(8333.33),
        monthlyFee: formatMoney(1660),
        totalToPay: formatMoney(119920)
      }

      const expectedFI = {
        monthlyTotal: formatMoney(999.33),
        monthlyAmortisation: formatMoney(833.33),
        monthlyFee: formatMoney(166),
        totalToPay: formatMoney(11992)
      }

      const expectedNL = {
        monthlyTotal: formatMoney(999.33),
        monthlyAmortisation: formatMoney(833.33),
        monthlyFee: formatMoney(166),
        totalToPay: formatMoney(11992)
      }

      lib = new LoanCalculator({ market: 'dk' })
      expect(lib.totalToPay.value).to.be.equal(expectedDK.totalToPay)
      expect(lib.monthlyFee.value).to.be.equal(expectedDK.monthlyFee)
      expect(lib.monthlyAmortisation.value).to.be.equal(expectedDK.monthlyAmortisation)
      expect(lib.monthlyTotal.value).to.be.equal(expectedDK.monthlyTotal)

      lib = new LoanCalculator({ market: 'fi' })
      expect(lib.totalToPay.value).to.be.equal(expectedFI.totalToPay)
      expect(lib.monthlyFee.value).to.be.equal(expectedFI.monthlyFee)
      expect(lib.monthlyAmortisation.value).to.be.equal(expectedFI.monthlyAmortisation)
      expect(lib.monthlyTotal.value).to.be.equal(expectedFI.monthlyTotal)

      lib = new LoanCalculator({ market: 'nl' })
      expect(lib.totalToPay.value).to.be.equal(expectedNL.totalToPay)
      expect(lib.monthlyFee.value).to.be.equal(expectedNL.monthlyFee)
      expect(lib.monthlyAmortisation.value).to.be.equal(expectedNL.monthlyAmortisation)
      expect(lib.monthlyTotal.value).to.be.equal(expectedNL.monthlyTotal)
    })
  })
})