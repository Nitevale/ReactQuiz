import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTable } from "react-table";
import axios from "axios";
import { logout } from "../redux/authSlice";
import QuestionForm from "../components/QuestionForm";
import AddModal from "../components/CreateModal";
import ConfirmationModal from "../components/ConfirmationModal";

const API_URL = "http://localhost:5297/api/Quiz";

const ExaminerPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formInitialData, setFormInitialData] = useState({ questionText: "" });
  const [viewData, setViewData] = useState({ questionText: "" });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [onConfirmAction, setOnConfirmAction] = useState(() => {});

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(API_URL);
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const data = useMemo(
    () => (Array.isArray(questions) ? questions : []),
    [questions]
  );

  const columns = useMemo(
    () => [
      { Header: "Questions", accessor: "questionText" },
      {
        Header: " ",
        accessor: "action",
        Cell: ({ row }) => (
          <div className="flex space-x-4 justify-end items-center">
            <button onClick={() => handleView(row.original)}>
              <i className="fa-solid fa-eye text-theme-ERNI hover:text-blue-500"></i>
            </button>
            <button onClick={() => confirmDelete(row.original.questionID)}>
              <i className="fa-solid fa-trash text-red-500 hover:text-red-300"></i>
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

  const handleView = (question) => {
    console.log("Viewing question:", question);
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
        const questionToUpdate = {
          ...updatedQuestion,
          choices: updatedQuestion.choices.map((choice, index) => ({
            ...viewData.choices[index],
            choiceText: choice.choiceText,
            isCorrect: choice.isCorrect,
          })),
        };

        await axios.put(`${API_URL}/${viewData.questionID}`, questionToUpdate);
        setQuestions((prevQuestions) =>
          prevQuestions.map((q) =>
            q.questionID === viewData.questionID
              ? { ...questionToUpdate, questionID: viewData.questionID }
              : q
          )
        );
        console.log("Payload to be sent:", questionToUpdate);
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

  const confirmDelete = (questionID) => {
    setConfirmationMessage("Are you sure you want to delete this question?");
    setOnConfirmAction(() => () => handleDelete(questionID));
    setIsConfirmationOpen(true);
  };

  const handleDelete = async (questionID) => {
    console.log("Deleting question with ID:", questionID);
    try {
      await axios.delete(`${API_URL}/${questionID}`);
      setQuestions((prevQuestions) =>
        prevQuestions.filter((q) => q.questionID !== questionID)
      );
      setIsConfirmationOpen(false);
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const confirmLogout = () => {
    setConfirmationMessage("Are you sure you want to log out?");
    setOnConfirmAction(() => handleLogout);
    setIsConfirmationOpen(true);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleAddNew = () => {
    setFormInitialData({
      questionText: "",
      choices: [
        { choiceText: "", isCorrect: false },
        { choiceText: "", isCorrect: false },
        { choiceText: "", isCorrect: false },
        { choiceText: "", isCorrect: false },
      ],
    });
    setIsModalOpen(true);
    setIsEditMode(false);
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
            onClick={confirmLogout}
            className="mb-4 text-theme-base py-1 px-2 rounded hover:text-black"
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
                className="w-full bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-400"
              >
                Edit
              </button>
            </div>
          )}
        </AddModal>

        <ConfirmationModal
          isOpen={isConfirmationOpen}
          onRequestClose={() => setIsConfirmationOpen(false)}
          onConfirm={onConfirmAction}
          message={confirmationMessage}
        />

        <div className="bg-white shadow-md rounded overflow-hidden">
          <div className="overflow-x-auto">
            <table
              className="min-w-full table-auto divide-y divide-gray-300 border border-gray-300"
              {...getTableProps()}
            >
              <thead className="bg-gray-100">
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
                className="bg-white divide-y divide-gray-300"
                {...getTableBodyProps()}
              >
                {loading ? (
                  <tr>
                    <td colSpan={columns.length} className="text-center py-4">
                      Loading...
                    </td>
                  </tr>
                ) : rows.length > 0 ? (
                  rows.map((row) => {
                    prepareRow(row);
                    const { key, ...restRowProps } = row.getRowProps();
                    return (
                      <tr key={key} {...restRowProps}>
                        {row.cells.map((cell) => {
                          const { key, ...restCellProps } = cell.getCellProps();
                          return (
                            <td
                              key={key}
                              className={`px-6 py-4 whitespace-normal break-words ${
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
                  })
                ) : (
                  <tr>
                    <td colSpan={columns.length} className="text-center py-4">
                      No Data Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExaminerPage;
