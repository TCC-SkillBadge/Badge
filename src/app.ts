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
    try{
        const novaBadge = await Badge.create({ imagem_mb, desc_certificacao, criador })
        if(novaBadge){
            res.status(201).send('Badge cadastrada com sucesso')
        }
        else{
            res.status(503).send()
        }
    }
    catch(err: any){
        console.error("Erro no Badge.create()", err)
        switch(err.errors[0].type){
            case 'unique violation':
                res.status(409).send()
                break
            default:
                res.status(503).send()
        }
    }
})

app.listen(PORT, () => console.log(`Badge. Executando na porta ${PORT}`))