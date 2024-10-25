const fs = require('fs').promises
const Handlebars = require('handlebars')
const puppeteer = require('puppeteer')
const path = require('path')
const InvariantError = require('../../exceptions/InvariantError')

class PdfService {
  constructor() {
    this._puppeteer = puppeteer
  }

  getStartDate(daysAgo) {
    const currentDate = new Date()
    currentDate.setDate(currentDate.getDate() - daysAgo)
    return currentDate
  }

  _formatDate = (date) => {
    if (isNaN(new Date(date))) return date

    const newDate = new Date(date)
    const dateOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
    return newDate.toLocaleDateString('id-ID', dateOptions)
  }

  _formatTransactionDate = (date) => {
    const newDate = new Date(date)

    const dateOptions = {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    }

    return newDate.toLocaleDateString('id-ID', dateOptions)
  }

  async generateTransactionPdf(
    transactions,
    {
      startDate = new Date(new Date().setDate(new Date().getDate() - 30)).setHours(0, 0, 0, 0),
      endDate = new Date().setHours(0, 0, 0, 0)
    }
  ) {
    try {
      const templatePath = path.join(__dirname, '../../templates/TransactionListTemplate.html')

      // Load and compile the Handlebars template
      const htmlTemplate = await fs.readFile(templatePath, 'utf-8')
      const template = Handlebars.compile(htmlTemplate)

      // Format the dates
      const formattedTransactions = transactions.map((transaction) => ({
        ...transaction,
        transaction_date: this._formatTransactionDate(transaction.transaction_date)
      }))

      Handlebars.registerHelper('multiply', function (quantity, price) {
        return parseFloat(quantity * price).toLocaleString('id-ID', {
          style: 'currency',
          currency: 'IDR',
          minimumFractionDigits: 0
        })
      })

      Handlebars.registerHelper('formatIDR', function (number) {
        return parseFloat(number).toLocaleString('id-ID', {
          style: 'currency',
          currency: 'IDR',
          minimumFractionDigits: 0
        })
      })

      Handlebars.registerHelper('index', function (value) {
        return parseInt(value) + 1
      })

      // Generate the content
      const content = template({
        transactions: formattedTransactions,
        startDate: this._formatDate(startDate),
        endDate: this._formatDate(endDate)
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

      return pdfBuffer
    } catch (error) {
      console.error(error.message)
      throw new InvariantError('Tidak dapat mengekspor ke PDF')
    }
  }
}

module.exports = PdfService
