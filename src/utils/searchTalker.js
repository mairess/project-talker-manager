const byName = async (theTalkers, queryName) => {
  const reults = theTalkers.filter((talker) => talker.name.includes(queryName));
  if (reults.length === 0) {
    return [];
  }
  return reults;
};

const byRate = async (theTalkers, queryRate) => {
  console.log('byRate function is running');
  const reults = theTalkers.filter((talker) => talker.talk.rate === Number(queryRate));
  if (reults.length === 0) {
    return [];
  }
  return reults;
};

module.exports = {
  byName,
  byRate,
};