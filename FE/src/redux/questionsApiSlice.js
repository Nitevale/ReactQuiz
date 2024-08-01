import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = "http://localhost:5297/api/Quiz";

export const questionsApi = createApi({
  reducerPath: 'questionsApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getQuestions: builder.query({
      query: () => '',
    }),
    createQuestion: builder.mutation({
      query: (newQuestion) => ({
        url: '',
        method: 'POST',
        body: newQuestion,
      }),
    }),
    updateQuestion: builder.mutation({
      query: ({ id, updatedQuestion }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: updatedQuestion,
      }),
    }),
    deleteQuestion: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetQuestionsQuery,
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
} = questionsApi;
