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
    },
    calculateScore: (state, action) => {
      const { questions } = action.payload;
      let score = 0;
      questions.forEach((q) => {
        if (state.selectedAnswers[q.id] === q.correct_answer) {
          score += 1;
        }
      });
      state.score = score;
    },
    resetScore: (state) => {
      state.score = 0;
      state.selectedAnswers = {};
    },
  },
});

export const { scoreAction, calculateScore, resetScore } = scoreSlice.actions;
export default scoreSlice.reducer;
