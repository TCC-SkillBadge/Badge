import BadgeModel from '../models/BadgeModel';
import { Op } from 'sequelize';

export const createBadge = async (data: any) => {
    return await BadgeModel.create(data);
};

export const findBadges = async (pesquisa: string) => {
    console.log(`Procurando badge com critério: ${pesquisa}`);
    const badges = await BadgeModel.findAll({
        where: {
            [Op.or]: [
                { id_badge: pesquisa },
                { criador: pesquisa }
            ],
            [Op.and]: [
                { inactivatedDate: null }
            ]
        }
    });
    console.log('Resultado da pesquisa de badges:', badges);
    return badges;
};

export const updateBadge = async (id_badge: number, data: any) => {
    return await BadgeModel.update(data, { where: { id_badge } });
};

export const deleteBadge = async (id_badge: number, data: any) => {
    return await BadgeModel.update(data, { where: { id_badge } });
};
