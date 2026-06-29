/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';

// Pages
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Dashboard } from './pages/Dashboard';
import { Assessment } from './pages/Assessment';
import { GapAnalysis } from './pages/GapAnalysis';
import { Recommendations } from './pages/Recommendations';
import { Roadmap } from './pages/Roadmap';
import { Progress } from './pages/Progress';
import { Profile } from './pages/Profile';
import { AIMentor } from './pages/AIMentor';

// Router Protected Gate Wrapper
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useApp();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Landing & Authentication */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Private Core Application Panels */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/assessment" element={<ProtectedRoute><Assessment /></ProtectedRoute>} />
          <Route path="/gap-analysis" element={<ProtectedRoute><GapAnalysis /></ProtectedRoute>} />
          <Route path="/recommendations" element={<ProtectedRoute><Recommendations /></ProtectedRoute>} />
          <Route path="/roadmap" element={<ProtectedRoute><Roadmap /></ProtectedRoute>} />
          <Route path="/progress" element={<ProtectedRoute><Progress /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/mentor" element={<ProtectedRoute><AIMentor /></ProtectedRoute>} />

          {/* Safety Catch-all Navigation */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

