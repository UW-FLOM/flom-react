module.exports = {
  "development": {
    "username": "postgres",
    "password": "mypassword",
    "database": "flom",
    "host": "db",
    "port": "5432",
    "logging": false,
    "dialect": "postgres"
  },
  "production": {
    "username": "postgres",
    "password": process.env.DB_PASSWORD,
    "database": "flom",
    "host": "db",
    "port": "5432",
    "logging": false,
    "dialect": "postgres"
  }
};
