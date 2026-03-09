import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, BarChart3, TrendingUp, MessageSquare, RotateCcw } from 'lucide-react';
import { INTERVIEW_REPORTS } from '../data/mockData';

const StudentReport = () => {
  const navigate = useNavigate();
  const [reportData, setReportData] = useState<any>(null);
  const [showDetailed, setShowDetailed] = useState(false);

  useEffect(() => {
    // 使用第一份报告数据
    setReportData(INTERVIEW_REPORTS[1]);
  }, []);

  if (!reportData) {
    return null;
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getBarColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 80) return 'bg-blue-500';
    if (score >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* 顶部 */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center mb-6">
            <Link to="/student" className="mr-4 text-white hover:text-blue-200">
              <ChevronLeft className="h-6 w-6" />
            </Link>
            <h1 className="text-3xl font-bold">面试报告</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-8">
        {/* 综合得分 */}
        <div className="bg-white rounded-xl shadow-lg p-8 text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">综合得分</h2>
          <div className="text-6xl font-bold text-blue-600 mb-2">{reportData.totalScore}</div>
          <div className="text-gray-500">满分100分</div>
        </div>

        {/* 四个维度评分 */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
            四个维度评分
          </h2>
          
          <div className="space-y-6">
            {[
              { name: '回答完整度', score: reportData.dimensions.completeness },
              { name: '表达流畅度', score: reportData.dimensions.fluency },
              { name: '专业知识点', score: reportData.dimensions.professional },
              { name: '自信度', score: reportData.dimensions.confidence }
            ].map((item, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-gray-700">{item.name}</span>
                  <span className={`font-bold ${getScoreColor(item.score)}`}>{item.score}分</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className={`h-4 rounded-full ${getBarColor(item.score)}`}
                    style={{ width: `${item.score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 改进建议 */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
            改进建议
          </h2>
          
          <div className="space-y-4">
            {reportData.suggestions.map((suggestion: string, index: number) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-bold text-sm">{index + 1}</span>
                </div>
                <p className="text-gray-700">{suggestion}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 底部按钮 */}
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/student')}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <RotateCcw className="h-5 w-5" />
            再练一次
          </button>
          
          <button
            onClick={() => setShowDetailed(true)}
            className="flex-1 bg-white border-2 border-blue-600 text-blue-600 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <MessageSquare className="h-5 w-5" />
            查看详细报告
          </button>
        </div>
      </div>

      {/* 详细报告弹窗 */}
      {showDetailed && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">详细报告</h2>
              <button
                onClick={() => setShowDetailed(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                {reportData.qnaList.map((item: any, index: number) => (
                  <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-600 font-bold text-sm">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800 mb-2">问题：{item.question}</p>
                        <p className="text-gray-700 mb-2">回答：{item.answer}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">得分：</span>
                          <span className={`font-bold ${getScoreColor(item.score)}`}>{item.score}分</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 text-center">
              <button
                onClick={() => setShowDetailed(false)}
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

export default StudentReport;
