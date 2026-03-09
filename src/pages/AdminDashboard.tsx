import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Users, TrendingUp, Briefcase, BarChart3, ChevronLeft, Clock } from 'lucide-react';
import { SCHOOLS, INTERVIEW_RECORDS, WEEKLY_INTERVIEW_DATA, CLASS_SCORES, SCORE_DISTRIBUTION } from '../data/mockData';

const AdminDashboard = () => {
  const [currentSchoolId, setCurrentSchoolId] = useState<number | null>(null);
  const [adminUser, setAdminUser] = useState<any>(null);
  const [schoolData, setSchoolData] = useState<any>(null);

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem('adminUser') || '{}');
    setAdminUser(admin);
    
    if (admin.role === 'super' && !currentSchoolId) {
      setCurrentSchoolId(1);
    } else if (admin.role !== 'super') {
      setCurrentSchoolId(admin.schoolId);
    }
  }, []);

  useEffect(() => {
    if (currentSchoolId) {
      const school = SCHOOLS.find(s => s.id === currentSchoolId);
      setSchoolData(school);
    }
  }, [currentSchoolId]);

  // 过滤当前学校的数据
  const filteredRecords = currentSchoolId 
    ? INTERVIEW_RECORDS.filter(r => r.studentId <= 3) // 简化：假设学生ID 1-3 属于当前学校
    : INTERVIEW_RECORDS;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* 顶部 */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center mb-6">
            <Link to="/admin" className="mr-4 text-white hover:text-blue-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <h1 className="text-3xl font-bold">仪表盘</h1>
          </div>
          
          {adminUser?.role === 'super' && (
            <div className="flex items-center gap-2 text-white/90">
              <span>选择学校：</span>
              <select
                value={currentSchoolId || ''}
                onChange={(e) => setCurrentSchoolId(parseInt(e.target.value))}
                className="px-3 py-1 bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
              >
                {SCHOOLS.map(school => (
                  <option key={school.id} value={school.id}>{school.name}</option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* 顶部卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">在线设备</p>
                <p className="text-2xl font-bold text-gray-800">3</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">今日面试</p>
                <p className="text-2xl font-bold text-gray-800">45</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">本周用户</p>
                <p className="text-2xl font-bold text-gray-800">128</p>
              </div>
            </div>
          </div>
        </div>

        {/* 趋势图表 */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
            近7天面试次数趋势
          </h2>
          
          <div className="h-64 flex items-end justify-between gap-2">
            {WEEKLY_INTERVIEW_DATA.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center group">
                <div className="relative w-full max-w-12">
                  <div 
                    className="bg-gradient-to-t from-blue-500 to-purple-600 rounded-t-lg transition-all duration-300 hover:from-blue-600 hover:to-purple-700"
                    style={{ height: `${(item.count / 60) * 100}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.count}次
                    </div>
                  </div>
                </div>
                <span className="text-sm text-gray-600 mt-2">{item.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 快捷入口 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Link to="/admin/records" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">查看面试记录</h3>
                <p className="text-sm text-gray-600 mt-1">查看所有面试记录和详情</p>
              </div>
            </div>
          </Link>
          
          <Link to="/admin/statistics" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">查看统计数据</h3>
                <p className="text-sm text-gray-600 mt-1">查看各专业平均分和得分分布</p>
              </div>
            </div>
          </Link>
        </div>

        {/* 最近面试记录 */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <Clock className="h-5 w-5 mr-2 text-blue-600" />
            最近面试记录
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-600 font-medium">学生姓名</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-medium">班级</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-medium">时间</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-medium">得分</th>
                  <th className="text-left py-3 px-4 text-gray-600 font-medium">操作</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.slice(0, 5).map((record) => (
                  <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-800">{record.studentName}</td>
                    <td className="py-3 px-4 text-gray-600">{record.studentClass}</td>
                    <td className="py-3 px-4 text-gray-600">{record.time}</td>
                    <td className="py-3 px-4">
                      <span className={`font-bold ${
                        record.score >= 90 ? 'text-green-600' :
                        record.score >= 80 ? 'text-blue-600' :
                        record.score >= 70 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {record.score}分
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Link to="/admin/records" className="text-blue-600 hover:text-blue-700 text-sm">
                        查看详情
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
