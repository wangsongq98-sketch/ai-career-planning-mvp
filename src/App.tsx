import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import StudentLayout from './components/StudentLayout';
import AdminLayout from './components/AdminLayout';
import StudentRegister from './pages/StudentRegister';
import StudentLogin from './pages/StudentLogin';
import StudentHome from './pages/StudentHome';
import StudentJobs from './pages/StudentJobs';
import StudentInterview from './pages/StudentInterview';
import StudentReport from './pages/StudentReport';
import StudentProfile from './pages/StudentProfile';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminSchools from './pages/AdminSchools';
import AdminDepartments from './pages/AdminDepartments';
import AdminClasses from './pages/AdminClasses';
import AdminStudents from './pages/AdminStudents';
import AdminInterviews from './pages/AdminInterviews';
import AdminStatistics from './pages/AdminStatistics';
import AdminEntry from './pages/AdminEntry';

function App() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [adminUser, setAdminUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    setCurrentUser(user);
    
    const admin = JSON.parse(localStorage.getItem('adminUser') || '{}');
    setAdminUser(admin);
    setLoading(false);
  }, []);

  const handleStudentLogout = () => {
    localStorage.removeItem('currentUser');
    window.location.reload();
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('adminUser');
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Routes>
          {/* 学生端路由 - 使用学生布局 */}
          <Route path="/student" element={<StudentLayout />}>
            <Route index element={<StudentHome />} />
            <Route path="jobs" element={<StudentJobs />} />
            <Route path="interview" element={<StudentInterview />} />
            <Route path="report" element={<StudentReport />} />
            <Route path="profile" element={<StudentProfile />} />
          </Route>
          
          {/* 学生端独立页面 - 不使用布局 */}
          <Route path="/student/register" element={<StudentRegister />} />
          <Route path="/student/login" element={<StudentLogin />} />
          
          {/* 管理端路由 - 使用管理布局 */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminLogin />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="schools" element={<AdminSchools />} />
            <Route path="departments" element={<AdminDepartments />} />
            <Route path="classes" element={<AdminClasses />} />
            <Route path="students" element={<AdminStudents />} />
            <Route path="interviews" element={<AdminInterviews />} />
            <Route path="statistics" element={<AdminStatistics />} />
          </Route>
          
          {/* 管理端独立页面 - 不使用布局 */}
          <Route path="/admin/login" element={<AdminLogin />} />
          
          {/* 管理端入口页 */}
          <Route path="/admin/entry" element={<AdminEntry />} />
          
          {/* 默认路由 - 根据用户角色跳转 */}
          <Route path="/" element={
            adminUser?.role ? 
              <Navigate to="/admin/dashboard" replace /> : 
              <Navigate to="/student" replace />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
