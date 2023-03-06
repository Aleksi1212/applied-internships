import express from 'express'

import { getAll, addNewInternship, updateInternship } from './datalayer/querys.mjs'

const app = express()

// const connectToDB = await mariadb.createConnection(connection)

app
    .get('/getAll', async (req, res) => {
        const test = await getAll('', false)
        res.json(test)
    })

    .get('/inOrder/:orderBy', async (req, res) => {
        const test = await getAll(req.params.orderBy, true)
        res.json(test)
    })

    .post('/postNew', (req, res) => {
        res.send('post')
    })

    .put('/update', (req, res) => {

    })

    .listen(3000, () => {
        console.log('listening on port 3000')
    })