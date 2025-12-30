import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import Context from "./utils/Context.jsx";
import UserContext from "./utils/UserContext.jsx"; // Corrected import

import { HashRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <HashRouter>
    <Context>
      
        <App />
     
    </Context>
  </HashRouter>
  
);
