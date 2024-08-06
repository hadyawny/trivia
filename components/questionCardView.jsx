import React from 'react';
import { Card, CardContent, Typography, Button, Grid, Stack } from '@mui/material';

const QuestionCardView = React.memo(function QuestionCardView({ id, question, answers, onUpdate, onDelete }) {
  return (
    <Card sx={{ width: '100%', marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          <strong>Question ID: {id}</strong>
        </Typography>
        <Typography variant="h6" component="div" marginTop={1}>
          {question}
        </Typography>
        <Grid container spacing={2} marginTop={2}>
          {answers?.map((answer, index) => (
            <Grid item xs={12} key={index}>
              <Button variant="outlined" fullWidth>
                {answer}
              </Button>
            </Grid>
          ))}
        </Grid>
        <Stack direction="row" spacing={2} marginTop={2}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => onUpdate(id)}
          >
            Update
          </Button>
          <Button 
            variant="contained" 
            color="error" 
            onClick={() => onDelete(id)}
          >
            Delete
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
});

QuestionCardView.displayName = 'QuestionCardView';

export default QuestionCardView;
