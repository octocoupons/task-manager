const express = require('express')
const router = express.Router();

router.post('/', (req, res) => {
    res.status(201).send('task added');
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    res.status(201).send(`your ${id} task`);
})

module.exports = router;
