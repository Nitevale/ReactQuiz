import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTable } from "react-table";
import { logout } from "../redux/authSlice";
import {
  fetchQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} from "../redux/questionsSlice";
import QuestionForm from "../components/QuestionForm";
import AddModal from "../components/CreateModal";

const ExaminerPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const questions = useSelector((state) => state.questions.questions);
  const questionsStatus = useSelector((state) => state.questions.status);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formInitialData, setFormInitialData] = useState({ questionText: "" });

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (questionsStatus === "idle") {
      dispatch(fetchQuestions());
    }
  }, [questionsStatus, dispatch]);

  const handleAddNew = () => {
    setFormInitialData({ questionText: "" });
    setIsModalOpen(true);
  };

  const handleEdit = (id) => {
    const questionToEdit = questions.find((q) => q.questionId === id);
    setFormInitialData(questionToEdit);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (questionData) => {
    if (formInitialData.questionId) {
      dispatch(
        updateQuestion({
          id: formInitialData.questionId,
          question: questionData,
        })
      );
    } else {
      dispatch(createQuestion(questionData));
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    dispatch(deleteQuestion(id));
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const data = React.useMemo(
    () => (Array.isArray(questions) ? questions : []),
    [questions]
  );

  const columns = React.useMemo(
    () => [
      { Header: "Questions", accessor: "questionText" },
      {
        Header: " ",
        accessor: "action",
        Cell: ({ row }) => (
          <div className="flex space-x-4 justify-end items-center">
            <button
              type="button"
              onClick={() => handleView(row.original.questionId)}
            >
              <i className="fa-solid fa-eye text-blue-500"></i>
            </button>
            {/* <button
              type="button"
              onClick={() => handleEdit(row.original.questionId)}
            >
              <i className="fa-solid fa-pen-to-square"></i>
            </button> */}
            <button
              type="button"
              onClick={() => handleDelete(row.original.questionId)}
            >
              <i className="fa-solid fa-trash text-red-500"></i>
            </button>
          </div>
        ),
        width: 150,
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const handleView = (id) => {
    console.log("View question with id:", id);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-wallpaper bg-repeat-round p-8">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Welcome, {user.username}
        </h1>
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={handleAddNew}
            className="mb-4 bg-green-500 text-white py-1 px-2 rounded hover:bg-green-400"
          >
            + Add
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="mb-4 text-theme-base py-1 px-2 rounded"
          >
            <i className="fa-solid fa-right-from-bracket"></i>
          </button>
        </div>

        <AddModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          onClick={() => setIsModalOpen(false)}
        >
          <QuestionForm
            onSubmit={handleFormSubmit}
            initialData={formInitialData}
          />
        </AddModal>

        {questions.length === 0 ? (
          <p>Loading...</p>
        ) : (
          <div className="bg-white shadow-md rounded overflow-hidden">
            <table
              className="min-w-full divide-y divide-gray-200"
              {...getTableProps()}
            >
              <thead className="bg-gray-50">
                {headerGroups.map((headerGroup) => {
                  const { key, ...restHeaderGroupProps } =
                    headerGroup.getHeaderGroupProps();
                  return (
                    <tr key={key} {...restHeaderGroupProps}>
                      {headerGroup.headers.map((column) => {
                        const { key, ...restColumnProps } =
                          column.getHeaderProps();
                        return (
                          <th
                            key={key}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            {...restColumnProps}
                          >
                            {column.render("Header")}
                          </th>
                        );
                      })}
                    </tr>
                  );
                })}
              </thead>
              <tbody
                className="bg-white divide-y divide-gray-200"
                {...getTableBodyProps()}
              >
                {rows.map((row) => {
                  prepareRow(row);
                  const { key, ...restRowProps } = row.getRowProps();
                  return (
                    <tr key={key} {...restRowProps}>
                      {row.cells.map((cell) => {
                        const { key, ...restCellProps } = cell.getCellProps();
                        return (
                          <td
                            key={key}
                            className={`px-6 py-4 whitespace-nowrap ${
                              cell.column.Header === "Action" ? "w-1/6" : ""
                            }`}
                            {...restCellProps}
                          >
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExaminerPage;
