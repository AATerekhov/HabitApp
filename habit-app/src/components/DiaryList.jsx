import { useEffect, useState } from "react";
import { Link,  useNavigate } from "react-router-dom";
import React from 'react';
import axios from "axios";
import '../styles/diaryListStyles.css'; 


export default function DiaryList() {
  const [diaries, setDiaries] = useState([]);
  const [selectedDiaryId, setSelectedDiaryId] = useState(null);
  const app_url = "http://localhost:5000";
  const navigate = useNavigate(); 

  const getDiaries = async () => {
    try {
      const response = await axios.get(`${app_url}/api/HabitDiary/AllDiaries`);
      setDiaries(response.data);
    } catch (error) {
      alert("Ошибка при загрузке дневников: " + error.message);
    }
  };

  const deleteDiary = async (id) => {
    try {
      await axios.delete(`${app_url}/api/HabitDiary/DeleteDiary/${id}`);
      setSelectedDiaryId(null);
      getDiaries();
    } catch (error) {
      alert("Не удалось удалить дневник: " + error.message);
    }
  };

  const handleEdit = () => {
    if (!selectedDiaryId) {
      alert("Выберите дневник для редактирования.");
      return;
    }
    navigate(`/admin/rewards/edit/${selectedDiaryId}`);
  };

  const handleDelete = () => {
    if (!selectedDiaryId) {
      alert("Выберите дневник для удаления.");
      return;
    }
    if (window.confirm("Удалить этот дневник?")) {
      deleteDiary(selectedDiaryId);
    }
  };

  useEffect(() => {
    getDiaries();
  }, []);

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Diaries</h2>

      <div className="action-buttons">
        <button
          className="btn btn-primary"
          onClick={handleEdit}
          disabled={!selectedDiaryId}
        >
          Edit
        </button>
        <button
          className="btn btn-danger"
          onClick={handleDelete}
          disabled={!selectedDiaryId}
        >
          Delete
        </button>
      </div>

      <div className="table-container">
        <table className="diary-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>RoomId</th>
              <th>Description</th>
              <th>DiaryOwnerId</th>
              <th>TotalCost</th>
            </tr>
          </thead>
          <tbody>
            {diaries.map((diary) => (
              <tr
                key={diary.id}
                onClick={() => setSelectedDiaryId(diary.id)}
                className={selectedDiaryId === diary.id ? "selected-row" : ""}
              >
                <td>
                  <Link to={`/diary/${diary.id}`}>{diary.id}</Link>
                </td>
                <td>{diary.roomId}</td>
                <td>{diary.description}</td>
                <td>{diary.diaryOwnerId}</td>
                <td>{diary.totalCost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}