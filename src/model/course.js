import { Sequelize } from "sequelize";

export default (sequelize)=>{

    class Course extends Sequelize.Model{}

    Course.init({
        id:{
            type:Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement:true
        },

        name:{
            type:Sequelize.STRING,
            allowNull:false,
            validate: {
                notNull:{
                    msg: 'name can not be null!'
                },
                notEmpty:{
                    msg:'name can not be empty!'
                },
            },
        },

        description:{
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull:{
                    msg: 'description can not be null!'
                },
                notEmpty:{
                    msg:'description can not be empty!'
                },
            },
        },

        time:{
            type:Sequelize.TEXT,
            allowNull:false,
            validate: {
                notNull:{
                    msg: 'time can not be null!'
                },
                notEmpty:{
                    msg:'time can not be empty!'
                },
            },
        },

        materials:{
            type:Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull:{
                    msg: 'materials can not be null!'
                },
                notEmpty:{
                    msg:'materials can not be empty!'
                },
            },
        }
        
    },{
        sequelize,
        timestamps:false,
        createdAt:false,
        updatedAt:false,
    });

    return Course;
};