// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import 'swiper/css';
import 'swiper/css/navigation';
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

import { BrowserRouter } from "react-router-dom";
import { ModalProvider } from "./context/ModalProvider";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  // <StrictMode>
  <BrowserRouter>
    <ModalProvider>
    <App />
    </ModalProvider>
  </BrowserRouter>
  // </StrictMode>
);