import { Sequelize } from "sequelize";

export default (sequelize)=>{

    class Student extends Sequelize.Model{}

    Student.init({
        id:{
            type:Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement:true
        },

        firstName:{
            type:Sequelize.STRING,
            allowNull:false,
            validate: {
                notNull:{
                    msg: 'firstName can not be null!'
                },
                notEmpty:{
                    msg:'firstName can not be empty!'
                },
            },
        },

        lastName:{
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull:{
                    msg: 'lastName can not be null!'
                },
                notEmpty:{
                    msg:'lastName can not be empty!'
                },
            },
        },

        email:{
            type:Sequelize.STRING,
            allowNull:false,
            validate: {
                notNull:{
                    msg: 'email can not be null!'
                },
                notEmpty:{
                    msg:'email can not be empty!'
                },
            },
        },

        password:{
            type:Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull:{
                    msg: 'password can not be null!'
                },
                notEmpty:{
                    msg:'password can not be empty!'
                },
            },
        }
        
    },{
        sequelize,
        timestamps:false,
        createdAt:false,
        updatedAt:false,
    });

    return Student;
};