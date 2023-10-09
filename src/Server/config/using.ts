const getDb = require('../db')
// @ts-ignore
Symbol.asyncDispose ??= Symbol('Symbol.asyncDipose')
// @ts-ignore
Symbol.dispose ??= Symbol('Symbol.dispose')

const getConnection = async () => {
  const connection = await getDb()
  return {
    connection,
    [Symbol.asyncDispose]: async () => {
      console.log('연결ㄲ늫기')
      await connection.end()
    },
  }
}

module.exports = getConnection
