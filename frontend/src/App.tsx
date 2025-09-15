import {Route, Routes} from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import {Toaster} from "react-hot-toast";
import HomePage from "./pages/HomePage.tsx";

function App() {

  return (
      <div>
          <Toaster />

          <Routes>
              <Route
                path={"/"}
                element={<HomePage />}
              />

              <Route
                path={"/dashboard"}
                element={<DashboardPage />}
              />
          </Routes>
      </div>
  );
}

export default App
