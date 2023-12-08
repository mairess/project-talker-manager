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
    const allTalkers = await getAllTalkers();
    let newId = 0;
    allTalkers.forEach((t) => { newId = Math.max(newId, t.id) + 1; });
    const newTalker = { id: newId, ...talker };
    allTalkers.push(newTalker);
    await fs.writeFile(filePath, JSON.stringify(allTalkers, null, 2));
    return newTalker;
  } catch (error) {
    console.error(`Algo deu errado: ${error.message}`);
  }
}

async function updateTalker(id, newTalkerData) {
  try {
    const allTalkers = await getAllTalkers();
    const index = allTalkers.findIndex((talker) => talker.id === Number(id));
    const updatedTalker = { id: Number(id), ...newTalkerData };
    allTalkers.splice(index, 1, updatedTalker);
    await fs.writeFile(filePath, JSON.stringify(allTalkers, null, 2));
    return updatedTalker;
  } catch (error) {
    console.error(`Algo deu errado: ${error.message}`);
  }
}

async function deleteTalker(id) {
  try {
    const allTalkers = await getAllTalkers();
    const updatedTalkers = allTalkers.filter((talker) => talker.id !== Number(id));
    await fs.writeFile(filePath, JSON.stringify(updatedTalkers, null, 2));
  } catch (error) {
    console.error(`Algo deu errado: ${error.message}`);
  }
}

async function updateRate(id, rate) {
  try {
    const allTalkers = await getAllTalkers();
    const index = allTalkers.findIndex((talker) => talker.id === Number(id));
    allTalkers[index].talk.rate = rate;
    await fs.writeFile(filePath, JSON.stringify(allTalkers, null, 2));
  } catch (error) {
    console.error(`Algo deu errado: ${error.message}`);
  }
}

module.exports = {
  getAllTalkers,
  addNewTalker,
  updateTalker,
  deleteTalker,
  updateRate,
};
