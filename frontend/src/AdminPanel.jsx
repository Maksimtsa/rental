import { useEffect, useState } from "react";

function AdminPanel() {
  const [equipment, setEquipment] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    category: "",
    status: "available",
    description: "",
    image_url: ""
  });

  const fetchEquipment = () => {
    fetch("http://localhost:3000/equipment")
      .then(res => res.json())
      .then(setEquipment);
  };

  useEffect(fetchEquipment, []);

  const handleEdit = (item) => setFormData(item);

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = formData.id
      ? `http://localhost:3000/equipment/${formData.id}`
      : "http://localhost:3000/equipment";

    fetch(url, {
      method: formData.id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).then(() => {
      fetchEquipment();
      setFormData({
        id: null, name: "", category: "", status: "available",
        description: "", image_url: ""
      });
    });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Na pewno usunąć?")) return;
    fetch(`http://localhost:3000/equipment/${id}`, { method: "DELETE" })
      .then(fetchEquipment);
  };

  return (
    <>
      <h1>Panel Admina</h1>

      <form onSubmit={handleSubmit}>
        <input placeholder="Nazwa"
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })} />
        <input placeholder="Kategoria"
          value={formData.category}
          onChange={e => setFormData({ ...formData, category: e.target.value })} />
        <select
          value={formData.status}
          onChange={e => setFormData({ ...formData, status: e.target.value })}
        >
          <option value="available">Dostępny</option>
          <option value="rented">Wypożyczony</option>
          <option value="maintenance">Serwis</option>
        </select>
        <button>Zapisz</button>
      </form>

      <table>
        <tbody>
          {equipment.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.status}</td>
              <td>
                <button onClick={() => handleEdit(item)}>Edytuj</button>
                <button onClick={() => handleDelete(item.id)}>Usuń</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default AdminPanel;
