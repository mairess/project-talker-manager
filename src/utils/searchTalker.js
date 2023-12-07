const byName = async (theTalkers, queryName) => {
  console.log(queryName);
  const reults = theTalkers.filter((talker) => talker.name.includes(queryName));
  if (reults.length === 0) {
    return [];
  }
  return reults;
};

const byRate = async (theTalkers, queryRate) => {
  const reults = theTalkers.filter((talker) => talker.talk.rate === Number(queryRate));
  console.log(queryRate);
  if (reults.length === 0) {
    return [];
  }
  return reults;
};

module.exports = {
  byName,
  byRate,
};