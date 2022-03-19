import  express from "express";
import auth from "basic-auth";
import bcrypt from 'bcrypt';

export default class CourseController{

     constructor(CourseServices,app, StudentService){

         this.courseServices = CourseServices;
         this.studentServices = StudentService;

         this.route = express.Router();

         app.use("/api/v1/courses", this.route);

         this.getAll();
         this.getById();
         this.create();
         this.delete();
         this.update();

         this.catchErr();
     }


    getAll= async ()=>{

         this.route.get("/",this.authentificate, async (req,res,next)=>{
             try{

                let courses = await this.courseServices.getAll();

                res.status(200).json(courses);

             }catch(e){
                 next(e);
             }
             
         });

    }

    getById= async()=>{
        this.route.get("/:id", this.authentificate, async (req,res,next)=>{
            try{
                let {id}= req.params;

                let course = await this.courseServices.getById(id);

                res.status(200).json(course);

            }catch(e){
                next(e);
            }

         });
    }

    create = async()=>{
        this.route.post("/",async(req,res,next)=>{
            try{
                let course = req.body;

                await this.courseServices.create(course);

                res.status(204).end();
            }catch(e){
                next(e);
            }
        })
    }

    delete = async()=>{
        this.route.delete("/:id", async(req,res,next)=>{
            try{
                let {id} = req.params;
                let obj = await this.courseServices.delete(id);

                res.status(204).end();

            }catch(e){
                next(e);
            }
        });
    }

    update = async()=>{
        this.route.put("/:id", async(req,res,next)=>{
            try{
                let {id} = req.params;
                let user = req.body;
                
                await this.courseServices.update(id,user);

                res.status(204).end();
                
            }catch(e){
                next(e);
            }
        });
    }

    authentificate=async (req,res,next)=>{

        let message="";

        const credentials=auth(req);

        if(credentials){

            const user= await this.studentServices.getStudentByEmail(credentials.name);

            if(user){
                const authentificate = bcrypt.compareSync(credentials.pass,user.confirmedPassword);

                if(authentificate){

                    console.log("autentificat")
                    req.currentUser=user;
                }else{

                    message="Authentification failed"
                }
            }else{
                message= "User not found"
            }
        }else{
            message = "Authentification header not found"
        }


        if(message){
            console.warn(message);
            res.status(401).json({message:'Access denied from authentification'})
        }else{
            next();
        }

    }

    catchErr=async()=>{
        this.route.use((err,req,res,next)=>{
            res.status(err.status || 500);
    
            res.json({
               error:{
                   message:err.message
               }
            });
         });
    }


}

