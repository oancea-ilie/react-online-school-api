import fs from "fs"
import path from "path";

import { Sequelize } from "sequelize";
import Course from "../model/course.js";
import Student from "../model/student.js";
import Enrolment from "../model/enrolment.js";
export default  class Repository {
      
        config =()=>  new Promise((resolve,reject)=>{
            fs.readFile(path.normalize("src\\config\\config.json"),'utf8',(err,data)=>{
                if(err){
                    reject(err);
                }else{
                    const {development} = JSON.parse(data);
                    resolve(development);
                }
            });
        });

        createDb= async()=>{
            try{
               let development = await this.config();
      
               let sequelize = new Sequelize(development.database, development.username, development.password, {
                  host: development.host,
                     dialect: development.dialect
                });
  
              let db={
                models:{}
              }

              db.sequelize = sequelize;
              db.Sequelize = Sequelize;
              db.models.Course = Course(sequelize);
              db.models.Student = Student(sequelize);
              db.models.Enrolment = Enrolment(sequelize);

              db.models.Student.hasMany(db.models.Enrolment,{
                  onDelete: 'CASCADE',
                  as:'stundentHasManyEnrolments',
                  foreignKey:{
                    fieldName:'student_id',
                    allowNull:false
                  },
              });

              db.models.Enrolment.belongsTo(db.models.Student,{
                as:'stundentHasManyEnrolments',
                foreignKey:{
                  fieldName:'student_id',
                  allowNull:false
                },
              });




              db.models.Student.hasMany(db.models.Course,{
                onDelete: 'CASCADE',
                as:'stundentHasManyCourses',
                foreignKey:{
                  fieldName:'created_by',
                  allowNull:false
                },
            });

            db.models.Course.belongsTo(db.models.Student,{
              as:'stundentHasManyCourses',
              foreignKey:{
                fieldName:'created_by',
                allowNull:false
              },
            });




            db.models.Course.hasMany(db.models.Enrolment,{
                onDelete: 'CASCADE',
                as:'courseHasManyEnrolments',
                foreignKey:{
                  fieldName:'course_id',
                  allowNull:false
                },
            });

            db.models.Enrolment.belongsTo(db.models.Course,{
              as:'courseHasManyEnrolments',
              foreignKey:{
                fieldName:'course_id',
                allowNull:false
              },
            });

              return db;
              
            }catch(e){
              throw new  Error(e);
            }
        }

};