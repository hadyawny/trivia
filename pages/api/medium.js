import { medium } from "../../data/medium.js";
export default function handler(req,res){
    if (req.method==="GET")
    res.status(200).json(medium)

    
// else if (req.method==="POST"){
//     const {comment}=req.body;
//     const newComment={id:uuid(),text:comment}
//     // comments=[...comments,newComment]
//     comments.push(newComment)
//     res.status(200).json(comments)
    
// }

}