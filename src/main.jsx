import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import { CategProvider } from "./context/CategContext.jsx";

createRoot(document.getElementById("root")).render(
  <CategProvider>
    <UserProvider>
      <App />
    </UserProvider>
  </CategProvider>
);
