import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import EntrepreneurDashboard from "./pages/dashboard/EntrepreneurDashboard";
import InvestorDashboard from "./pages/dashboard/InvestorDashboard";
import NewModule from "./pages/NewModule";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import InvestorsPage from "./pages/investors/InvestorsPage";
import { PaymentsPage } from "./pages/payments/PaymentsPage";
import { MessagesPage } from "./pages/messages/MessagesPage";
import { ChatPage } from "./pages/chat/ChatPage";
import { DocumentsPage } from "./pages/documents/DocumentsPage";
import { DealsPage } from "./pages/deals/DealsPage";
import { SettingsPage } from "./pages/settings/SettingsPage";
import { HelpPage } from "./pages/help/HelpPage";
import { EntrepreneursPage } from "./pages/entrepreneurs/EntrepreneursPage";
import { EntrepreneurProfile } from "./pages/profile/EntrepreneurProfile";
import { InvestorProfile } from "./pages/profile/InvestorProfile";
import  VideoCallPage  from "./pages/dashboard/VideoCallPage";
import { NotificationsPage} from "./pages/notifications/NotificationsPage"

const AppContent: React.FC = () => {
  const location = useLocation();
  const hideSidebar = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="flex min-h-screen">

      <div className={`flex-1 p-6 bg-gray-50 ${hideSidebar ? 'flex justify-center items-center' : ''}`}>
        <Routes>
          {/* Default redirect to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Auth Pages */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected dashboard layout */}
           <Route path="/" element={<DashboardLayout />}>
            <Route path="/chat/:userId" element={<ChatPage />} />
          {/* Dashboards */}
          <Route path="/dashboard/entrepreneur" element={<EntrepreneurDashboard />} />
          <Route path="/dashboard/investor" element={<InvestorDashboard />} />
            
          {/*other pages */}
           <Route path="/investors" element={<InvestorsPage />} />
           <Route path="/payments" element={<PaymentsPage />} />
           <Route path="/messages" element={<MessagesPage />} />
           <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/deals" element={<DealsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/entrepreneurs" element={<EntrepreneursPage />} />
          <Route path="/profile/entrepreneur/:id" element={<EntrepreneurProfile />} />
          <Route path="/profile/investor/:id" element={<InvestorProfile />} />
          <Route path="/notifications/" element={<NotificationsPage/>} />
          <Route path="/dashboard/videocallpage" element={<VideoCallPage />} />
          {/*newmodule */}
          <Route path="/newmodule" element={<NewModule />} />
          
          </Route>
          
          {/* Catch all */}
          <Route path="*" element={<h1>404 Not Found</h1>} />
          
        </Routes>
      </div>
    </div>
  );
};

const App: React.FC = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;