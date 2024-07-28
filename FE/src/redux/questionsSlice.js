import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5297/api/Quiz';

export const fetchQuestions = createAsyncThunk('Quiz/fetchQuestions', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const createQuestion = createAsyncThunk('Quiz/createQuestion', async (question) => {
  const response = await axios.post(API_URL, question);
  return response.data;
});

export const updateQuestion = createAsyncThunk('Quiz/updateQuestion', async ({ id, question }) => {
  const response = await axios.put(`${API_URL}/${id}`, question);
  return response.data;
});

export const deleteQuestion = createAsyncThunk('Quiz/deleteQuestion', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const questionsSlice = createSlice({
  name: 'questions',
  initialState: {
    questions: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.questions = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createQuestion.fulfilled, (state, action) => {
        state.questions.push(action.payload);
      })
      .addCase(updateQuestion.fulfilled, (state, action) => {
        const index = state.questions.findIndex((q) => q.questionId === action.payload.questionId);
        state.questions[index] = action.payload;
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.questions = state.questions.filter((q) => q.questionId !== action.payload);
      });
  },
});

export default questionsSlice.reducer;
