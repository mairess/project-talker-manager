const fs = require('fs').promises;
const path = require('path');

const filePath = path.resolve(__dirname, '..', 'talker.json');

async function getAllTalkers() {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    const parsed = JSON.parse(data);
    return parsed;
  } catch (error) {
    console.error(`Erro ao ler o arquivo: ${error.message}`);
  }
}

async function addNewTalker(talker) {
  const theTalkers = await getAllTalkers();
  let newId = 0;
  theTalkers.forEach((t) => { newId = Math.max(newId, t.id) + 1; });
  const newTalker = { id: newId, ...talker };
  theTalkers.push(newTalker);
  await fs.writeFile(filePath, JSON.stringify(theTalkers, null, 2));
  return newTalker;
}

async function updateTalker(id) {
  const theTalkers = await getAllTalkers();
  const theTalker = theTalkers.find((t) => t.id === id);
  return theTalker;
}

module.exports = {
  getAllTalkers,
  addNewTalker,
  updateTalker,
};
