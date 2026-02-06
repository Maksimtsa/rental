import { useState } from "react";
import AdminPanel from "./AdminPanel";
import UserPanel from "./UserPanel";

function App() {
  const [panel, setPanel] = useState(null);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      {!panel && (
        <>
          <h1>Wybierz panel</h1>
          <button onClick={() => setPanel("user")}>Użytkownik</button>
          <button onClick={() => setPanel("admin")}>Admin</button>
        </>
      )}

      {panel === "admin" && <AdminPanel />}
      {panel === "user" && <UserPanel />}
    </div>
  );
}

export default App;
