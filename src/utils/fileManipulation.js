const fs = require('fs').promises;
const path = require('path');

const filePath = path.resolve(__dirname, '..', 'talker.json');

async function getAllTalkers() {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    const parsed = JSON.parse(data);
    return parsed;
  } catch (error) {
    console.error(`Algo deu errado: ${error.message}`);
  }
}

async function addNewTalker(talker) {
  try {
    const theTalkers = await getAllTalkers();
    let newId = 0;
    theTalkers.forEach((t) => { newId = Math.max(newId, t.id) + 1; });
    const newTalker = { id: newId, ...talker };
    theTalkers.push(newTalker);
    await fs.writeFile(filePath, JSON.stringify(theTalkers, null, 2));
    return newTalker;
  } catch (error) {
    console.error(`Algo deu errado: ${error.message}`);
  }
}

async function updateTalker(id, newTalkerData) {
  try {
    const theTalkers = await getAllTalkers();
    const index = theTalkers.findIndex((talker) => talker.id === Number(id));
    const updatedTalker = { id: Number(id), ...newTalkerData };
    theTalkers.splice(index, 1, updatedTalker);
    await fs.writeFile(filePath, JSON.stringify(theTalkers, null, 2));
    return updatedTalker;
  } catch (error) {
    console.error(`Algo deu errado: ${error.message}`);
  }
}

async function deleteTalker(id) {
  try {
    const theTalkers = await getAllTalkers();
    const updatedTalkers = theTalkers.filter((talker) => talker.id !== Number(id));
    await fs.writeFile(filePath, JSON.stringify(updatedTalkers, null, 2));
  } catch (error) {
    console.error(`Algo deu errado: ${error.message}`);
  }
}

module.exports = {
  getAllTalkers,
  addNewTalker,
  updateTalker,
  deleteTalker,
};
