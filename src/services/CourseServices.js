
export default class CourseService{
      
    constructor({Course},{sequelize}){
          this.course = Course;
          this.sequelize = sequelize;
    }

    getAll= async ()=>{
          
      try{
        let courses = await this.course.findAll();
     

        if(courses.length == 0){
            throw new Error("Nu exista courses in baza de date!");
        }
 
        return courses;
          
      }catch(e){
        throw new Error(e);
      }

    }

    getById = async(id)=>{
        let course = await this.course.findByPk(id);
        
        if(!course){
            throw new Error("Nu exista course cu acest id!");
        }
        return course;

    }

    create= async(course)=>{
        
        let allCourses = await this.course.findAll();

        if(course.name == null || course.description == null || course.time == null || course.materials == null){
            throw new Error("Propietati invalide!");
        }
        if(!course.name){
            throw new Error('Campul name este gol!');
        }
        else if(!course.description){
            throw new Error('Campul description este gol!');
        }
        else if(!course.time){
            throw new Error('Campul time este gol!');
        }
        else if(!course.materials){
            throw new Error('Campul materials este gol!');
        }
        else{
            if(allCourses){
                for(let p of allCourses){
                    if(p.name == course.name){
                        throw new Error("Acest Curs exista deja in baza de date!");
                    }
                }
            }

            await this.course.create(course);

        }

    }


    delete=async(id)=>{
        let obj = await this.getById(id);
                
        if(obj){
            await obj.destroy();
        }else{
            throw new Error("Nu s-a gasit Course cu acest ID pentru a putea fii stearsa!");
        }
    }

    update= async(id, user)=>{
        let obj = await this.getById(id);

        if(user.name == '' && user.description=='' && user.time == '' && user.materials == ''){
            throw new Error("Nu exista propietati pentru update!");
        }
        if(obj){

            if(user.name){
                obj.name = user.name;
            }
            if(user.description){
                obj.description = user.description;
            }
            if(user.time){
                obj.time = user.time;
            }
            if(user.materials){
                obj.materials = user.materials;
            }

            await obj.save();

        }else{
            throw new Error(`Nu s-a gasit course cu acest ID pentru a putea face Update!`);
        }
    }




}