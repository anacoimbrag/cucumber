import express from 'express';
import * as fs from 'node:fs';

import allUsers from './users.json' with { type: "json" };

const app = express();

app.route('/user')
    .get((_, res) => {
        res.json({ status: 'success', users: allUsers });
    })
    .post((req, res) => {
        try {
            const newUser = req.body
            const newList = allUsers.concat(newUser)
            fs.writeFileSync('./users.json', newList)

            res.json({
                status: 'success',
                message: `Usuário adicionado com sucesso!`
            })
        } catch (e) {
            res.status(403).json({
                status: 'error',
                message: `Ocorreu um erro: ${e}`
            })
        }
    })

app.route('/user/:userId')
    .get((req, res) => {
        try {
            const id = req.params.userId
            const user = allUsers[id]
            res.json({ status: 'success', user })
        } catch (e) {
            res.status(404).json({
                status: 'error',
                message: 'Usuário não encontrado'
            })
        }
    })
    .put((req, res) => {
        try {
            const id = req.params.userId
            const user = req.body
            allUsers[id] = user
            fs.writeFileSync('./users.json', allUsers)

            res.json({ status: 'success', message: 'Usuário alterado com sucesso!' })
        } catch (e) {
            res.status(404).json({
                status: 'error',
                message: 'Usuário não encontrado'
            })
        }
    })
    .delete((req, res) => {
        try {
            const id = req.params.userId
            const newList = allUsers.filter((_, index) => index == id)
            fs.writeFileSync('./users.json', newList)

            res.json({ status: 'success', message: 'Usuário removido com sucesso!' })
        } catch (e) {
            res.status(404).json({
                status: 'error',
                message: 'Usuário não encontrado'
            })
        }
    })

app.listen(process.env.PORT, () => {
    console.log(`Escutando porta ${process.env.PORT}...`)
})