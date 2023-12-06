const fileManipulation = require('./fileManipulation');

const findTheTalker = async (id) => {
  const talkers = await fileManipulation.getAllTalkers();
  const theTalker = talkers.find((talker) => talker.id === Number(id));
  return theTalker;
};

module.exports = findTheTalker;