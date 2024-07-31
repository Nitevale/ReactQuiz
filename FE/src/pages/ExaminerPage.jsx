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
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [formInitialData, setFormInitialData] = useState({ questionText: "" });
  const [viewData, setViewData] = useState({ questionText: "" });
  const [isEditMode, setIsEditMode] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (questionsStatus === "idle") {
      dispatch(fetchQuestions());
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [user, questionsStatus, dispatch, navigate]);

  const handleAddNew = () => {
    setFormInitialData({ questionText: "", choices: "" });
    setIsModalOpen(true);
  };

  const handleEdit = (id) => {
    const questionToEdit = questions.find((q) => q.questionID === id);
    setFormInitialData(questionToEdit);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (questionData) => {
    if (formInitialData.questionID) {
      dispatch(
        updateQuestion({
          id: formInitialData.questionID,
          question: questionData,
        })
      );
    } else {
      dispatch(createQuestion(questionData));
    }
    setIsModalOpen(false);
    setIsEditMode(false);
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
              onClick={() => handleView(row.original.questionID)}
            >
              <i className="fa-solid fa-eye text-theme-ERNI"></i>
            </button>
            <button
              type="button"
              onClick={() => handleDelete(row.original.questionID)}
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
    const questionToView = questions.find((q) => q.questionID === id);
    setViewData(questionToView);
    setIsViewModalOpen(true);
    setIsEditMode(false);
  };

  const toggleEditMode = () => {
    setIsEditMode((prevMode) => !prevMode);
    setFormInitialData(viewData);
  };

  return (
    <div className="flex flex-col items-center justify-center px-8 py-36 max-sm:py-36">
      <div className="w-full max-w-4xl ">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 max-sm:text-2xl">
          Welcome, {user ? user.username : "Guest"}
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

        <AddModal
          isOpen={isViewModalOpen}
          onRequestClose={() => setIsViewModalOpen(false)}
          onClick={() => setIsViewModalOpen(false)}
        >
          {isEditMode ? (
            <QuestionForm
              onSubmit={handleFormSubmit}
              initialData={formInitialData}
            />
          ) : (
            <div>
              <QuestionForm
                initialData={viewData}
                readOnly={true}
              />
              <button
                type="button"
                onClick={toggleEditMode}
                className="mt-4 bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-400"
              >
                Edit
              </button>
            </div>
          )}
        </AddModal>

        {questions.length === 0 ? (
          <p>Loading...</p>
        ) : isMobile ? (
          <div className="grid grid-cols-1 gap-4">
            {questions.map((question) => (
              <div
                key={question.questionID}
                className="bg-white shadow-md rounded p-4"
              >
                <h2 className="text-lg font-semibold mb-2">
                  {question.questionText}
                </h2>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => handleView(question.questionID)}
                  >
                    <i className="fa-solid fa-eye text-theme-ERNI"></i>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(question.questionID)}
                  >
                    <i className="fa-solid fa-trash text-red-500"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white shadow-md rounded overflow-hidden">
            <div className="overflow-x-auto">
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
          </div>
        )}
      </div>
    </div>
  );
};

export default ExaminerPage;