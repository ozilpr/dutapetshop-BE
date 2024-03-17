class GetLocalTime {
  async getDate () {
    const utcTimeStamp = Date.now()
    const gmt7Offset = 7 * 60 * 60 * 1000
    const gmt7Timestamp = utcTimeStamp + gmt7Offset
    const date = new Date(gmt7Timestamp).toISOString()

    return date
  }
}

module.exports = GetLocalTime
