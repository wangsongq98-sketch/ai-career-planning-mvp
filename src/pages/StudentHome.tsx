import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, GraduationCap, Award, TrendingUp, Briefcase, ChevronRight, Clock, BarChart3 } from 'lucide-react';
import { STUDENTS, INTERVIEW_RECORDS, JOBS } from '../data/mockData';

const StudentHome = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [recentRecords, setRecentRecords] = useState<any[]>([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    setCurrentUser(user);
    
    if (user.id) {
      const records = INTERVIEW_RECORDS.filter(r => r.studentId === user.id);
      setRecentRecords(records.slice(0, 3));
    }
  }, []);

  if (!currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* 顶部学生信息 */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <User className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{currentUser.name}</h1>
              <p className="text-blue-100">
                {currentUser.department} - {currentUser.class}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-8">
        {/* 数据卡片 */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{currentUser.averageScore}</div>
            <div className="text-sm text-gray-600">平均分</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">{currentUser.interviewCount}</div>
            <div className="text-sm text-gray-600">已练习</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">85%</div>
            <div className="text-sm text-gray-600">提升率</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-yellow-600 mb-2">3</div>
            <div className="text-sm text-gray-600">优秀证书</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">12</div>
            <div className="text-sm text-gray-600">岗位匹配</div>
          </div>
        </div>

        {/* 开始面试按钮 */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/student/jobs')}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-6 rounded-xl font-bold text-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center gap-3"
          >
            <Briefcase className="h-8 w-8" />
            开始面试
          </button>
        </div>

        {/* 最近面试记录 */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <Clock className="h-6 w-6 mr-2 text-blue-600" />
            最近面试记录
          </h2>
          
          {recentRecords.length > 0 ? (
            <div className="space-y-4">
              {recentRecords.map((record) => (
                <div 
                  key={record.id} 
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => navigate('/student/report')}
                >
                  <div>
                    <h3 className="font-semibold text-gray-800">{record.jobName}</h3>
                    <p className="text-sm text-gray-600">{record.time}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{record.score}</div>
                      <div className="text-xs text-gray-600">得分</div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>暂无面试记录</p>
            </div>
          )}
        </div>

        {/* 快速入口 */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          <button
            onClick={() => navigate('/student/jobs')}
            className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow"
          >
            <Briefcase className="h-8 w-8 mx-auto mb-3 text-blue-600" />
            <div className="font-semibold text-gray-800">岗位选择</div>
          </button>
          <button
            onClick={() => navigate('/student/profile')}
            className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow"
          >
            <User className="h-8 w-8 mx-auto mb-3 text-purple-600" />
            <div className="font-semibold text-gray-800">个人中心</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentHome;
