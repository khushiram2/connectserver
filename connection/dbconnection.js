import neo4j from "neo4j-driver"

const db_connection = async () => {
  // URI examples: 'neo4j://localhost', 'neo4j+s://xxx.databases.neo4j.io'
  const URI = process.env.db_uri
  const USER =process.env.db_username
  const PASSWORD =process.env.db_password
  console.log({USER,PASSWORD})
  let driver
  try {
    driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD))
    const serverInfo = await driver.getServerInfo()
    console.log('Connection established')
    console.log(serverInfo)
    return driver.session()
  } catch(err) {
    console.log(`Connection error\n${err}\nCause: ${err.cause}`)
  }
}

export default db_connection

