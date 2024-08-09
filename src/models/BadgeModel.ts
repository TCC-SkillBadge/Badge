import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class BadgeModel extends Model { }

BadgeModel.init({
    id_badge: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    institution: {
        type: DataTypes.STRING(70),
        allowNull: false,
    },
    image_url: {
        type: DataTypes.STRING(70),
        allowNull: false,
        unique: true,
    },
    name_badge: {
        type: DataTypes.STRING(70),
        allowNull: false,
    },
    desc_badge: {
        type: DataTypes.STRING(300),
        allowNull: false,
    },
    validity_badge: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    status_badge: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    createdDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    createdUser: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    updatedDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    updatedUser: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    inactivatedDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    inactivatedUser: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    sequelize,
    modelName: 'BadgeModel',
    tableName: 'badge',
    timestamps: false,
});

export default BadgeModel;
