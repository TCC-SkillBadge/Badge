import { Request, Response } from 'express';
import { createBadge, findBadges, updateBadge, deleteBadge } from '../services/BadgeService';
import { ErroInternoServidor, ServicoIndisponivel, BadgeNaoEncontrada, ViolacaoUnique } from '../utils/ErrorList';

export const cadastrarBadge = async (req: Request, res: Response) => {
    const { imagem_mb, desc_certificacao, criador } = req.body;
    try {
        const novaBadge = await createBadge({ imagem_mb, desc_certificacao, criador });
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
    const { id_badge, imagem_mb, desc_certificacao, criador } = req.body;
    try {
        const resultado = await updateBadge(id_badge, { imagem_mb, desc_certificacao, criador });
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
    const { id_badge } = req.body;
    try {
        const resultado = await deleteBadge(id_badge);
        if (resultado > 0) {
            res.status(200).send('Badge excluída com sucesso');
        } else {
            res.status(404).send(new BadgeNaoEncontrada());
        }
    } catch (err) {
        console.error("Erro no Badge.destroy()", err);
        res.status(503).send(new ServicoIndisponivel());
    }
};
