import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, School, Users, Briefcase, BarChart3, LogOut, Menu, X } from 'lucide-react';
import { SCHOOLS } from '../data/mockData';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentSchoolId, setCurrentSchoolId] = useState<number | null>(null);
  const [adminUser, setAdminUser] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem('adminUser') || '{}');
    setAdminUser(admin);
    
    if (admin.role === 'super' && !currentSchoolId) {
      setCurrentSchoolId(1);
    } else if (admin.role !== 'super') {
      setCurrentSchoolId(admin.schoolId);
    }
  }, []);

  const handleSchoolChange = (schoolId: number) => {
    setCurrentSchoolId(schoolId);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  // 检查当前路径是否为登录页
  const isLoginPage = location.pathname === '/admin/login';

  const menuItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: '仪表盘' },
    { path: '/admin/schools', icon: School, label: '学校管理' },
    { path: '/admin/departments', icon: Users, label: '院系管理' },
    { path: '/admin/classes', icon: Users, label: '班级管理' },
    { path: '/admin/students', icon: Users, label: '学生管理' },
    { path: '/admin/interviews', icon: Briefcase, label: '面试记录' },
    { path: '/admin/statistics', icon: BarChart3, label: '数据统计' },
  ];

  if (isLoginPage) {
    return <Outlet />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* 移动端菜单按钮 */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 bg-white rounded-lg shadow-lg"
        >
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* 侧边栏 */}
      <aside 
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <Link to="/admin/dashboard" className="text-xl font-bold text-blue-600">
            AI职业规划一体机
          </Link>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-4 border-b border-gray-200">
          {adminUser?.role === 'super' && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">选择学校</label>
              <select
                value={currentSchoolId || ''}
                onChange={(e) => handleSchoolChange(parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {SCHOOLS.map(school => (
                  <option key={school.id} value={school.id}>{school.name}</option>
                ))}
              </select>
            </div>
          )}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">管</span>
            </div>
            <div>
              <p className="font-semibold text-gray-800">{adminUser?.username || '管理员'}</p>
              <p className="text-xs text-gray-500">
                {adminUser?.role === 'super' ? '超级管理员' : 
                 adminUser?.role === 'admin' ? '学校管理员' : ''}
              </p>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-blue-50 text-blue-600 font-medium' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="h-5 w-5 mr-3" />
            退出登录
          </button>
        </div>
      </aside>

      {/* 主内容区 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 顶部导航 */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">
            {menuItems.find(item => item.path === location.pathname)?.label || '仪表盘'}
          </h1>
        </header>

        {/* 页面内容 */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>

      {/* 遮罩层 */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;
