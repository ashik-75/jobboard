import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import ErrorElement from "./components/ErrorElement";
import AuthLayout from "./layout/AuthLayout";
import DemoLayout from "./layout/DemoLayout";
import ProtectedRoute from "./layout/ProtectedRoute";
import RootLayout from "./layout/RootLayout";
import AddJobPage from "./pages/AddJobPage";
import Contact from "./pages/Contact";
import DemoPage from "./pages/demo";
import Details from "./pages/demo/Details";
import Form from "./pages/demo/Form";

import EditJob from "./pages/EditJob";
import Homepage from "./pages/Homepage";
import JobDetails from "./pages/JobDetails";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import RegisterPage from "./pages/RegisterPage";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<RootLayout />}>
        <Route path="/" errorElement={<div>Something went wrong</div>}>
          <Route index element={<Homepage />} />
          <Route
            path=":jobId"
            element={<JobDetails />}
            errorElement={<ErrorElement />}
          />
          <Route
            path="add-job"
            element={
              <ProtectedRoute>
                <AddJobPage />
              </ProtectedRoute>
            }
          />
          <Route
            path=":jobId/edit"
            element={
              <ProtectedRoute>
                <EditJob />
              </ProtectedRoute>
            }
          />
          <Route element={<AuthLayout />}>
            <Route path="register" element={<RegisterPage />} />
            <Route path="login" element={<LoginPage />} />
          </Route>
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
          <Route path="demo" element={<DemoLayout />}>
            <Route index element={<DemoPage />} />
            <Route path=":noteId" element={<Details />} />
            <Route path="form" element={<Form />} />
          </Route>
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
