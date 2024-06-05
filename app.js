const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('./config/database');
const Item = require('./models/Item');

app.use(express.json());


app.get('/', (req, res) => {
  res.status(200).send('Hello, world!');
});


app.post('/items', async (req, res) => {
  try {
    const item = new Item(req.body);
    await item.save();
    res.status(201).send(item);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});


app.put('/items/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedItem = await Item.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updatedItem) {
      return res.status(404).send({ error: 'Item não encontrado' });
    }
    res.status(200).send(updatedItem);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});


app.delete('/items/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deletedItem = await Item.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).send({ error: 'Item não encontrado' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});

