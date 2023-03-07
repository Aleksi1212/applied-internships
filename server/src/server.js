'use strict';

import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import { getAdmin, invalidateAuthToken, getAll, addNewInternship, updateInternship } from './datalayer/querys.mjs'
import authenticateToken from './middleware.mjs';

const app = express()
dotenv.config()

app.use(cors())
app.use(express.json())

app
    .get('/', (req, res) => {
        res.json({ message: 'server running' })
    })

    .get('/getAll', async (req, res) => {

        const getAll_Internships = await getAll('', false)
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
            const accessToken = jwt.sign({ username: adminLogIn.data[0].username, password: adminLogIn.data[0].userPassword }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' })
            res.status(200).json(accessToken)
            
        } catch(err) {
            res.json('error')
        }
    })

    .get('/checkToken', authenticateToken, (req, res) => {
        res.json(res.user)
    })

    .post('/invalidateToken', async (req, res) => {
        const invalidateToken = await invalidateAuthToken(req.body.token)
        res.json(invalidateToken)
    })

    .post('/postNew', authenticateToken, (req, res) => {
        res.json(req.user)
    })

    .put('/update', authenticateToken, (req, res) => {

    })

    .listen(3000, () => {
        console.log('listening on port 3000')
    })