
import { pollsSchema } from "../models/pollsModel.js";


export function pollsSchemaValidation(req, res, next){
    const poll = req.body;
    const { title } = req.body
   
  
    const { error } = pollsSchema.validate(poll, { abortEarly: false});

    if(error){
        const errors = error.details.map((detail) => detail.message);
        return res.status(400).send(errors);
    }
    if(!title){
        return res.status(422).send("Título não pode ser vazio");
    }

    res.locals.poll = poll;
    next();

}