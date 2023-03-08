'use strict';

import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import { getAdmin, getAll, addNewInternship, updateInternship } from './datalayer/querys.mjs'
import authenticateToken from './middleware.mjs';

const app = express()
dotenv.config()

const whitelist = ['http://localhost:5173']
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by cors'))
        }
    }
}

app.use(cors(corsOptions))
app.use(express.json())

app
    .get('/', (req, res) => {
        res.json({ message: 'server running' })
    })

    .get('/getAll', async (req, res) => {
        const getAll_Internships = await getAll('company', true)
        res.json(getAll_Internships)

    })

    .get('/inOrder/:orderBy', async (req, res) => {
        const getAll_Internships_InOrder = await getAll(req.params.orderBy, true)
        res.json(getAll_Internships_InOrder)
    })

    .post('/logIn', async (req, res) => {
        try {
            const { adminName, adminPassword } = req.body
    
            const adminLogIn = await getAdmin(adminName, adminPassword)
            const accessToken = jwt.sign({ username: adminLogIn.data[0].username, password: adminLogIn.data[0].userPassword }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2h' })
            res.status(200).json({ token: accessToken, type: 'success' })
            
        } catch(err) {
            res.status(401).json({ token: 'none', type: 'error' })
        }
    })

    .get('/checkToken', authenticateToken, (req, res) => {
        res.json(req.user)
    })

    .post('/postNew', authenticateToken, async (req, res) => {
        try {
            const { companyName, appliedDate } = req.body
            const addInternship = await addNewInternship(companyName, appliedDate, req.user.type === 'error' ? false : true)

            res.status(200).json(addInternship)

        } catch(err) {
            res.status(400).json({ message: 'Bad request', type: 'error' })
        }
    })

    .put('/update', authenticateToken, (req, res) => {

    })

    .listen(3000, () => {
        console.log('listening on port 3000')
    })