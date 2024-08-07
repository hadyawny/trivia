import React from 'react';
import { Card, CardContent, Typography, Button, Grid, Stack, Box } from '@mui/material';

const QuestionCardView = React.memo(function QuestionCardView({ id, question, answers, onUpdate, onDelete }) {
  return (
    <Card sx={{ width: '100%', marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          <strong>Question ID: {id}</strong>
        </Typography>
        <Typography variant="h6" component="div" mt={1}>
          {question}
        </Typography>
        <Grid container spacing={2} mt={2}>
          {answers?.map((answer, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Button variant="outlined" fullWidth>
                {answer}
              </Button>
            </Grid>
          ))}
        </Grid>
        <Box mt={2}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => onUpdate(id)}
              fullWidth
            >
              Update
            </Button>
            <Button 
              variant="contained" 
              color="error" 
              onClick={() => onDelete(id)}
              fullWidth
            >
              Delete
            </Button>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
});

QuestionCardView.displayName = 'QuestionCardView';

export default QuestionCardView;
