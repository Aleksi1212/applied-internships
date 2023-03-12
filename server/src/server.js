'use strict';

import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import { getAdmin, invalidateToken, checkTokenValidity } from './datalayer/querys/authentication.mjs';
import { getAll, addNewInternship, updateInternship } from './datalayer/querys/internshipQuerys.mjs';

import authenticateToken from './middleware.mjs';

const app = express()
dotenv.config()

const whitelist = ['http://localhost:5173']
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== 1 || !origin) {
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

    .get('/getAll/:orderBy', async (req, res) => {
        try {
            const values = req.params.orderBy.split('=')
            const getAll_Internships = await getAll(values[0], values[1])

            res.status(200).json(getAll_Internships)
        } catch(err) {
            res.status(400).json([{ id: 0, company: 'error', application_status: 'error', applied_date: 'error', accepted_rejected_date: 'error' }])
        }
    })


    .post('/logIn', async (req, res) => {
        try {
            const { adminName, adminPassword } = req.body || {}
    
            const adminLogIn = await getAdmin(adminName, adminPassword)
            const accessToken = jwt.sign({ username: adminLogIn.data[0].username, password: adminLogIn.data[0].userPassword }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' })

            res.status(200).json({ token: accessToken, type: 'success' })
            
        } catch(err) {
            res.status(401).json({token: 'error', type: 'error' })
        }
    })

    .post('/logOut', async (req, res) => {
        try {
            const invalidate_token = await invalidateToken(req.body.token)
            res.status(200).json(invalidate_token)

        } catch(err) {
            res.status(400).json({ message: 'bad request', type: 'error' })
        }
    })

    .get('/checkToken', authenticateToken, (req, res) => {
        res.json(req.user)
    })


    .post('/postNew', authenticateToken, async (req, res) => {
        try {
            const { companyName, appliedDate } = req.body || {}
            const checkToken = await checkTokenValidity(req.user.token)

            const addInternship = await addNewInternship(
                companyName, appliedDate,
                req.user.type === 'error' || !checkToken.tokenValid ? false : true
            )

            res.status(200).json(addInternship)

        } catch(err) {
            res.status(400).json({ message: 'Bad request', type: 'error' })
        }
    })

    .put('/update', authenticateToken, async (req, res) => {
        try {
            const { companyId, companyStatus, accepted_rejected_date } = req.body || {}
            const checkToken = await checkTokenValidity(req.user.token)
            
            const editInternsipStatus = await updateInternship(
                companyId, companyStatus, accepted_rejected_date,
                req.user.type === 'error' || !checkToken.tokenValid ? false : true
            )

            res.status(200).json(editInternsipStatus)

        } catch(err) {
            res.status(400).json({ message: 'Bad request', type: 'error' })
        }
    })

    .listen(3000, () => {
        console.log('listening on port 3000')
    })