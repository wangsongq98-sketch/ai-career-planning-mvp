import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, LayoutDashboard, Users, BarChart3, LogOut, School } from 'lucide-react';
import { SCHOOLS, DEMO_STUDENT } from '../data/mockData';

interface HeaderProps {
  currentUser?: any;
  adminUser?: any;
  onLogout?: () => void;
  currentSchoolId?: number;
  onSchoolChange?: (schoolId: number) => void;
}

const Header: React.FC<HeaderProps> = ({ currentUser, adminUser, onLogout, currentSchoolId, onSchoolChange }) => {
  if (adminUser?.role === 'super') {
    return (
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link to="/admin/dashboard" className="text-2xl font-bold text-blue-600">
                AI职业规划一体机
              </Link>
              <div className="flex items-center space-x-2">
                <School className="h-5 w-5 text-gray-600" />
                <select
                  value={currentSchoolId || ''}
                  onChange={(e) => onSchoolChange?.(parseInt(e.target.value))}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">选择学校</option>
                  {SCHOOLS.map((school) => (
                    <option key={school.id} value={school.id}>
                      {school.name}
                    </option>
                  ))}
                </select>
              </div>
              <nav className="flex space-x-6">
                <Link to="/admin/dashboard" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                  <LayoutDashboard className="h-5 w-5 mr-2" />
                  仪表盘
                </Link>
                <Link to="/admin/schools" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                  <School className="h-5 w-5 mr-2" />
                  学校管理
                </Link>
                <Link to="/admin/departments" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                  <Users className="h-5 w-5 mr-2" />
                  院系管理
                </Link>
                <Link to="/admin/students" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                  <Users className="h-5 w-5 mr-2" />
                  学生管理
                </Link>
                <Link to="/admin/interviews" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                  <Briefcase className="h-5 w-5 mr-2" />
                  面试记录
                </Link>
                <Link to="/admin/statistics" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  数据统计
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-gray-600">
                <span className="mr-2">管理员</span>
                <span className="font-medium">{adminUser?.username || 'super'}</span>
              </div>
              {onLogout && (
                <button
                  onClick={onLogout}
                  className="flex items-center px-4 py-2 text-gray-600 hover:text-red-600 transition-colors"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  退出登录
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
    );
  }

  if (adminUser) {
    return (
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link to="/admin/dashboard" className="text-2xl font-bold text-blue-600">
                AI职业规划一体机
              </Link>
              <nav className="flex space-x-6">
                <Link to="/admin/dashboard" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                  <LayoutDashboard className="h-5 w-5 mr-2" />
                  仪表盘
                </Link>
                <Link to="/admin/departments" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                  <Users className="h-5 w-5 mr-2" />
                  院系管理
                </Link>
                <Link to="/admin/students" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                  <Users className="h-5 w-5 mr-2" />
                  学生管理
                </Link>
                <Link to="/admin/interviews" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                  <Briefcase className="h-5 w-5 mr-2" />
                  面试记录
                </Link>
                <Link to="/admin/statistics" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  数据统计
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-gray-600">
                <span className="mr-2">管理员</span>
                <span className="font-medium">{adminUser?.username || 'admin'}</span>
              </div>
              {onLogout && (
                <button
                  onClick={onLogout}
                  className="flex items-center px-4 py-2 text-gray-600 hover:text-red-600 transition-colors"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  退出登录
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/student" className="text-2xl font-bold">
            AI职业规划一体机
          </Link>
          <div className="flex items-center space-x-4">
            {currentUser ? (
              <>
                <span className="text-white/90">
                  {currentUser.name} - {currentUser.department} {currentUser.class}
                </span>
                {onLogout && (
                  <button
                    onClick={onLogout}
                    className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                  >
                    退出登录
                  </button>
                )}
              </>
            ) : (
              <Link
                to="/student/login"
                className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors"
              >
                登录
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
