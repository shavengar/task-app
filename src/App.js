import "./App.css";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { connect } from "react-redux";
import useAPI from "./hooks/useAPI";
import Menu from "./components/Menu";
import LoginPage from "./components/LoginPage";
import ProfilePage from "./components/ProfilePage";
import ChallengePage from "./components/ChallengePage";
import HistoryPage from "./components/HistoryPage";
import MuseumPage from "./components/MuseumPage";
import FriendsPage from "./components/FriendsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect } from "react";
import { setArtCollection } from "./redux/actions/art.actions";
import { setProjects } from "./redux/actions/challenge.actions";

function App({ user, setProjects, setArtCollection }) {
    const { getHabitsByUserId } = useAPI();
    const { getArtByHabitId } = useAPI();
    useEffect(() => {
        const loadUserInfo = async () => {
            if (user) {
                const res = await getHabitsByUserId(user.id);
                if (!res.data.success) {
                    return console.log(user.data.error);
                } else {
                    let proj = res.data.data;
                    proj = proj.filter((project) => !project.completed);
                    console.log(proj);

                    setProjects(res.data.data);
                    const userHabits = res.data.data.map((habit) => habit.id);
                    const userArt = await getArtByHabitId(userHabits);
                    if (!userArt.data.success) {
                        console.log(userArt.data.error);
                    } else {
                        setArtCollection(userArt.data.data);
                    }
                }
            }
        };
        loadUserInfo();
    }, [user]);
    return (
        <Router>
            <h1 className="headerFont banner">van Gogh Get Your Work Done</h1>
            <Menu />
            <Routes>
                <Route
                    path="/login"
                    element={
                        <ProtectedRoute isPrivate={false}>
                            <LoginPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute isPrivate={true}>
                            <ProfilePage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/challenge"
                    element={
                        <ProtectedRoute isPrivate={true}>
                            <ChallengePage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/history"
                    element={
                        <ProtectedRoute isPrivate={true}>
                            <HistoryPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/museum"
                    element={
                        <ProtectedRoute isPrivate={true}>
                            <MuseumPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/friends"
                    element={
                        <ProtectedRoute isPrivate={true}>
                            <FriendsPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="*"
                    element={
                        <ProtectedRoute>
                            <Navigate to="/profile" />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

const mapDispatchToProps = {
    setArtCollection,
    setProjects,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
