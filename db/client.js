const { Client } = require("pg");

const connectionString =
  process.env.DATABASE_URL ||
  "postgres://rwudtgko:l0LVRtSF2Clo1CdfwdkrNSvL3A5rfglN@bubble.db.elephantsql.com/rwudtgko";

const client = new Client({
  connectionString,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : undefined,
});

module.exports = client;
