// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const API_URL = 'http://localhost:5297/api/Quiz';

// export const fetchQuestions = createAsyncThunk(
//   'questions/fetchQuestions',
//   async () => {
//     const response = await axios.get(API_URL);
//     return response.data;
//   }
// );

// export const createQuestion = createAsyncThunk(
//   'questions/createQuestion',
//   async (questionData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(API_URL, questionData);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const updateQuestion = createAsyncThunk(
//   'questions/updateQuestion',
//   async ({ id, question }, { rejectWithValue }) => {
//     try {
//       const response = await axios.put(`${API_URL}/${id}`, question);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const deleteQuestion = createAsyncThunk(
//   'questions/deleteQuestion',
//   async (id, { rejectWithValue }) => {
//     try {
//       await axios.delete(`${API_URL}/${id}`);
//       return id;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// const questionsSlice = createSlice({
//   name: 'questions',
//   initialState: {
//     questions: [],
//     status: 'idle',
//     error: null,
//   },
//   reducers: {
//     addQuestion(state, action) {
//       state.questions.push(action.payload);
//     },
//     removeQuestion(state, action) {
//       state.questions = state.questions.filter((q) => q.questionID !== action.payload);
//     },
//     updateQuestionOptimistic(state, action) {
//       const { id, updatedQuestion } = action.payload;
//       const index = state.questions.findIndex((q) => q.questionID === id);
//       if (index !== -1) {
//         state.questions[index] = updatedQuestion;
//       }
//     },
//   },
//   extraReducers(builder) {
//     builder
//       .addCase(fetchQuestions.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchQuestions.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.questions = action.payload;
//       })
//       .addCase(fetchQuestions.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })
//       .addCase(createQuestion.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(createQuestion.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.questions.push(action.payload);
//       })
//       .addCase(createQuestion.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload;
//       })
//       .addCase(updateQuestion.fulfilled, (state, action) => {
//         const index = state.questions.findIndex((q) => q.questionID === action.payload.questionID);
//         if (index !== -1) {
//           state.questions[index] = action.payload;
//         }
//       })
//       .addCase(deleteQuestion.fulfilled, (state, action) => {
//         state.questions = state.questions.filter((q) => q.questionID !== action.payload);
//       });
//   },
// });

// export const { addQuestion, removeQuestion, updateQuestionOptimistic } = questionsSlice.actions;

// export default questionsSlice.reducer;
