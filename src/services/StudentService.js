import bcrypt from 'bcrypt';

export default class StudentService{
      
    constructor({Student},{sequelize}){
          this.student = Student;
          this.sequelize = sequelize;
    }

    getAll= async ()=>{
          
      try{
        let obj = await this.student.findAll();
     

        if(obj.length == 0){
            throw new Error("Nu exista studenti in baza de date!");
        }
 
        return obj;
          
      }catch(e){
        throw new Error(e);
      }

    }

    getById = async(id)=>{
        let obj = await this.student.findByPk(id);
        
        if(!obj){
            throw new Error("Nu exista studenti cu acest id!");
        }
        return obj;

    }

    getStudentByEmail = async(email)=>{
        let all = await this.student.findAll();

        if(!all){
            throw new Error("Nu exista studenti in baza de date !");
        }else{
            for(let e of all){
                if(e.email == email){
                    return e;
                }
            }
        }
    }

    create= async(newObj)=>{
        
        let allObj = await this.student.findAll();

        if(newObj.firstName == null || newObj.lastName == null || newObj.email == null || newObj.password == null){
            throw new Error("Propietati invalide!");
        }
        if(!newObj.firstName){
            throw new Error('Campul name este gol!');
        }
        else if(!newObj.lastName){
            throw new Error('Campul description este gol!');
        }
        else if(!newObj.email){
            throw new Error('Campul time este gol!');
        }
        else if(!newObj.password){
            throw new Error('Campul materials este gol!');
        }
        else{
            if(allObj){
                for(let p of allObj){
                    if(p.email == newObj.email){
                        throw new Error("Acest Email exista deja in baza de date!");
                    }
                }
            }

            await this.student.create(newObj);

        }

    }

    delete=async(id)=>{
        let obj = await this.getById(id);
                
        if(obj){
            await obj.destroy();
        }else{
            throw new Error("Nu s-a gasit Student cu acest ID pentru a putea fii stearsa!");
        }
    }

    update= async(id, user)=>{
        let obj = await this.getById(id);

        if(user.firstName == '' && user.lastName=='' && user.email == '' && user.password == ''){
            throw new Error("Nu exista propietati pentru update!");
        }
        if(obj){

            if(user.firstName){
                obj.firstName = user.firstName;
            }
            if(user.lastName){
                obj.lastName = user.lastName;
            }
            if(user.email){
                obj.email = user.email;
            }
            if(user.password){
                obj.password = user.password;
            }

            await obj.save();

        }else{
            throw new Error(`Nu s-a gasit Student cu acest ID pentru a putea face Update!`);
        }
    }

    login = async(obj)=>{
        let all = await this.student.findAll();

        if(all.length == 0){
            throw new Error("Nu exista studenti in baza de date!");
        }
        else{
            for(let e of all){
                let authentificate = bcrypt.compareSync(obj.password,e.confirmedPassword);
                if(authentificate && e.email == obj.email){
                    return {message:"success"};
                }
            }
            return {message:"failed"};
        }
    }


}