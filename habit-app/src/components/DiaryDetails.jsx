import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import '../styles/diaryDetialsStyles.css'; 

export default function DiaryDetails() {
    const { id } = useParams();
    const [diary, setDiary] = useState(null);
    const [diaryLines, setLines] = useState([]);
    const app_url = "http://localhost:5000";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [diaryResponse, linesResponse] = await Promise.all([
                    axios.get(`${app_url}/api/HabitDiary/GetDiary/${id}`),
                    axios.get(`${app_url}/api/HabitDiaryLine/GetDiaryLinesByDiaryId/${id}`)
                ]);
                setDiary(diaryResponse.data);
                setLines(linesResponse.data);
            } catch (error) {
                alert("Ошибка загрузки данных: " + error.message);
            }
        };

        fetchData();
    }, [id]);

    if (!diary) return <div className="loading">Загрузка...</div>;

    return (
        <div className="diary-details-container">
            <h2 className="diary-title">📘 Diary Details</h2>

            <div className="diary-info">
                {[
                    { label: "Id", value: diary.id },
                    { label: "RoomId", value: diary.roomId },
                    { label: "Description", value: diary.description },
                    { label: "DiaryOwnerId", value: diary.diaryOwnerId },
                    { label: "TotalCost", value: diary.totalCost }
                ].map((field, index) => (
                    <div className="diary-field" key={index}>
                        <label>{field.label}:</label>
                        <div className="diary-value">{field.value}</div>
                    </div>
                ))}
            </div>

            <div className="table-container">
                <h3 className="diary-lines-title">📑 Diary Lines</h3>
                <table className="diary-table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>EntityId</th>
                            <th>EntityType</th>
                            <th>EventDescription</th>
                            <th>ModifiedDate</th>
                            <th>Status</th>
                            <th>Cost</th>
                            <th>CreatedDate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {diaryLines.map(line => (
                            <tr key={line.id}>
                                <td>{line.id}</td>
                                <td>{line.entityId}</td>
                                <td>{line.entityType}</td>
                                <td>{line.eventDescription}</td>
                                <td>{line.modifiedDate}</td>
                                <td>{line.status}</td>
                                <td>{line.cost}</td>
                                <td>{line.createdDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}