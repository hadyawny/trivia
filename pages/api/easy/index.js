import { v4 as uuidv4 } from 'uuid'; 
import { easy } from "../../../data/easy.js";

export default function handler(req, res) {
    if (req.method === "GET") {
        res.status(200).json(easy);
    } else if (req.method === "POST") {
        const { question, answers, correct_answer } = req.body;
        if (!question || !answers || !correct_answer) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const newQuestion = { 
            id: uuidv4(), 
            question, 
            answers, 
            correct_answer 
        };
        easy.push(newQuestion);
        res.status(200).json(easy);
    } 
    
}
