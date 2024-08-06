import React, { useState } from "react";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";

const QuestionCard = ({ question, answers, selectedAnswer, onAnswerClick }) => {
  return (
    <Card sx={{ width: "30vw", marginBottom: 10 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {question}
        </Typography>
        <Grid container spacing={2} marginTop={2}>
          {answers.map((answer, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Button
                variant="contained"
                style={{
                  backgroundColor: selectedAnswer === answer ? "#009688" : "#3f51b5",
                }}
                fullWidth
                onClick={() => onAnswerClick(answer)}
              >
                {answer}
              </Button>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
