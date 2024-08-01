import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const quizApi = createApi({
  reducerPath: 'quizApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5297/api/' }),
  tagTypes: ['Quiz'],
  endpoints: (builder) => ({
    fetchQuestions: builder.query({
      query: () => 'Quiz',
      providesTags: ['Quiz'],
    }),
    createQuestion: builder.mutation({
      query: (newQuestion) => ({
        url: 'Quiz',
        method: 'POST',
        body: newQuestion,
      }),
      invalidatesTags: ['Quiz'],
    }),
    updateQuestion: builder.mutation({
      query: ({ id, updatedQuestion }) => ({
        url: `Quiz/${id}`,
        method: 'PUT',
        body: updatedQuestion,
      }),
      invalidatesTags: ['Quiz'],
    }),
    deleteQuestion: builder.mutation({
      query: (id) => ({
        url: `Quiz/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Quiz'],
    }),
  }),
});

export const {
  useFetchQuestionsQuery,
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
} = quizApi;

export default quizApi.reducer;
