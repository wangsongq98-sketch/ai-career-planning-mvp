import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, BarChart3, PieChart, TrendingUp } from 'lucide-react';
import { SCHOOLS, CLASS_SCORES, SCORE_DISTRIBUTION } from '../data/mockData';

const AdminStatistics = () => {
  const [currentSchoolId, setCurrentSchoolId] = useState<number | null>(null);
  const [adminUser, setAdminUser] = useState<any>(null);

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem('adminUser') || '{}');
    setAdminUser(admin);
    
    if (admin.role === 'super') {
      setCurrentSchoolId(1);
    } else {
      setCurrentSchoolId(admin.schoolId);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* 顶部 */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center mb-6">
            <Link to="/admin/dashboard" className="mr-4 text-white hover:text-blue-200">
              <ChevronLeft className="h-6 w-6" />
            </Link>
            <h1 className="text-3xl font-bold">数据统计</h1>
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
        {/* 各班级平均分对比 */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
            各班级平均分对比
          </h2>
          <div className="space-y-4">
            {CLASS_SCORES.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-gray-700">{item.class}</span>
                  <span className="font-bold text-blue-600">{item.average}分</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full"
                    style={{ width: `${(item.average / 100) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 得分分布 */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <PieChart className="h-5 w-5 mr-2 text-purple-600" />
            得分分布
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              {SCORE_DISTRIBUTION.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3 ${
                      item.range === '<60' ? 'bg-red-500' :
                      item.range === '60-70' ? 'bg-orange-500' :
                      item.range === '70-80' ? 'bg-yellow-500' :
                      item.range === '80-90' ? 'bg-green-500' : 'bg-blue-500'
                    }`}></div>
                    <span className="font-medium text-gray-700">{item.range}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-bold text-gray-800 mr-4">{item.count}人</span>
                    <span className="text-gray-600">{item.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center">
              <div className="w-48 h-48 rounded-full border-8 border-gray-200 relative flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-800">150</div>
                  <div className="text-sm text-gray-600">总人数</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 能力短板热力图 */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
            能力短板热力图
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-600 font-medium">班级</th>
                  <th className="text-center py-3 px-4 text-gray-600 font-medium">回答完整度</th>
                  <th className="text-center py-3 px-4 text-gray-600 font-medium">表达流畅度</th>
                  <th className="text-center py-3 px-4 text-gray-600 font-medium">专业知识点</th>
                  <th className="text-center py-3 px-4 text-gray-600 font-medium">自信度</th>
                </tr>
              </thead>
              <tbody>
                {CLASS_SCORES.map((row, rowIndex) => (
                  <tr key={rowIndex} className="border-b border-gray-100">
                    <td className="py-3 px-4 font-medium text-gray-800">{row.class}</td>
                    {Object.entries({
                      completeness: Math.floor(row.average * 0.9),
                      fluency: Math.floor(row.average * 1.0),
                      professionalism: Math.floor(row.average * 0.95),
                      confidence: Math.floor(row.average * 0.85)
                    }).map(([key, value], colIndex) => (
                      <td key={colIndex} className="py-3 px-4 text-center">
                        <div 
                          className="inline-block w-8 h-8 rounded-lg"
                          style={{
                            backgroundColor: `rgba(59, 130, 246, ${value / 100})`,
                            color: value > 70 ? '#fff' : '#374151'
                          }}
                        >
                          <div className="flex items-center justify-center h-full text-xs font-medium">
                            {value}
                          </div>
                        </div>
                      </td>
                    ))}
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

export default AdminStatistics;
