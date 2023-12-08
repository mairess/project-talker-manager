const connection = require('./connection');

const allTalkers = () => connection.execute(
  `SELECT
    name,
    age,
    id,
    JSON_OBJECT("watchedAt", talk_watched_at, "rate", talk_rate) AS talk 
  FROM talkers`,
);

module.exports = {
  allTalkers,
};