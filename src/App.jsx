import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import CreateMovie from "./pages/CreateMovie";
import EditMovie from "./pages/EditMovie";
import MovieList from "./pages/MovieList";

import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";
import Layout from "./layout/Layout";
import EmptyState from "./components/EmptyState";
import Auth from "./lib/Auth";

export default function App() {
  return (
    <Router>
      <Auth />
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route element={<Layout />}>
          <Route path="/" element={<MovieList />} />
          <Route path="/empty" element={<EmptyState />} />
          <Route path="/create" element={<CreateMovie />} />
          <Route path="/edit/:id" element={<EditMovie />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
