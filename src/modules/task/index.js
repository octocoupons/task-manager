const express = require('express')
const router = express.Router();
const taskModel = require('./task.model');

router.post('/', async (req, res) => {
    const { text, author } = req.body;
    let newTask = ""
    try {
        newTask = await new taskModel({
            text, author
        }).save()
    } catch(e) {
        console.log('e -> ', e);
        res.status(400).send('error accured while creating task')
    }

    res.status(201).send(newTask);
})

router.get('/', (req, res) => {
    const { id } = req.query;
    res.status(201).send(`your ${id} task`);
})

router.get('/getAll', async (req, res) => {
    let tasks = []
    try {
        tasks = await taskModel.find({}).lean()
    } catch(e) {
        console.log('e -> ', e);
        res.status(400).send('error accured while getting tasks')
    }
    res.status(201).send(tasks);
})

module.exports = router;
