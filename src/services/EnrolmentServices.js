
export default class EnrolmentService{
      
    constructor({Enrolment},{sequelize}){
          this.enrolment = Enrolment;
          this.sequelize = sequelize;
    }

    getAll= async ()=>{
          
      try{
        let obj = await this.enrolment.findAll();
     

        if(obj.length == 0){
            throw new Error("Nu exista enrolment in baza de date!");
        }
 
        return obj;
          
      }catch(e){
        throw new Error(e);
      }

    }

    getById = async(id)=>{
        let obj = await this.enrolment.findByPk(id);
        
        if(!obj){
            throw new Error("Nu exista enrolment cu acest id!");
        }
        return obj;

    }

    create= async(newObj)=>{

        if(newObj.student_id == null || newObj.course_id == null){
            throw new Error("Propietati invalide!");
        }
        if(!newObj.student_id){
            throw new Error('Campul student_id este gol!');
        }
        else if(!newObj.course_id){
            throw new Error('Campul course_id este gol!');
        }
        else{
            await this.enrolment.create(newObj);
        }

    }


    delete=async(id)=>{
        let obj = await this.getById(id);
                
        if(obj){
            await obj.destroy();
        }else{
            throw new Error("Nu s-a gasit enrolment cu acest ID pentru a putea fii stears!");
        }
    }

    update= async(id, user)=>{
        let obj = await this.getById(id);

        if(user.student_id == '' && user.course_id=='' ){
            throw new Error("Nu exista propietati pentru update!");
        }
        if(obj){

            if(user.student_id){
                obj.student_id = user.student_id;
            }
            if(user.course_id){
                obj.course_id = user.course_id;
            }

            await obj.save();

        }else{
            throw new Error(`Nu s-a gasit enrolment cu acest ID pentru a putea face Update!`);
        }
    }




}