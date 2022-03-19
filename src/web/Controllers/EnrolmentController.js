import  express from "express";

export default class EnrolmentController{

     constructor(EnrolmentServices,app){

         this.enrolmentServices = EnrolmentServices;

         this.route = express.Router();

         app.use("/api/v1/enrolments", this.route);

         this.getAll();
         this.getById();
         this.create();
         this.delete();
         this.update();

         this.catchErr();
     }


     getAll= async ()=>{

         this.route.get("/", this.authentificate, async (req,res,next)=>{
             try{

                let obj = await this.enrolmentServices.getAll();

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

                let obj = await this.enrolmentServices.getById(id);

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

                await this.enrolmentServices.create(obj);

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
                await this.enrolmentServices.delete(id);

                res.status(204).end();

            }catch(e){
                next(e);
            }
        });
    }

    update = async()=>{
        this.route.put("/:id",this.authentificate, async(req,res,next)=>{
            try{
                let {id} = req.params;
                let user = req.body;
                
                await this.enrolmentServices.update(id,user);

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

