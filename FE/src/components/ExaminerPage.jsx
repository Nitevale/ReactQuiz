import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTable } from 'react-table';
import { logout } from '../redux/authSlice';
import { fetchQuestions, createQuestion, updateQuestion, deleteQuestion } from '../redux/questionsSlice';

const ExaminerPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const questions = useSelector((state) => state.questions.questions);
  const questionsStatus = useSelector((state) => state.questions.status);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formInitialData, setFormInitialData] = useState({ questionText: '' });

  useEffect(() => {
    if (questionsStatus === 'idle') {
      dispatch(fetchQuestions());
    }
  }, [questionsStatus, dispatch]);

  const handleAddNew = () => {
    setFormInitialData({ questionText: '' });
    setIsFormVisible(true);
  };

  const handleEdit = (id) => {
    const questionToEdit = questions.find((q) => q.questionId === id);
    setFormInitialData(questionToEdit);
    setIsFormVisible(true);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const questionData = Object.fromEntries(formData.entries());

    if (formInitialData.questionId) {
      dispatch(updateQuestion({ id: formInitialData.questionId, question: questionData }));
    } else {
      dispatch(createQuestion(questionData));
    }
    setIsFormVisible(false);
  };

  const handleDelete = (id) => {
    dispatch(deleteQuestion(id));
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const data = React.useMemo(() => (Array.isArray(questions) ? questions : []), [questions]);

  const columns = React.useMemo(
    () => [
      { Header: 'Questions', accessor: 'questionText' },
      {
        Header: ' ',
        accessor: 'action',
        Cell: ({ row }) => (
          <div className="flex space-x-4 justify-end items-center">
            <button type="button" onClick={() => handleView(row.original.questionId)}><i class="fa-solid fa-eye"></i></button>
            <button type="button" onClick={() => handleEdit(row.original.questionId)}><i class="fa-solid fa-pen-to-square"></i></button>
            <button type="button" onClick={() => handleDelete(row.original.questionId)}><i class="fa-solid fa-trash"></i></button>
          </div>
        ),
        width: 150,
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  const handleView = (id) => {
    console.log('View question with id:', id);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
      {questions.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <div className="w-full max-w-4xl">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Welcome, {user.username}</h1>
          <div className="flex justify-between items-center">
            <button type="button" onClick={handleAddNew} className="mb-4 bg-green-500 text-white py-1 px-2 rounded">+ Add</button>
            <button type="button" onClick={handleLogout} className="text-theme-ENRI py-2 px-4 rounded"><i class="fa-solid fa-right-from-bracket"></i></button>
          </div>
          
          {isFormVisible && (
            <form onSubmit={handleFormSubmit} className="mb-4">
              <div className="mb-4">
                <label htmlFor="questionText" className="block text-sm font-medium text-gray-700">Question</label>
                <input
                  type="text"
                  id="questionText"
                  name="questionText"
                  defaultValue={formInitialData.questionText}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div className="flex space-x-2">
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Save</button>
                <button type="button" onClick={() => setIsFormVisible(false)} className="bg-gray-500 text-white py-2 px-4 rounded">Cancel</button>
              </div>
            </form>
          )}
          <div className="bg-white shadow-md rounded overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200" {...getTableProps()}>
              <thead className="bg-gray-50">
                {headerGroups.map((headerGroup) => (
                  <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => {
                      const { key, ...rest } = column.getHeaderProps();
                      return (
                        <th
                          key={key}
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          {...rest}
                        >
                          {column.render('Header')}
                        </th>
                      );
                    })}
                  </tr>
                ))}
              </thead>
              <tbody className="bg-white divide-y divide-gray-200" {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr className="" key={row.id} {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        const { key, ...rest } = cell.getCellProps();
                        return (
                          <td
                            key={key}
                            className={`px-6 py-4 whitespace-nowrap ${cell.column.Header === 'Action' ? 'w-1/6' : ''}`}
                            {...rest}
                          >
                            {cell.render('Cell')}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExaminerPage;