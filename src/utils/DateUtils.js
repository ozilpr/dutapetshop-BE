const { formatInTimeZone } = require('date-fns-tz')
const { startOfDay, subDays } = require('date-fns')

class DateUtils {
  getDateThirtyDaysAgo() {
    const thirtyDaysAgo = startOfDay(subDays(new Date(), 30))

    return thirtyDaysAgo.toISOString()
  }

  formatDate(date) {
    const parsedDate = new Date(date)

    if (isNaN(parsedDate)) {
      console.error('Invalid date provided')
      return null
    }

    const timeZone = 'Asia/Jakarta'
    return formatInTimeZone(parsedDate, timeZone, 'dd MMMM yyyy')
  }

  formatTransactionDate(date) {
    const parsedDate = new Date(date)

    if (isNaN(parsedDate)) {
      console.error('Invalid date provided')
      return null
    }

    const timeZone = 'Asia/Jakarta'
    return formatInTimeZone(parsedDate, timeZone, "dd MMMM yyyy 'pukul' HH.mm 'WIB'")
  }
}

module.exports = DateUtils
