const searchTalker = async (theTalkers, param) => {
  const reults = theTalkers.filter((talker) => talker.name.includes(param));
  console.log(reults.length <= 0);
  if (reults.length === 0) {
    return [];
  }
  return reults;
};

module.exports = searchTalker;