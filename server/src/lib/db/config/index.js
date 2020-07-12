const config = {
  pgUser: process.env.PGUSER,
  pgHost: process.env.PGHOST,
  pgDatabase: process.env.PGDATABASE,
  pgPassword: process.env.POSTGRES_PASSWORD,
  pgPort: process.env.PGPORT,
};

module.exports = config;
