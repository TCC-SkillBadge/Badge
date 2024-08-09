import { Request, Response } from 'express';
import { createBadge, findBadges, updateBadge, deleteBadge } from '../services/BadgeService';
import { ErroInternoServidor, ServicoIndisponivel, BadgeNaoEncontrada, ViolacaoUnique } from '../utils/ErrorList';
import { v2 as cloudinary } from 'cloudinary';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config(); 

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = (buffer: Buffer, originalname: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        originalname = path.parse(originalname).name;
        const stream = cloudinary.uploader.upload_stream(
            { resource_type: 'image', public_id: originalname },
            (error, result) => {
                if (error || !result) {                    
                    reject(error || new Error('Erro inesperado ao fazer upload da imagem'));
                } else {
                    resolve(result.secure_url);
                }
            }
        );
        stream.end(buffer);
    });
};

export const cadastrarBadge = async (req: Request, res: Response) => {
    const { validity_badge, desc_badge, name_badge, institution, created_user } = req.body;
    const image_badge = req.file?.buffer;
    const originalname = req.file?.originalname;
    try {
        const status_badge = 1;
        const created_date = new Date();
        created_date.setHours(created_date.getHours() - 3);

        let image_url: string | undefined;
        if (image_badge && originalname) {
            try {
                image_url = await uploadToCloudinary(image_badge, originalname);
            } catch (uploadError) {
                console.error("Erro no upload da imagem", uploadError);
                return res.status(500).send('Erro ao fazer upload da imagem');
            }
        }

        const novaBadge = await createBadge({ image_url, validity_badge, desc_badge, name_badge, institution, status_badge, created_date, created_user });
        res.status(201).send('Badge cadastrada com sucesso');
    } catch (err: any) {
        console.error("Erro no Badge.create()", err);
        if (err.name === 'SequelizeUniqueConstraintError') {
            res.status(409).send(new ViolacaoUnique());
        } else {
            res.status(503).send(new ServicoIndisponivel());
        }
    }
};

export const consultarBadge = async (req: Request, res: Response) => {
    const { pesquisa } = req.query;
    try {
        const badges = await findBadges(pesquisa as string);
        if (badges.length > 0) {
            res.status(200).json(badges);
        } else {
            res.status(404).send(new BadgeNaoEncontrada());
        }
    } catch (err) {
        console.error("Erro na operação 'Consultar' no serviço de Badge", err);
        res.status(503).send(new ServicoIndisponivel());
    }
};

export const atualizarBadge = async (req: Request, res: Response) => {
    const { id_badge, validity_badge, desc_badge, name_badge, updated_user } = req.body;
    try {
        const updated_date = new Date();
        updated_date.setHours(updated_date.getHours() - 3);

        const resultado = await updateBadge(id_badge, { validity_badge, desc_badge, name_badge, updated_date, updated_user });
        if (resultado[0] > 0) {
            res.status(200).send('Badge atualizada com sucesso');
        } else {
            res.status(404).send(new BadgeNaoEncontrada());
        }
    } catch (err: any) {
        console.error("Erro no Badge.update()", err);
        if (err.name === 'SequelizeUniqueConstraintError') {
            res.status(409).send(new ViolacaoUnique());
        } else {
            res.status(503).send(new ServicoIndisponivel());
        }
    }
};

export const excluirBadge = async (req: Request, res: Response) => {
    const { id_badge, inactivated_user } = req.body;
    try {
        const inactivated_date = new Date();
        inactivated_date.setHours(inactivated_date.getHours() - 3);

        const resultado = await deleteBadge(id_badge, { inactivated_date, inactivated_user });
        if (resultado[0] > 0) {
            res.status(200).send('Badge excluída com sucesso');
        } else {
            res.status(404).send(new BadgeNaoEncontrada());
        }
    } catch (err) {
        console.error("Erro no Badge.destroy()", err);
        res.status(503).send(new ServicoIndisponivel());
    }
};
