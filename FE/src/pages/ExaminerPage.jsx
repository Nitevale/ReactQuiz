import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTable } from "react-table";
import axios from "axios";
import { logout } from "../redux/authSlice"
import QuestionForm from "../components/QuestionForm";
import AddModal from "../components/CreateModal";

const API_URL = 'http://localhost:5297/api/Quiz';

const ExaminerPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [questions, setQuestions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [formInitialData, setFormInitialData] = useState({ questionText: "" });
  const [viewData, setViewData] = useState({ questionText: "" });
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(API_URL);
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const data = useMemo(() => (Array.isArray(questions) ? questions : []), [questions]);

  const columns = useMemo(
    () => [
      { Header: "Questions", accessor: "questionText" },
      {
        Header: " ",
        accessor: "action",
        Cell: ({ row }) => (
          <div className="flex space-x-4 justify-end items-center">
            <button onClick={() => handleView(row.original)}>
              <i className="fa-solid fa-eye text-theme-ERNI"></i>
            </button>
            <button onClick={() => handleDelete(row.original.questionID)}>
              <i className="fa-solid fa-trash text-red-500"></i>
            </button>
          </div>
        ),
        width: 150,
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  const handleView = (question) => {
    setViewData(question);
    setIsViewModalOpen(true);
    setIsEditMode(false);
  };

  const toggleEditMode = () => {
    setFormInitialData(viewData);
    setIsEditMode(!isEditMode);
  };

  const handleFormSubmit = async (updatedQuestion) => {
    try {
      if (isEditMode) {
        await axios.put(`${API_URL}/${viewData.questionID}`, updatedQuestion);
        setQuestions((prevQuestions) =>
          prevQuestions.map((q) =>
            q.questionID === viewData.questionID ? updatedQuestion : q
          )
        );
      } else {
        const response = await axios.post(API_URL, updatedQuestion);
        setQuestions([...questions, response.data]);
      }
      setIsModalOpen(false);
      setIsViewModalOpen(false);
      setIsEditMode(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleDelete = async (questionID) => {
    try {
      await axios.delete(`${API_URL}/${questionID}`);
      setQuestions((prevQuestions) =>
        prevQuestions.filter((q) => q.questionID !== questionID)
      );
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const handleAddNew = () => {
    setFormInitialData({ questionText: "", choices: [
      { choiceText: "", isCorrect: false },
      { choiceText: "", isCorrect: false },
      { choiceText: "", isCorrect: false },
      { choiceText: "", isCorrect: false }
    ]});
    setIsModalOpen(true);
    setIsEditMode(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsViewModalOpen(false);
    setIsEditMode(false);
  };
  
  return (
    <div className="flex flex-col items-center justify-center px-8 py-40 max-sm:py-36">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 max-sm:text-2xl max-sm:text-center">
          Welcome, {user ? user.username : "Guest"}
        </h1>
        <div className="flex justify-between items-center">
          <button
            onClick={handleAddNew}
            className="mb-4 bg-green-500 text-white py-1 px-2 rounded hover:bg-green-400"
          >
            + Add
          </button>
          <button
            onClick={handleLogout}
            className="mb-4 text-theme-base py-1 px-2 rounded"
          >
            <i className="fa-solid fa-right-from-bracket"></i>
          </button>
        </div>

        <AddModal
          isOpen={isModalOpen}
          onRequestClose={handleCloseModal}
          onClick={handleCloseModal}
        >
          <QuestionForm
            onSubmit={handleFormSubmit}
            initialData={formInitialData}
          />
        </AddModal>

        <AddModal
          isOpen={isViewModalOpen}
          onRequestClose={handleCloseModal}
          onClick={handleCloseModal}
        >
          {isEditMode ? (
            <QuestionForm
              onSubmit={handleFormSubmit}
              initialData={formInitialData}
            />
          ) : (
            <div>
              <QuestionForm initialData={viewData} readOnly={true} />
              <button
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
                                cell.column.Header === "Actions" ? "w-1/6" : ""
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
