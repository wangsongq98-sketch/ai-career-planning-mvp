import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { School, User, GraduationCap, Lock, Zap } from 'lucide-react';
import { SCHOOLS, STUDENTS, DEMO_STUDENT } from '../data/mockData';

const StudentLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    schoolId: '',
    studentId: '',
    password: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({});
  };

  const handleDemoLogin = () => {
    localStorage.setItem('currentUser', JSON.stringify(DEMO_STUDENT));
    navigate('/student');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    if (!formData.schoolId) newErrors.schoolId = '请选择学校';
    if (!formData.studentId) newErrors.studentId = '请输入学号';
    if (!formData.password) newErrors.password = '请输入密码';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // 模拟登录验证
    const student = STUDENTS.find(s => 
      s.studentId === formData.studentId && 
      s.password === formData.password &&
      s.schoolId === parseInt(formData.schoolId)
    );

    if (student) {
      localStorage.setItem('currentUser', JSON.stringify({
        id: student.id,
        name: student.name,
        studentId: student.studentId,
        schoolId: student.schoolId,
        departmentId: student.departmentId,
        classId: student.classId,
        registerTime: student.registerTime
      }));
      navigate('/student');
    } else {
      setErrors({ login: '学号或密码错误' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">学生登录</h1>
          <p className="text-gray-600">请输入您的账号信息</p>
        </div>

        {errors.login && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-500 text-sm text-center">{errors.login}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">学校</label>
            <div className="relative">
              <School className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select
                name="schoolId"
                value={formData.schoolId}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-3 border ${errors.schoolId ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <option value="">请选择学校</option>
                {SCHOOLS.map(school => (
                  <option key={school.id} value={school.id}>{school.name}</option>
                ))}
              </select>
            </div>
            {errors.schoolId && <p className="text-red-500 text-sm mt-1">{errors.schoolId}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">学号</label>
            <div className="relative">
              <GraduationCap className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="studentId"
                value={formData.studentId}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-3 border ${errors.studentId ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="请输入学号"
              />
            </div>
            {errors.studentId && <p className="text-red-500 text-sm mt-1">{errors.studentId}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">密码</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="请输入密码"
              />
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            登录
          </button>
        </form>

        <div className="mt-6">
          <button
            onClick={handleDemoLogin}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <Zap className="h-5 w-5" />
            立即体验
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            还没有账号？{' '}
            <Link to="/student/register" className="text-blue-600 hover:text-blue-700 font-medium">
              立即注册
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
