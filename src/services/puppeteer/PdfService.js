const fs = require('fs').promises
const Handlebars = require('handlebars')
const puppeteer = require('puppeteer')
const path = require('path')
const InvariantError = require('../../exceptions/InvariantError')
const DateUtils = require('../../utils/DateUtils')

class PdfService {
  constructor() {
    this._puppeteer = puppeteer
  }

  async generateTransactionPdf(
    transactions,
    { startDate = new DateUtils().getDateThirtyDaysAgo(), endDate = new Date() }
  ) {
    try {
      const templatePath = path.join(__dirname, '../../templates/TransactionListTemplate.html')

      // Load and compile the Handlebars template
      const htmlTemplate = await fs.readFile(templatePath, 'utf-8')
      const template = Handlebars.compile(htmlTemplate)

      // Format the dates
      const formattedTransactions = transactions.map((transaction) => ({
        ...transaction,
        transaction_date: new DateUtils().formatTransactionDate(transaction.transaction_date)
      }))

      Handlebars.registerHelper('multiply', function (quantity, price) {
        return parseFloat(quantity * price)
          .toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 2
          })
          .replace('IDR', 'Rp')
      })

      Handlebars.registerHelper('countTotal', function (transaction_items) {
        const total = transaction_items.reduce((accumulator, item) => {
          const itemPrice = parseFloat(item.price * item.quantity)
          return isNaN(itemPrice) ? accumulator : accumulator + itemPrice
        }, 0)

        return total
          .toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 2
          })
          .replace('IDR', 'Rp')
      })

      Handlebars.registerHelper('formatIDR', function (number) {
        return parseFloat(number)
          .toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 2
          })
          .replace('IDR', 'Rp')
      })

      Handlebars.registerHelper('countIncome', function (transactions) {
        const totalIncome = transactions.reduce((accumulator, transaction) => {
          return parseFloat(accumulator) + parseFloat(transaction.total_price)
        }, 0)
        return parseFloat(totalIncome)
          .toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 2
          })
          .replace('IDR', 'Rp')
      })

      Handlebars.registerHelper('index', function (value) {
        return parseInt(value) + 1
      })

      // Generate the content
      const content = template({
        transactions: formattedTransactions,
        startDate: new DateUtils().formatDate(startDate),
        endDate: new DateUtils().formatDate(endDate)
      })

      // Launch Puppeteer and generate the PDF
      const browser = await this._puppeteer.launch()
      const page = await browser.newPage()

      await page.setContent(content, { waitUntil: 'networkidle0' })

      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
          top: '10px',
          bottom: '10px',
          left: '10px',
          right: '10px'
        }
      })

      await browser.close()

      if (!pdfBuffer) throw new InvariantError('Tidak dapat membuat File PDF')

      return pdfBuffer
    } catch (error) {
      console.error(error)
      throw new InvariantError('Tidak dapat membuat File PDF')
    }
  }
}

module.exports = PdfService
