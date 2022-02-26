import fs from "fs"
import path from "path";

import { Sequelize } from "sequelize";
import Course from "../model/course.js";
import Student from "../model/student.js";

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

              return db;
              
            }catch(e){
              throw new  Error(e);
            }
        }

};