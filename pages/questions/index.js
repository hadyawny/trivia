import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Stack,
  TextField,
} from "@mui/material";
import QuestionCardView from "../../components/questionCardView";
import { useRouter } from "next/router";
import { getSession, signIn } from "next-auth/react";

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    async function testSession() {
      const session = await getSession();
      if (session) {
        setLoading(false);
      } else {
        signIn();
      }
    }
    testSession();

    const fetchQuestions = async () => {
      const res = await fetch("/api/easy");
      const data = await res.json();
      setQuestions(data);
    };

    fetchQuestions();
  }, []);

  const handlePost = async () => {
    if (!question.trim() || answers.length === 0 || !correctAnswer.trim()) {
      alert("Please fill in all fields and provide answers.");
      return;
    }

    const response = await fetch("/api/easy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question,
        answers,
        correct_answer: correctAnswer,
      }),
    });

    const data = await response.json();
    setQuestions(data);
    setQuestion("");
    setAnswers([]);
    setCorrectAnswer("");
  };

  const handleUpdate = useCallback(
    (id) => {
      router.push(`/questions/updateEasy/${id}`);
    },
    [router]
  );

  const handleDelete = useCallback((id) => {
    fetch(`/api/easy/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }, []);

  if (loading) return <CircularProgress size={24} />;

  return (
    <Container>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        marginBottom={3}
      >
        <h1>All Easy Questions</h1>
      </Stack>
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
        value={answers.join(", ")}
        onChange={(e) =>
          setAnswers(e.target.value.split(",").map((ans) => ans.trim()))
        }
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handlePost}
        sx={{ marginBottom: 3 }}
      >
        Add Question
      </Button>
      <Grid container spacing={4}>
        {questions.length > 0 ? (
          questions.map((q) => (
            <Grid item xs={12} sm={6} md={4} key={q?.id}>
              <QuestionCardView
                id={q?.id}
                question={q?.question}
                answers={q?.answers}
                correct_answer={q?.correct_answer}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
              />
            </Grid>
          ))
        ) : (
          <CircularProgress size={24} />
        )}
      </Grid>
    </Container>
  );
};

export default Questions;
