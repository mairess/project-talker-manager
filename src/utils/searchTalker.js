const byName = async (theTalkers, queryName) => {
  const results = theTalkers.filter((talker) => talker.name.includes(queryName));
  if (results.length === 0) {
    return [];
  }
  return results;
};

const byRate = async (theTalkers, queryRate) => {
  const results = theTalkers.filter((talker) => talker.talk.rate === Number(queryRate));
  if (results.length === 0) {
    return [];
  }
  return results;
};

const byDate = async (theTalkers, queryDate) => {
  const results = theTalkers.filter((talker) => talker.talk.watchedAt === queryDate);
  if (results.length === 0) {
    return [];
  }
  return results;
};

module.exports = {
  byName,
  byRate,
  byDate,
};