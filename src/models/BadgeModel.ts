import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class BadgeModel extends Model {}

BadgeModel.init({
    id_badge: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    imagem_mb: {
        type: DataTypes.STRING(70),
        allowNull: false,
        unique: true,
    },
    desc_certificacao: {
        type: DataTypes.STRING(300),
        allowNull: false,
    },
    criador: {
        type: DataTypes.STRING(70),
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'BadgeModel',
    tableName: 'badge',
    timestamps: false,
});

export default BadgeModel;
