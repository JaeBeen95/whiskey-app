import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import LoginPage from "@/pages/auth/LoginPage";
import SignupPage from "@/pages/auth/SignupPage";
import DashboardPage from "@/pages/dashboard/DashboardPage";
import CaskListPage from "@/pages/cask/CaskListPage";
import CaskDetailPage from "@/pages/cask/CaskDetailPage";
import ContainerListPage from "@/pages/container/ContainerListPage";
import ContainerDetailPage from "@/pages/container/ContainerDetailPage";
import SpiritListPage from "@/pages/spirit/SpiritListPage";
import SpiritDetailPage from "@/pages/spirit/SpiritDetailPage";
import UserPage from "@/pages/user/UserPage";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/casks" element={<CaskListPage />} />
          <Route path="/casks/:caskId" element={<CaskDetailPage />} />
          <Route path="/containers" element={<ContainerListPage />} />
          <Route path="/containers/:containerId" element={<ContainerDetailPage />} />
          <Route path="/spirits" element={<SpiritListPage />} />
          <Route path="/spirits/:spiritId" element={<SpiritDetailPage />} />
          <Route path="/profile" element={<UserPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
