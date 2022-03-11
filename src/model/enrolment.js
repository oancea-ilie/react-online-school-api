import { Sequelize } from "sequelize";

export default (sequelize)=>{

    class Enrolment extends Sequelize.Model{}

    Enrolment.init({
        id:{
            type:Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement:true
        },
        
    },{
        sequelize,
        timestamps:false,
        createdAt:false,
        updatedAt:false,
    });

    return Enrolment;
};