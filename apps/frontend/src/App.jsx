import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Landing from './pages/Landing';
import Storytelling from './pages/Storytelling';
import MindmapViewer from './pages/MindmapViewer';
import ArchitectureViewer from './pages/ArchitectureViewer';
import WhatILookFor from './pages/WhatILookFor';
import DeveloperHelp from './pages/DeveloperHelp';
import FinancialHelp from './pages/FinancialHelp';
import Support from './pages/Support';
import ADHDAries from './pages/ADHDAries';
import QrPoster from './pages/QrPoster';
import AdminLogin from './pages/Admin/Login';
import AdminDashboard from './pages/Admin/Dashboard';
import Navigation from './components/Navigation';
import StatusBar from './components/StatusBar';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Landing />} />
        <Route path="/storytelling" element={<Storytelling />} />
        <Route path="/mindmap" element={<MindmapViewer />} />
        <Route path="/architecture" element={<ArchitectureViewer />} />
        <Route path="/what-i-look-for" element={<WhatILookFor />} />
        <Route path="/developer-help" element={<DeveloperHelp />} />
        <Route path="/financial-help" element={<FinancialHelp />} />
        <Route path="/support" element={<Support />} />
        <Route path="/adhd-aries" element={<ADHDAries />} />
        <Route path="/qr-poster" element={<QrPoster />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-modern-dark">
        <StatusBar />
        <Navigation />
        <main>
          <AnimatedRoutes />
        </main>
      </div>
    </Router>
  );
}

export default App;
