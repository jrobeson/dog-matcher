import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Login from "./pages/Login.tsx";
import Search from "./pages/Search.tsx";
import { useAuth } from "./store/AuthContext.tsx";

function App() {
  const {isAuthenticated} = useAuth()
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/search"
          element={
            isAuthenticated ? <Search /> : <Navigate to="/login" replace />
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
