import React, { useState } from "react";
import PrivateRoutes from "./components/privateRoutes/privateRoute";
import localStorageSrevice from "./services/localStorageService";

function App() {
  const [role, setRole] = useState(localStorageSrevice.getRole());

  return (
    <div className="App">
      <PrivateRoutes role={role} setRole={setRole} />
    </div>
  );
}

export default App;
