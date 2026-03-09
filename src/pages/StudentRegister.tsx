import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { School, User, GraduationCap, Lock, CheckCircle, ChevronRight } from 'lucide-react';
import { SCHOOLS, DEPARTMENTS, CLASSES, STUDENTS } from '../data/mockData';

const StudentRegister = () => {
  const navigate = useNavigate();
  const [schoolId, setSchoolId] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [classId, setClassId] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    studentId: '',
    password: '',
    confirmPassword: '',
    grade: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const handleSchoolChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSchoolId(e.target.value);
    setDepartmentId('');
    setClassId('');
    setErrors({});
  };

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDepartmentId(e.target.value);
    setClassId('');
    setErrors({});
  };

  const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setClassId(e.target.value);
    setErrors({});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({});
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!schoolId) newErrors.school = '请选择学校';
    if (!formData.name) newErrors.name = '请输入姓名';
    if (!formData.studentId) newErrors.studentId = '请输入学号';
    if (!formData.password) newErrors.password = '请输入密码';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = '两次密码不一致';
    
    // 检查学号是否已存在
    const existingStudent = STUDENTS.find(s => s.studentId === formData.studentId);
    if (existingStudent) newErrors.studentId = '学号已存在';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // 模拟注册成功
      setSuccess(true);
      
      // 3秒后跳转到首页
      setTimeout(() => {
        localStorage.setItem('currentUser', JSON.stringify({
          id: STUDENTS.length + 1,
          name: formData.name,
          studentId: formData.studentId,
          schoolId: parseInt(schoolId),
          departmentId: parseInt(departmentId),
          classId: parseInt(classId),
          registerTime: new Date().toISOString().split('T')[0]
        }));
        navigate('/student');
      }, 2000);
    }
  };

  const getDepartments = () => {
    return DEPARTMENTS.filter(d => d.schoolId === parseInt(schoolId));
  };

  const getClasses = () => {
    return CLASSES.filter(c => c.departmentId === parseInt(departmentId));
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">注册成功！</h2>
          <p className="text-gray-600 mb-6">正在跳转到首页...</p>
          <div className="animate-pulse">
            <div className="h-2 bg-blue-200 rounded-full w-3/4 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">学生注册</h1>
          <p className="text-gray-600">加入我们，开启你的职业规划之旅</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">学校</label>
            <div className="relative">
              <School className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select
                name="school"
                value={schoolId}
                onChange={handleSchoolChange}
                className={`w-full pl-10 pr-4 py-3 border ${errors.school ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <option value="">请选择学校</option>
                {SCHOOLS.map(school => (
                  <option key={school.id} value={school.id}>{school.name}</option>
                ))}
              </select>
            </div>
            {errors.school && <p className="text-red-500 text-sm mt-1">{errors.school}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">姓名</label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="请输入姓名"
              />
            </div>
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">确认密码</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-3 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="请确认密码"
              />
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>

          {schoolId && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">院系</label>
              <div className="relative">
                <GraduationCap className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <select
                  name="department"
                  value={departmentId}
                  onChange={handleDepartmentChange}
                  className={`w-full pl-10 pr-4 py-3 border ${errors.department ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="">请选择院系</option>
                  {getDepartments().map(dept => (
                    <option key={dept.id} value={dept.id}>{dept.name}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {departmentId && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">班级</label>
              <div className="relative">
                <GraduationCap className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <select
                  name="class"
                  value={classId}
                  onChange={handleClassChange}
                  className={`w-full pl-10 pr-4 py-3 border ${errors.class ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="">请选择班级</option>
                  {getClasses().map(cls => (
                    <option key={cls.id} value={cls.id}>{cls.name}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">入学年份（可选）</label>
            <input
              type="number"
              name="grade"
              value={formData.grade}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="例如：2022"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            注册
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            已有账号？{' '}
            <Link to="/student/login" className="text-blue-600 hover:text-blue-700 font-medium">
              立即登录
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentRegister;
