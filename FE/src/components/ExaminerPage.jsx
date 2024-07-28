import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTable } from 'react-table';
import { logout } from '../redux/authSlice';
import { fetchQuestions, createQuestion, updateQuestion, deleteQuestion } from '../redux/questionsSlice';
import QuestionForm from './QuestionForm';

const ExaminerPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const questions = useSelector((state) => state.questions.questions);
  const questionsStatus = useSelector((state) => state.questions.status);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formInitialData, setFormInitialData] = useState({});

  useEffect(() => {
    if (questionsStatus === 'idle') {
      dispatch(fetchQuestions());
    }
  }, [questionsStatus, dispatch]);

  const handleAddNew = () => {
    setFormInitialData({});
    setIsFormVisible(true);
  };

  const handleEdit = (id) => {
    const questionToEdit = questions.find((q) => q.questionId === id);
    setFormInitialData(questionToEdit);
    setIsFormVisible(true);
  };

  const handleFormSubmit = (formData) => {
    if (formInitialData.questionId) {
      dispatch(updateQuestion({ id: formInitialData.questionId, question: formData }));
    } else {
      dispatch(createQuestion(formData));
    }
    setIsFormVisible(false);
  };

  const handleDelete = (id) => {
    dispatch(deleteQuestion(id));
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const data = React.useMemo(() => (Array.isArray(questions) ? questions : []), [questions]);

  const columns = React.useMemo(
    () => [
      { Header: 'Questions', accessor: 'questionText' },
      {
        Header: 'Action',
        accessor: 'action',
        Cell: ({ row }) => (
          <div className="flex space-x-2">
            <button type="button" className="btn btn-warning btn-sm view-button text-white" onClick={() => handleView(row.original.questionId)}>View</button>
            <button type="button" className="btn btn-primary btn-sm edit-button" onClick={() => handleEdit(row.original.questionId)}>Edit</button>
            <button type="button" className="btn btn-danger btn-sm delete-button" onClick={() => handleDelete(row.original.questionId)}>Delete</button>
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
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome, {user.username}</h1>
          <button type="button" onClick={handleLogout} className="bg-red-500 text-white py-2 px-4 rounded">Logout</button>
        </div>
        <button type="button" onClick={handleAddNew} className="mb-4 bg-green-500 text-white py-2 px-4 rounded">Add New Question</button>
        {isFormVisible && <QuestionForm onSubmit={handleFormSubmit} initialData={formInitialData} />}
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
                  <tr key={row.id} {...row.getRowProps()}>
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
    </div>
  );
};

export default ExaminerPage;
