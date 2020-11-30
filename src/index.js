const express = require('express')
const app = express()
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const port = 3000

const task = require('./modules/task');

const bootServer = async () => {
    app.use(bodyParser.json());

    try {
        await mongoose.connect('mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false/task-db', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('MongoDB connected')
    } catch (e) {
        throw new Error(e)
    }
    
    app.get('/', (req, res) => {
      res.send('Hello World!')
    })
    
    app.use('/api/task', task)
    
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`)
    })
}


bootServer()


