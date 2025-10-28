import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ModalProvider } from "./components/Quizzes/modal/ModalContext.tsx"; // 1. Import ModalProvider

// 2. Create your query client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* 3. Wrap your app in the providers */}
    <QueryClientProvider client={queryClient}>
      {/* 4. ModalProvider goes inside QueryClientProvider */}
      <ModalProvider>
        <App />
      </ModalProvider>

      {/* 5. Add the devtools component here */}
    </QueryClientProvider>
  </React.StrictMode>
);
