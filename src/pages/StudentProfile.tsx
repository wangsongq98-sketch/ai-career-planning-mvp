import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, LogOut, GraduationCap, Mail, Phone } from 'lucide-react';

const StudentProfile = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    setCurrentUser(user);
  }, []);

  if (!currentUser) {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/student/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* 顶部 */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center mb-6">
            <Link to="/student" className="mr-4 text-white hover:text-blue-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <h1 className="text-3xl font-bold">个人中心</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-8">
        {/* 个人信息卡片 */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="h-12 w-12 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{currentUser.name}</h2>
              <p className="text-gray-600">{currentUser.studentId}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <GraduationCap className="h-6 w-6 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">学校</p>
                <p className="font-semibold text-gray-800">{currentUser.schoolName || '南京大学'}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <GraduationCap className="h-6 w-6 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">院系</p>
                <p className="font-semibold text-gray-800">{currentUser.department}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <GraduationCap className="h-6 w-6 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">班级</p>
                <p className="font-semibold text-gray-800">{currentUser.class}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <GraduationCap className="h-6 w-6 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">注册时间</p>
                <p className="font-semibold text-gray-800">{currentUser.registerTime || '2022-09-01'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 统计数据 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{currentUser.interviewCount}</div>
            <div className="text-sm text-gray-600">面试次数</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">{currentUser.averageScore}</div>
            <div className="text-sm text-gray-600">平均得分</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">85%</div>
            <div className="text-sm text-gray-600">提升率</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-yellow-600 mb-2">3</div>
            <div className="text-sm text-gray-600">优秀证书</div>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex gap-4">
          <button
            onClick={handleLogout}
            className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 text-white py-4 rounded-xl font-semibold hover:from-red-600 hover:to-pink-700 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <LogOut className="h-5 w-5" />
            退出登录
          </button>
          
          <button
            className="flex-1 bg-white border-2 border-blue-600 text-blue-600 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-200"
          >
            编辑资料
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
