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
      await connection.end()
    },
  }
}

module.exports = getConnection
