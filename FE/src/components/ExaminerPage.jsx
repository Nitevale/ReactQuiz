import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTable } from "react-table";
import { logout } from "../redux/authSlice";
import axios from 'axios';

const ExaminerPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("https://your-backend-url/api/questions");
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const data = React.useMemo(() => questions, [questions]);

  const columns = React.useMemo(
    () => [
      { Header: "Questions", accessor: "question" },
      {
        Header: "Action",
        accessor: "action",
        Cell: ({ row }) => (
          <div className="d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-warning btn-sm view-button text-white"
              onClick={() => handleView(row.original.id)}
            >
              <i className="fa-regular fa-eye"></i>
            </button>
            <button
              type="button"
              className="btn btn-primary btn-sm edit-button"
              onClick={() => handleEdit(row.original.id)}
            >
              <i className="fa-regular fa-pen-to-square"></i>
            </button>
            <button
              type="button"
              className="btn btn-danger btn-sm delete-button"
              onClick={() => handleDelete(row.original.id)}
            >
              <i className="fa-solid fa-trash"></i>
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

  const handleEdit = (id) => {
    console.log("Edit question with id:", id);
  };

  const handleDelete = (id) => {
    console.log("Delete question with id:", id);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-theme-lightest p-32">
      <div className="w-3/5 flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-theme-dark">
          Welcome, {user.username}
        </h1>
        <button
          type="button"
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
      <div className="w-full flex justify-center mb-8">
        <div className="w-full lg:w-3/4">
          <table className="min-w-full bg-white" {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      className="py-2 px-4 bg-gray-200 border-b"
                      {...column.getHeaderProps()}
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td
                        className={`py-2 px-4 border-b ${
                          cell.column.Header === "Action" ? "w-1/6" : ""
                        }`}
                        {...cell.getCellProps()}
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
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
