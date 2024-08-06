import { Button, Container, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const UpdateEasyQuestions = () => {
    const [question, setQuestion] = useState('');
    const [answers, setAnswers] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState('');
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (id) {
            // Fetch existing question details to populate the form
            const fetchQuestion = async () => {
                const res = await fetch(`/api/easy/${id}`);
                const data = await res.json();
                setQuestion(data.question);
                setAnswers(data.answers);
                setCorrectAnswer(data.correct_answer);
            };

            fetchQuestion();
        }
    }, [id]);

    const handleUpdate = async () => {
        if (!question.trim() || answers.length === 0 || !correctAnswer.trim()) {
            alert('Please fill in all fields and provide answers.');
            return;
        }

        const response = await fetch(`/api/easy/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question, answers, correct_answer: correctAnswer }),
        });

        if (response.ok) {
            router.push('/questions');
        } else {
            alert('Failed to update question.');
        }
    };

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Update Question {id}</h1>
            <Container>
                <TextField
                    label="Question"
                    variant="outlined"
                    fullWidth
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    margin="normal"
                />
                <TextField
                    label="Correct Answer"
                    variant="outlined"
                    fullWidth
                    value={correctAnswer}
                    onChange={(e) => setCorrectAnswer(e.target.value)}
                    margin="normal"
                />
                <TextField
                    label="Answers (comma-separated)"
                    variant="outlined"
                    fullWidth
                    value={answers.join(', ')}
                    onChange={(e) => setAnswers(e.target.value.split(',').map(ans => ans.trim()))}
                    margin="normal"
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpdate}
                    sx={{ marginBottom: 3 }}
                >
                    Update Question
                </Button>
            </Container>
        </div>
    );
};

export default UpdateEasyQuestions;
