import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import LoginPage from "../pages/auth/LoginPage";
import SignupPage from "../pages/auth/SignupPage";

import DashboardPage from "../pages/dashboard/DashboardPage";

import JournalListPage from "../pages/journals/JournalListPage";

import CreateJournalPage from "../pages/journals/CreateJournalPage";
import JournalDetailsPage from "../pages/journals/JournalDetailsPage";
import EditJournalPage from "../pages/journals/EditJournalPage";
import GoalsPage from "../pages/goals/GoalsPage";
import GoalFormPage from "../pages/goals/GoalFormPage";
import GoalDetailsPage from "../pages/goals/GoalDetailsPage";
import EditGoalPage from "../pages/goals/EditGoalPage";
import RoadmapsPage from "../pages/roadmaps/RoadmapsPage";
import RoadmapFormPage from "../pages/roadmaps/RoadmapFormPage";
import RoadmapDetailsPage from "../pages/roadmaps/RoadmapDetailsPage";
import EditRoadmapPage from "../pages/roadmaps/EditRoadmapPage";
import CreateMilestonePage from "../pages/roadmaps/CreateMilestonePage";
import EditMilestonePage from "../pages/roadmaps/EditMilestonePage";
import ProfilePage from "../pages/profile/ProfilePage";
import EditProfilePage from "../pages/profile/EditProfilePage";
import ChangePasswordPage from "../pages/profile/ChangePasswordPage";
import DeleteAccountPage from "../pages/profile/DeleteAccountPage";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import AppLayout from "../components/layout/AppLayout";

export default function AppRoutes() {

  return (
    <BrowserRouter>

    <Routes>

      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />

      <Route
        path="/signup"
        element={
          <PublicRoute>
            <SignupPage />
          </PublicRoute>
        }
      />

      <Route
        element={
          <ProtectedRoute>
            <AppLayout/>
          </ProtectedRoute>
        }
      >

        <Route path="/" element={<DashboardPage />} />

        <Route path="/journals" element={<JournalListPage />} />
        <Route path="/journals/create" element={<CreateJournalPage />} />
        <Route path="/journals/:journalId" element={<JournalDetailsPage />} />
        <Route path="/journals/:journalId/edit" element={<EditJournalPage />} />

        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/edit" element={<EditProfilePage />} />
        <Route path="/profile/password" element={<ChangePasswordPage />} />
        <Route path="/profile/delete-account" element={<DeleteAccountPage />} />

        <Route path="/goals" element={<GoalsPage />} />
        <Route path="/goals/create" element={<GoalFormPage />} />
        <Route path="/goals/:goalId" element={<GoalDetailsPage />} />
        <Route path="/goals/:goalId/edit" element={<EditGoalPage />} />

        <Route path="/roadmaps" element={<RoadmapsPage />} />
        <Route path="/roadmaps/create" element={<RoadmapFormPage />} />
        <Route path="/roadmaps/:roadmapId" element={<RoadmapDetailsPage />} />
        <Route path="/roadmaps/:roadmapId/edit" element={<EditRoadmapPage />} />

        <Route
          path="/roadmaps/:roadmapId/milestones/create"
          element={<CreateMilestonePage />}
        />

        <Route
          path="/milestones/:milestoneId/edit"
          element={<EditMilestonePage />}
        />

      </Route>

    </Routes>
      
    </BrowserRouter>
  );
}