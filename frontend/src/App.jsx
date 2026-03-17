import "./App.css";

import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

//pages
import { HomePage } from "./pages/HomePage";
import { AddLauncherPage } from "./pages/AddLauncherPage";
import { LauncherDetailesPage } from "./pages/LauncherDetailsPage";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { EditUserPage } from "./pages/EditUserPape";

//store
import { useStore } from "./store/userStore";

//components
import { Navbar } from "./components/Navbar";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

function ProtecedRoute({alowedRoles}) {
  const loggedinUser = useStore((state) => state.loggedinUser);
  if (!alowedRoles.includes(loggedinUser.userType)) {
    return <Navigate to={"/login-page"} replace />;
  }
  return <Outlet />;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="main-container">
        <BrowserRouter>
        <Navbar/>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add-launcher-page" element={<AddLauncherPage />} />
            <Route
              path="/launcher-detailes/:id"
              element={<LauncherDetailesPage />}
            />
            <Route element={<ProtecedRoute alowedRoles={['admin']}/>}>
              <Route path="/register-page" element={<RegisterPage />} />
              <Route path="/edit-user-page/:id" element={<EditUserPage />} />
            </Route>
            <Route path="/login-page" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
