import { easy } from "../../../data/easy.js";

export default function handler(req, res) {
    const { id } = req.query;

    // Handle GET request
    if (req.method === 'GET') {
        const question = easy.find(q => q.id.toString() === id);

        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }

        return res.status(200).json(question);
    }

    // Handle DELETE request
    if (req.method === 'DELETE') {
        const index = easy.findIndex(q => q.id.toString() === id);

        if (index === -1) {
            return res.status(404).json({ message: "Question not found" });
        }

        easy.splice(index, 1);
        return res.status(200).json(easy);
    }

    // Handle PUT request
    if (req.method === 'PUT') {
        const index = easy.findIndex(q => q.id.toString() === id);

        if (index === -1) {
            return res.status(404).json({ message: "Question not found" });
        }

        const { question, answers, correct_answer } = req.body;

        if (!question || !answers || !correct_answer) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Update the question
        easy[index] = { id: Number(id), question, answers, correct_answer };
        return res.status(200).json(easy);
    }

    // Handle unsupported methods
    res.setHeader('Allow', ['GET', 'DELETE', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
}
