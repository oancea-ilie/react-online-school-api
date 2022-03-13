import { DataTypes, Sequelize } from "sequelize";

import bcrypt from "bcrypt"
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
            unique: true

        },

        password:{
            type:DataTypes.VIRTUAL,
            allowNull: false,
            validate: {
                notNull:{
                    msg: 'password can not be null!'
                },
                notEmpty:{
                    msg:'password can not be empty!'
                },
            },
        },
        
        confirmedPassword:{
            allowNull: false,
            type:DataTypes.STRING,
            set(val){
                if(val==this.password){
                    const hashPassword=bcrypt.hashSync(val,10);
                    this.setDataValue('confirmedPassword',hashPassword);
                }
            },
            validate:{
                notNull:{
                    msg:'Both password must match'
                }
            }
        }
        
    },{
        sequelize,
        timestamps:false,
        createdAt:false,
        updatedAt:false,
    });

    return Student;
};