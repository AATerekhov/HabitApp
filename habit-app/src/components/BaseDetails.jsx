import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/BaseDetailStyle.css";

export default function BaseDetails({ title, apiUrl, entityFields, subEntityConfig }) {
    const { id } = useParams();
    const [entity, setEntity] = useState(null);
    const [subEntities, setSubEntities] = useState([]);
    const app_url = "http://localhost:5000";
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [entityResponse, subEntityResponse] = await Promise.all([
                    axios.get(`${app_url}${apiUrl}/${id}`),
                    axios.get(`${app_url}${subEntityConfig.apiUrl}/${id}`)
                ]);
                setEntity(entityResponse.data);
                setSubEntities(subEntityResponse.data);
            } catch (error) {
                alert("Ошибка загрузки данных: " + error.message);
            }
        };

        fetchData();
    }, [id, apiUrl, subEntityConfig.apiUrl]);

    if (!entity) return <div className="loading">Загрузка...</div>;

    return (
        <div className="details-container">
            <h2 className="details-title">📘 {title}</h2>

            <div className="details-info">
                {entityFields.map((field, index) => (
                    <div className="details-field" key={index}>
                        <label>{field.label}:</label>
                        <div className="details-value">{entity[field.key]}</div>
                    </div>
                ))}
            </div>

            {subEntityConfig && (
                <div className="table-container">
                    <h3 className="details-subtitle">📑 {subEntityConfig.title}</h3>
                    <table className="details-table">
                        <thead>
                            <tr>
                                {subEntityConfig.columns.map((column, index) => (
                                    <th key={index}>{column.label}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {subEntities.map((item) => (
                                <tr key={item.id}>
                                    {subEntityConfig.columns.map((column, index) => (
                                        <td key={index}>{item[column.key]}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}