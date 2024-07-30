import BadgeModel from '../models/BadgeModel';
import { Op } from 'sequelize';

export const createBadge = async (data: any) => {
    return await BadgeModel.create(data);
};

export const findBadges = async (pesquisa: string) => {
    return await BadgeModel.findAll({
        where: {
            [Op.or]: [
                { id_badge: pesquisa },
                { criador: pesquisa }
            ]
        }
    });
};

export const updateBadge = async (id_badge: string, data: any) => {
    return await BadgeModel.update(data, { where: { id_badge } });
};

export const deleteBadge = async (id_badge: string) => {
    return await BadgeModel.destroy({ where: { id_badge } });
};
