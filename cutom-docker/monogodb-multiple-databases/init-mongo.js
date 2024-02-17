// Read environment variables
const adminUsername = process.env.MONGO_INITDB_ROOT_USERNAME;
const adminPassword = process.env.MONGO_INITDB_ROOT_PASSWORD;
const adminDatabase = process.env.MONGO_INITDB_ROOT_DATABASE;

print(`Admin Username: ${adminUsername}`);
print(`Admin Password: ${adminPassword}`);
print(`Admin Database: ${adminDatabase}`);

// Connect to admin database
let adminDB = db.getSiblingDB(adminDatabase);
adminDB.auth(adminUsername, adminPassword);

print("Connected to admin database");

// Get multiple databases string and split it into individual database names
const multipleDatabases = process.env.MONGO_MULTIPLE_DATABASES;
const databases = multipleDatabases.split(',').map(dbName => dbName.trim());

print(`Multiple Databases: ${multipleDatabases}`);
print(`Individual Database Names: ${databases}`);

// Create databases and dummy collections
databases.forEach(dbName => {
  // Create the database
  adminDB.createCollection(dbName);
  print(`Database '${dbName}' created`);

  // Switch to the newly created database
  let dbInstance = db.getSiblingDB(dbName);
  print(`Switched to database '${dbName}'`);

  // Create a dummy collection in the current database
  dbInstance.createCollection('dummy_collection');
})
