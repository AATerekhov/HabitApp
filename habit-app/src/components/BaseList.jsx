import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/baseListStyles.css";

export default function BaseList({
  title,       
  apiUrl,      
  columns,        
  entityName,     
  editPath    
}) {
  const [items, setItems] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const app_url = "http://localhost:5000";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${app_url}${apiUrl}`);
        setItems(response.data);
      } catch (error) {
        alert(`Ошибка при загрузке ${title}: ` + error.message);
      }
    };

    fetchData();
  }, [apiUrl]);

  const deleteItem = async (id) => {
    try {
      await axios.delete(`${app_url}${apiUrl}/Delete${entityName}/${id}`);
      setSelectedId(null);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      alert(`Не удалось удалить ${entityName.toLowerCase()}: ` + error.message);
    }
  };

  const handleDelete = () => {
    if (!selectedId) {
      alert(`Выберите ${entityName.toLowerCase()} для удаления.`);
      return;
    }
    if (window.confirm(`Удалить этот ${entityName.toLowerCase()}?`)) {
      deleteItem(selectedId);
    }
  };

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">📂 {title}</h2>

      <div className="action-buttons">
        {editPath && (
          <button
            className="btn btn-primary"
            onClick={() => (window.location.href = `${editPath}/${selectedId}`)}
            disabled={!selectedId}
          >
            ✏ Edit
          </button>
        )}
        <button
          className="btn btn-danger"
          onClick={handleDelete}
          disabled={!selectedId}
        >
          🗑 Delete
        </button>
      </div>

      <div className="table-container">
        <table className="base-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className={selectedId === item.id ? "selected-row" : ""}
              >
                {columns.map((col) => (
                  <td key={col.key}>
                    {col.key === "id" ? (
                      <Link to={`/${entityName.toLowerCase()}/${item.id}`}>
                        {item[col.key]}
                      </Link>
                    ) : (
                      item[col.key]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}