import dotenv from 'dotenv'
import { Sequelize, DataTypes, Model } from "sequelize"

dotenv.config()
const { HOST, USER, PASSWORD, DATABASE, PORT_DATABASE_CONNECTION, SSL } = process.env

const sequelize = new Sequelize({
    database: DATABASE,
    username: USER,
    password: PASSWORD,
    host: HOST,
    port: +PORT_DATABASE_CONNECTION!,
    ssl: SSL === 'REQUIRED' ? true : false,
    dialect: 'mysql'
})

export default class Badge extends Model {}

Badge.init(
    {
        id_badge:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        imagem_mb:{
            type: DataTypes.CHAR(70),
            allowNull: false,
            unique: true
        },
        desc_certificacao:{
            type: DataTypes.CHAR(300),
            allowNull: false
        },
        criador:{
            type: DataTypes.CHAR(70),
            allowNull: false
        }        
    },
    {
        sequelize,
        modelName: 'Badge',
        tableName: 'badge',
        timestamps: false
    }
)