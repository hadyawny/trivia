import { createSlice } from '@reduxjs/toolkit';

const scoreSlice = createSlice({
  name: 'score',
  initialState: {
    score: 0,
    selectedAnswers: {},
  },
  reducers: {
    scoreAction: (state, action) => {
      const { answer, questionId } = action.payload;
      state.selectedAnswers[questionId] = answer;
      console.log(`Selected answer for question ${questionId}: ${answer}`);
    },
    calculateScore: (state, action) => {
      const { questions } = action.payload;
      let score = 0;
      questions.forEach((q) => {
        console.log(`Correct answer for question ${q.id}: ${q.correct_answer}`);
        console.log(`Selected answer for question ${q.id}: ${state.selectedAnswers[q.id]}`);
        if (state.selectedAnswers[q.id] === q.correct_answer) {
          score += 1;
        }
      });
      state.score = score;
      console.log(`Calculated score: ${score}`);
    },
  },
});

export const { scoreAction, calculateScore } = scoreSlice.actions;
export default scoreSlice.reducer;
