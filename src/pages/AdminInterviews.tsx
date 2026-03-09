import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Search, Filter, Eye } from 'lucide-react';
import { SCHOOLS, DEPARTMENTS, CLASSES, INTERVIEW_RECORDS } from '../data/mockData';

const AdminInterviews = () => {
  const [records, setRecords] = useState<any[]>([]);
  const [currentSchoolId, setCurrentSchoolId] = useState<number | null>(null);
  const [currentDepartmentId, setCurrentDepartmentId] = useState<number | null>(null);
  const [currentClassId, setCurrentClassId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [showDetail, setShowDetail] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem('adminUser') || '{}');
    
    if (admin.role === 'super') {
      // 超级管理员查看所有记录
      setRecords(INTERVIEW_RECORDS);
    } else {
      // 学校管理员只查看本校记录
      setRecords(INTERVIEW_RECORDS.filter(r => r.studentId <= 3)); // 简化：假设学生ID 1-3 属于当前学校
      setCurrentSchoolId(admin.schoolId);
    }
  }, []);

  const handleViewDetail = (record: any) => {
    setSelectedRecord(record);
    setShowDetail(true);
  };

  const filteredRecords = records.filter(record => {
    const matchesSearch = record.studentName.includes(searchTerm) || 
                         record.studentId?.includes(searchTerm);
    const matchesSchool = currentSchoolId ? record.studentId <= 3 : true;
    const matchesDept = currentDepartmentId ? true : true; // 简化
    const matchesClass = currentClassId ? true : true; // 简化
    
    return matchesSearch && matchesSchool && matchesDept && matchesClass;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* 顶部 */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center mb-6">
            <Link to="/admin/dashboard" className="mr-4 text-white hover:text-blue-200">
              <ChevronLeft className="h-6 w-6" />
            </Link>
            <h1 className="text-3xl font-bold">面试记录列表</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-white/90">
              <span>学校：</span>
              <select
                value={currentSchoolId || ''}
                onChange={(e) => {
                  setCurrentSchoolId(parseInt(e.target.value));
                  setCurrentDepartmentId(null);
                  setCurrentClassId(null);
                }}
                className="px-3 py-1 bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
              >
                {SCHOOLS.map(school => (
                  <option key={school.id} value={school.id}>{school.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* 搜索和筛选 */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="搜索学生姓名..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex gap-2">
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="h-5 w-5 mr-2 text-gray-600" />
            <span className="text-gray-700">筛选</span>
          </button>
        </div>

        {/* 面试记录列表 */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b-2 border-gray-200">
                <th className="text-left py-4 px-6 text-gray-600 font-medium">学生姓名</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">学号</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">班级</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">面试时间</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">岗位</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">得分</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record) => (
                <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6 font-medium text-gray-800">{record.studentName}</td>
                  <td className="py-4 px-6 text-gray-600 font-mono">{record.studentId || '2024001'}</td>
                  <td className="py-4 px-6 text-gray-600">{record.studentClass}</td>
                  <td className="py-4 px-6 text-gray-600">{record.time}</td>
                  <td className="py-4 px-6 text-gray-600">{record.jobName}</td>
                  <td className="py-4 px-6">
                    <span className={`font-bold ${
                      record.score >= 90 ? 'text-green-600' :
                      record.score >= 80 ? 'text-blue-600' :
                      record.score >= 70 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {record.score}分
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => handleViewDetail(record)}
                      className="flex items-center px-3 py-1 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      查看详情
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 详情弹窗 */}
      {showDetail && selectedRecord && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">面试详情</h2>
              <button
                onClick={() => setShowDetail(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">学生姓名</p>
                  <p className="font-semibold text-gray-800">{selectedRecord.studentName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">学号</p>
                  <p className="font-semibold text-gray-800">{selectedRecord.studentId || '2024001'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">班级</p>
                  <p className="font-semibold text-gray-800">{selectedRecord.studentClass}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">面试时间</p>
                  <p className="font-semibold text-gray-800">{selectedRecord.time}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">面试岗位</p>
                  <p className="font-semibold text-gray-800">{selectedRecord.jobName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">综合得分</p>
                  <p className={`font-bold text-2xl ${
                    selectedRecord.score >= 90 ? 'text-green-600' :
                    selectedRecord.score >= 80 ? 'text-blue-600' :
                    selectedRecord.score >= 70 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {selectedRecord.score}分
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">维度评分</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">完整度</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${selectedRecord.dimensionScores?.completeness || 80}%` }}
                      ></div>
                    </div>
                    <p className="text-right mt-2 font-bold text-blue-600">
                      {selectedRecord.dimensionScores?.completeness || 80}分
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">流畅度</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-500 h-2 rounded-full"
                        style={{ width: `${selectedRecord.dimensionScores?.fluency || 85}%` }}
                      ></div>
                    </div>
                    <p className="text-right mt-2 font-bold text-purple-600">
                      {selectedRecord.dimensionScores?.fluency || 85}分
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">专业度</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${selectedRecord.dimensionScores?.professional || 82}%` }}
                      ></div>
                    </div>
                    <p className="text-right mt-2 font-bold text-green-600">
                      {selectedRecord.dimensionScores?.professional || 82}分
                    </p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">自信度</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-yellow-500 h-2 rounded-full"
                        style={{ width: `${selectedRecord.dimensionScores?.confidence || 88}%` }}
                      ></div>
                    </div>
                    <p className="text-right mt-2 font-bold text-yellow-600">
                      {selectedRecord.dimensionScores?.confidence || 88}分
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">问答实录</h3>
                <div className="space-y-4">
                  {[
                    "请做一下自我介绍，包括你的教育背景和专业技能。",
                    "描述一个你最成功的项目经历，你在其中扮演了什么角色？",
                    "你在团队合作中遇到过哪些挑战？是如何解决的？",
                    "你对未来3-5年的职业发展有什么规划？",
                    "你认为自己最大的优点和缺点是什么？"
                  ].map((question, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4">
                      <p className="text-sm text-gray-600 mb-1">问题：{question}</p>
                      <p className="text-gray-800">
                        回答：{index === 0 
                          ? "大家好，我是王小明，是南京大学软件工程22级的学生。在校期间我主要学习了Java、Python等编程语言，参与过多个项目开发。" 
                          : "（此处为模拟回答内容）"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 text-center">
              <button
                onClick={() => setShowDetail(false)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminInterviews;
