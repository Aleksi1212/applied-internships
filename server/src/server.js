'use strict';

import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import translate from 'translate'

import { getAdmin, setAuthToken } from './datalayer/querys/authentication.mjs';
import { getAll, addNewInternship, updateInternship } from './datalayer/querys/internshipQuerys.mjs';

import authenticateToken from './middleware.mjs';

const app = express()
dotenv.config()

translate.engine = 'deepl'
translate.key = process.env.DEEPL_API_KEY

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

    .put('/translate', async (req, res) => {
        const translateTo = await translate(req.body.text, { from: req.body.from, to: req.body.to })
        res.status(200).json({ text: translateTo })
    })

    .post('/logIn', async (req, res) => {
        try {
            const { adminName, adminPassword } = req.body
    
            const adminLogIn = await getAdmin(adminName, adminPassword)
            const accessToken = jwt.sign({ username: adminLogIn.data[0].username, password: adminLogIn.data[0].userPassword }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20m' })
            const set_AuthToken = await setAuthToken(accessToken)

            res.status(200).json({ token: accessToken, ...set_AuthToken })
            
        } catch(err) {
            res.status(401).json({token: 'none', message: err.message, type: 'error' })
        }
    })

    // .post('/logOut', (req, res) => {
    //     try {
    //         const { token } = req.body

    //         const decodeToken = jwt.decode(token)
    //         const logOutUser = jwt.sign({ username: decodeToken.username, password: decodeToken.password }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10s' })
    //         res.json(logOutUser)
    //     } catch(err) {
    //         res.json('error')
    //     }
    // })

    .get('/getToken', async (req, res) => {
        try {


        } catch(err) {
            res.status(401).json({ token: 'unatuhorized', type: 'error' })
        }
    })

    .get('/checkToken', authenticateToken, (req, res) => {
        res.json(req.user)
    })

    .post('/postNew', authenticateToken, async (req, res) => {
        try {
            const { companyName, appliedDate } = req.body || {}
            const addInternship = await addNewInternship(companyName, appliedDate, req.user.type === 'error' ? false : true)

            res.status(200).json(addInternship)

        } catch(err) {
            res.status(400).json({ message: 'Bad request', type: 'error' })
        }
    })

    .put('/update', authenticateToken, async (req, res) => {
        try {
            const { companyId, companyStatus, accepted_rejected_date } = req.body || {}
            const editInternsipStatus = await updateInternship(companyId, companyStatus, accepted_rejected_date)

            res.status(200).json(editInternsipStatus)

        } catch(err) {
            res.status(400).json({ message: 'Bad request', type: 'error' })
        }
    })

    .listen(3000, () => {
        console.log('listening on port 3000')
    })