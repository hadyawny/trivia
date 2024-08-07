import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import QuestionCard from '../../../components/questionsCard.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { scoreAction, calculateScore, resetScore } from '../../../redux/store/slices/scoreSlice';
import { CircularProgress, Snackbar, Alert, Stack, Button } from '@mui/material';

const Questions = () => {
    const router = useRouter();
    const { query } = router;
    const { difficulty } = query;
    const [questions, setQuestions] = useState([]);
    const [randomQuestions, setRandomQuestions] = useState([]);
    const dispatch = useDispatch();
    const selectedAnswers = useSelector(state => state.score.selectedAnswers);
    const score = useSelector(state => state.score.score);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        if (!difficulty) return;

        const fetchQuestions = async () => {
            const res = await fetch(`/api/${difficulty}`);
            const data = await res.json();
            setQuestions(data);
        };

        fetchQuestions();
    }, [difficulty]);

    useEffect(() => {
        if (questions.length > 0) {
            const getRandomQuestions = () => {
                const shuffled = [...questions].sort(() => 0.5 - Math.random());
                const selected = shuffled.slice(0, 10);
                setRandomQuestions(selected);
            };

            getRandomQuestions();
        }
    }, [questions]);

    useEffect(() => {
        if (showAlert) {
            setShowAlert(true);
        }
    }, [score, showAlert]);

    const handleAnswerClick = (answer, questionId) => {
        dispatch(scoreAction({ answer, questionId }));
    };

    const calculateScoreHandler = () => {
        dispatch(calculateScore({ questions: randomQuestions }));
        setShowAlert(true);
    };

    const handleCloseSnackbar = () => {
        setShowAlert(false);
    };

    const handlePlayAgain = async () => {
        window.scrollTo(0, 0);
        
        dispatch(resetScore());
    
        const res = await fetch(`/api/${difficulty}`);
        const data = await res.json();
        setQuestions(data);
    };

    const handleGoHome = () => {
        dispatch(resetScore());
        router.push("/");
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px',
            }}
        >
            <h1>Difficulty {difficulty}</h1>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                }}
            >
                {randomQuestions.length > 0 ? (
                    randomQuestions.map((q) => (
                        <QuestionCard
                            key={q.id}
                            question={q.question}
                            answers={q.answers}
                            questionId={q.id}
                            correctAnswer={q.correct_answer}
                            selectedAnswer={selectedAnswers[q.id]}
                            onAnswerClick={(answer) => handleAnswerClick(answer, q.id)}
                        />
                    ))
                ) : (
                    <CircularProgress size={24}/>                
                )}
            </div>
            <button
                variant="contained"
                color="primary"
                onClick={calculateScoreHandler}
                style={{ marginTop: '20px' }}
            >
                Submit
            </button>
            <Stack direction="row" spacing={2} marginTop={2}>
                <button
                    variant="outlined"
                    color="secondary"
                    onClick={handlePlayAgain}
                >
                    Play Again
                </button>
                <button
                    variant="outlined"
                    color="default"
                    onClick={handleGoHome}
                >
                    Go Home
                </button>
            </Stack>
            <Snackbar 
                open={showAlert} 
                autoHideDuration={6000} 
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    Your score is {score}/{randomQuestions.length}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Questions;
