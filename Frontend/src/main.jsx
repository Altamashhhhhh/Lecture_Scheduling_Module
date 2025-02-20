import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider as ChakraProvider } from "./components/ui/provider.jsx";
import { BrowserRouter } from "react-router-dom";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </StrictMode>
);
