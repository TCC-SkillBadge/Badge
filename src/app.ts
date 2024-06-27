import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
import axios from 'axios'
import { Op } from 'sequelize'
import Badge from './Badge.DAOclass'

dotenv.config()
const PORT = process.env.PORT

const app = express()
app.use(express.json())
app.use(cors())

app.post('/cadastrar', async (req: any, res: any) => {
    const { imagem_mb, desc_certificacao, criador } = req.body
    try {
        const novaBadge = await Badge.create({ imagem_mb, desc_certificacao, criador })
        if (novaBadge) {
            res.status(201).send('Badge cadastrada com sucesso')
        }
        else {
            res.status(503).send()
        }
    }
    catch (err: any) {
        console.error("Erro no Badge.create()", err)
        switch (err.errors[0].type) {
            case 'unique violation':
                res.status(409).send()
                break
            default:
                res.status(503).send()
        }
    }
})

app.get('/consultar', async (req: any, res: any) => {
    const { pesquisa } = req.query
    try {
        const badge = await Badge.findAll({
            where: {
                [Op.or]: [
                    { id_badge: pesquisa },
                    { criador: pesquisa }
                ]
            }
        })
        if (badge) {
            res.status(200).json(badge)
        }
        else {
            res.status(404).send()
        }
    }
    catch (err) {
        console.error("Erro na operação 'Consultar' no serviço de Badge", err)
        res.status(503).send()
    }
})

app.post('/atualizar', async (req: any, res: any) => {
    const { id_badge, imagem_mb, desc_certificacao, criador } = req.body
    try {
        const badge = await Badge.update({ imagem_mb, desc_certificacao, criador }, { where: { id_badge } })
        if (badge) {
            res.status(201).send('Badge atualizada com sucesso')
        }
        else {
            res.status(503).send()
        }
    }
    catch (err: any) {
        console.error("Erro no Badge.update()", err)
        switch (err.errors[0].type) {
            case 'unique violation':
                res.status(409).send()
                break
            default:
                res.status(503).send()
        }
    }
})

app.post('/excluir', async (req: any, res: any) => {
    const { id_badge } = req.body
    try {
        const cont = await Badge.destroy({ where: { id_badge } })
        if (cont > 0) {
            res.status(201).send('Badge excluída com sucesso')
        }
        else {
            res.status(503).send()
        }
    }
    catch (err: any) {
        console.error("Erro no Badge.destroy()", err)
        switch (err.errors[0].type) {
            // case 'unique violation':
            //     res.status(409).send()
            //     break
            default:
                res.status(503).send()
        }
    }
})

app.listen(PORT, () => console.log(`Badge. Executando na porta ${PORT}`))