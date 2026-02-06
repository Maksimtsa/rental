import { useEffect, useState } from "react";

function UserPanel() {
  const [equipment, setEquipment] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/equipment")
      .then(res => res.json())
      .then(setEquipment);
  }, []);

  return (
    <>
      <h1>Panel Użytkownika</h1>

      <ul>
        {equipment.map(item => (
          <li key={item.id}>
            {item.name} – {item.status}
          </li>
        ))}
      </ul>
    </>
  );
}

export default UserPanel;
