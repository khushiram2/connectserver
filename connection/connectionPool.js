// class Neo4jConnectionPool {
//     constructor(uri, auth, maxPoolSize = 10) {
//         this.uri = uri;
//         this.auth = auth;
//         this.maxPoolSize = maxPoolSize;
//         this.pool = [];
//         this.availableSessions = [];
//         this.createPool();
//     }

//     createPool() {
//         for (let i = 0; i < this.maxPoolSize; i++) {
//             const driver = neo4j.driver(this.uri, this.auth);
//             const session = driver.session();
//             this.pool.push({ driver, session });
//             this.availableSessions.push(session);
//         }
//     }

//     acquire() {
//         if (this.availableSessions.length > 0) {
//             const session = this.availableSessions.pop(); // Return an available session from the pool
//             return session;
//         } else {
//             throw new Error('No available sessions in the pool');
//         }
//     }

//     release(session) {
//         this.availableSessions.push(session); // Add the released session back to the pool
//     }
// }

// // Function to acquire a session from the pool
// function acquireSessionFromPool(pool) {
//     if (pool instanceof Neo4jConnectionPool) {
//         return pool.acquire();
//     } else {
//         throw new Error('Invalid pool object');
//     }
// }

// // Example usage:
// const pool = new Neo4jConnectionPool('bolt://localhost:7687', neo4j.auth.basic('username', 'password'));

// // Acquire a session from the pool using the function
// const session = acquireSessionFromPool(pool);
// console.log(session); // Use the session as needed

// // Release the session back to the pool when done
// pool.release(session);
//
import neo4j from "neo4j-driver";

const devDatabaseConnection = async () => {
  // URI examples: 'neo4j://localhost', 'neo4j+s://xxx.databases.neo4j.io'
  const URI = process.env.db_uri;
  const USER = process.env.db_userName;
  const PASSWORD = process.env.db_password;
  let driver;
  
  try {
    console.log({ URI, USER, PASSWORD });
    driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD));
    const serverInfo = await driver.getServerInfo();
    console.log('Connection established');
    console.log(serverInfo);
    return driver;
  } catch(err) {
    console.log(`Connection error\n${err}\nCause: ${err.cause}`);
    throw err; // Re-throw the error to be handled by the caller
  }
}

export default devDatabaseConnection;
