import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
// import "react-day-picker/dist/style.css";
import "@/locales/i18n.ts";

import { store } from "@/store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
