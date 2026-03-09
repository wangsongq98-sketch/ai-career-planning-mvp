import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Briefcase, TrendingUp, DollarSign, Users } from 'lucide-react';
import { JOBS } from '../data/mockData';

const StudentJobs = () => {
  const navigate = useNavigate();
  const [jobs] = useState(JOBS);

  const handleJobSelect = (jobId: number) => {
    navigate(`/student/interview?jobId=${jobId}`);
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
            <h1 className="text-3xl font-bold">岗位选择</h1>
          </div>
          <p className="text-blue-100">选择您想要面试的岗位，开启职业规划之旅</p>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-8">
        {/* 岗位卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <div 
              key={job.id} 
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border-2 border-transparent hover:border-blue-500"
              onClick={() => handleJobSelect(job.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Briefcase className="h-8 w-8 text-white" />
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <TrendingUp className="h-4 w-4" />
                  <span>热门</span>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 mb-2">{job.name}</h3>
              <p className="text-gray-600 mb-4">{job.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {job.requiredSkills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>50+人申请</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    <span>8K-15K</span>
                  </div>
                </div>
                <span className="text-blue-600 font-medium hover:text-blue-700 flex items-center">
                  开始面试
                  <ChevronLeft className="h-4 w-4 rotate-180" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 推荐岗位 */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">推荐岗位</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.slice(0, 2).map((job) => (
              <div 
                key={job.id} 
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <Briefcase className="h-6 w-6 text-white" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{job.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{job.description}</p>
                <button
                  onClick={() => handleJobSelect(job.id)}
                  className="w-full py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-colors"
                >
                  立即面试
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentJobs;
