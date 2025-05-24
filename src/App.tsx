import "./App.css";
import { useEffect } from "react";
// import global comoponents
import Header from "./Components/Header";
import Navigation from "./Components/Navigation";
import GuardRoute from "./Components/GuardRoute";
// import each page component
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import JobSearch from "./pages/JobSearch";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import JobDetail from "./pages/JobDetail";
import JobApplication from "./pages/JobApplication";
import SavedJobs from "./pages/SavedJobs";
import { closeAll } from "./store/AppSlice";
import { modalIsClose } from "./store/AppSlice";
// import packages, react-router-dom for route management and redux for global state management
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { RootState } from "./store";

// Define user type
interface User {
  name: string;
  occupation: string;
  email: string;
  phone: string;
  location: string;
  twitter?: string;
  dribble?: string;
  behance?: string;
}

function App() {
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state: RootState) => state.app.isModalOpen);
  const isLogedin = useSelector((state: RootState) => state.app.isLogedin);
  const menuToggle = useSelector((state: RootState) => state.app.genMenu);
  const location = useLocation();
  const path = location.pathname; 
  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("modalIsOpen");
    } else {
      document.body.classList.remove("modalIsOpen");
    }
  }, [isModalOpen]);

  const user: User = {
    name: "Genesis Anosike",
    occupation: "UI/UX Designer",
    email: "anosikegenesis@gmail.com",
    phone: "0801 - 234 - 5678",
    location: "Lagos, Nigeria",
    twitter: "@Anosike_UI",
    dribble: "https://dribbble.com",
    behance: "https://www.behance.net",
  };

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      dispatch(modalIsClose());
      dispatch(closeAll());
    };
    scrollToTop();
  }, [path, dispatch]);

  return (
    <>
      {/* Conditionally render Header and Navigation component */}
      {path !== "/signup" && path !== "/signin" && (
        <>
          <Header />
          <Navigation />
        </>
      )}
      <>
        {/* SMALL SCREEN NAVIGATION */}
        {menuToggle && (
          <div
            className="menuOverlay"
            onClick={() => dispatch(closeAll())}
          ></div>
        )}
        {path !== "/signup" && path !== "/signin" && <Navigation />}
      </>

      <Routes>
        <Route
          path="/"
          element={
            <GuardRoute element={Dashboard} auth={isLogedin} user={user} />
          }
        />
        <Route
          path="/jobs"
          element={
            <GuardRoute element={JobSearch} auth={isLogedin} user={user} />
          }
        />
        <Route
          path="/profile"
          element={
            isLogedin ? (
              <Profile />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="/jobs/:id"
          element={
            <GuardRoute element={JobDetail} auth={isLogedin} user={user} />
          }
        />
        <Route
          path="/jobs/:id/apply"
          element={
            <GuardRoute element={JobApplication} auth={isLogedin} user={user} />
          }
        />
        <Route
          path="/saved-jobs/"
          element={
            <GuardRoute element={SavedJobs} auth={isLogedin} user={user} />
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </>
  );
}

export default App;
