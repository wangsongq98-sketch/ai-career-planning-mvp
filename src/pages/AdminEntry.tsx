import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Briefcase, BarChart3, School, GraduationCap } from 'lucide-react';

const AdminEntry = () => {
  const navigate = useNavigate();
  const [adminUser, setAdminUser] = useState<any>(null);

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem('adminUser') || '{}');
    setAdminUser(admin);
    
    // 如果已经登录，直接跳转到仪表盘
    if (admin.role) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleLogin = () => {
    navigate('/admin/login');
  };

  const handleStudentClick = () => {
    // 检查是否已登录学生账号
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (user.name) {
      // 已登录，跳转到学生首页
      navigate('/student');
    } else {
      // 未登录，跳转到学生登录页
      navigate('/student/login');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center px-4">
      <div className="max-w-6xl w-full">
        {/* 顶部导航 */}
        <nav className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <LayoutDashboard className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-800">AI职业规划一体机</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleStudentClick}
              className="px-6 py-2 text-gray-600 hover:text-blue-600 font-medium transition-colors"
            >
              学生端
            </button>
            <button
              onClick={handleLogin}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
            >
              管理登录
            </button>
          </div>
        </nav>

        {/* 主要内容 */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            管理平台
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            AI职业规划一体机管理平台，为您提供全面的数据分析和用户管理功能
          </p>
          <button
            onClick={handleLogin}
            className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl"
          >
            立即登录管理后台
          </button>
        </div>

        {/* 功能卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
              <LayoutDashboard className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">仪表盘</h3>
            <p className="text-gray-600">
              实时数据可视化，查看关键指标和趋势图表，全面了解系统运行状态
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
              <School className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">学校管理</h3>
            <p className="text-gray-600">
              管理多个学校账户，配置学校信息，分配管理员权限
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6">
              <GraduationCap className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">学生管理</h3>
            <p className="text-gray-600">
              查看和管理所有学生信息，查看面试记录和成绩统计
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-14 h-14 bg-yellow-100 rounded-xl flex items-center justify-center mb-6">
              <Users className="h-8 w-8 text-yellow-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">组织架构</h3>
            <p className="text-gray-600">
              管理院系和班级结构，维护学校组织架构信息
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
              <Briefcase className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">面试记录</h3>
            <p className="text-gray-600">
              查看所有学生的面试记录，分析面试数据和结果
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-6">
              <BarChart3 className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">数据统计</h3>
            <p className="text-gray-600">
              多维度数据分析，查看各班级平均分和得分分布
            </p>
          </div>
        </div>

        {/* 底部信息 */}
        <div className="text-center text-gray-500">
          <p className="mb-4">AI职业规划一体机管理平台 v1.0</p>
          <p>© 2024 AI职业规划一体机. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminEntry;
