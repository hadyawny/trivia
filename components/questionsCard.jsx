import React from 'react';
import { Card, CardContent, Typography, Button, Grid, Stack, Box } from '@mui/material';

const QuestionCard = ({ question, answers, selectedAnswer, onAnswerClick }) => {
  return (
    <Card sx={{ width: '100%', marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {question}
        </Typography>
        <Grid container spacing={2} marginTop={2}>
          {answers.map((answer, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: selectedAnswer === answer ? '#009688' : '#3f51b5',
                }}
                onClick={() => onAnswerClick(answer)}
              >
                {answer}
              </Button>
            </Grid>
          ))}
        </Grid>
        <Box mt={2}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            {/* Optional additional actions could go here */}
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
