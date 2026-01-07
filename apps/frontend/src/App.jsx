import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Storytelling from './pages/Storytelling';
import WhatILookFor from './pages/WhatILookFor';
import DeveloperHelp from './pages/DeveloperHelp';
import FinancialHelp from './pages/FinancialHelp';
import Support from './pages/Support';
import ADHDAries from './pages/ADHDAries';
import AdminLogin from './pages/Admin/Login';
import AdminDashboard from './pages/Admin/Dashboard';
import Navigation from './components/Navigation';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50 dark:from-dark-50 dark:via-dark-100 dark:to-dark-200">
        <Navigation />
        <main className="pt-16 lg:pt-20">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/storytelling" element={<Storytelling />} />
            <Route path="/what-i-look-for" element={<WhatILookFor />} />
            <Route path="/developer-help" element={<DeveloperHelp />} />
            <Route path="/financial-help" element={<FinancialHelp />} />
            <Route path="/support" element={<Support />} />
            <Route path="/adhd-aries" element={<ADHDAries />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
