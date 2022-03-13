import  express from "express";
import auth from "basic-auth";
import bcrypt from 'bcrypt';

export default class StudentController{

     constructor(studentServices,app){

         this.studentServices = studentServices;

         this.route = express.Router();

         app.use("/api/v1/students", this.route);

         this.getAll();
         this.getStudentByEmail();
         this.getById();
         this.create();
         this.delete();
         this.update();
         this.login();

         this.catchErr();
     }


    getAll= async ()=>{

         this.route.get("/", async (req,res,next)=>{
             try{

                let obj = await this.studentServices.getAll();

                res.status(200).json(obj);

             }catch(e){
                 next(e);
             }
             
         });

    }

    getById= async()=>{
        this.route.get("/:id", async (req,res,next)=>{
            try{
                let {id}= req.params;

                let obj = await this.studentServices.getById(id);

                res.status(200).json(obj);

            }catch(e){
                next(e);
            }

         });
    }

    getStudentByEmail = async()=>{
        this.route.get("/email/:email", async (req,res,next)=>{
            try{
                let {email}= req.params;

                let obj = await this.studentServices.getStudentByEmail(email);

                res.status(200).json(obj);

            }catch(e){
                next(e);
            }

         });
    }

    create = async()=>{
        this.route.post("/",async(req,res,next)=>{
            try{
                let obj = req.body;

                await this.studentServices.create(obj);

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
                await this.studentServices.delete(id);

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
                
                await this.studentServices.update(id,user);

                res.status(204).end();
                
            }catch(e){
                next(e);
            }
        });
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

    authentificate = async (req,res,next)=>{

        let message="";
        
        const credentials=auth(req);

        if(credentials){

            const user = await this.studentServices.getStudentByEmail(credentials.name);

            if(user){
                const authentificate=bcrypt.compareSync(credentials.pass,user.confirmedPassword);

                if(authentificate){

                    console.log("autentificat")
                    req.currentUser = user;
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
            res.status(401).json({message:'Acces denied'})
        }else{
            next();
        }

        


    }

    login = async(req,res,next)=>{
        this.route.post("/login", async(req,res,next)=>{
            try{

                let obj = req.body;

                let rez = await this.studentServices.login(obj);

                res.status(200).json(rez);
                
            }catch(e){
                next(e);
            }
        });
    }




  
}

