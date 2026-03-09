import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Search, Plus, Edit, Trash2, School, GraduationCap } from 'lucide-react';
import { SCHOOLS, DEPARTMENTS, CLASSES, STUDENTS } from '../data/mockData';

const AdminStudents = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [currentSchoolId, setCurrentSchoolId] = useState<number | null>(null);
  const [currentDepartmentId, setCurrentDepartmentId] = useState<number | null>(null);
  const [currentClassId, setCurrentClassId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    studentId: '',
    departmentId: '',
    classId: '',
    grade: ''
  });

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem('adminUser') || '{}');
    
    if (admin.role === 'super') {
      // 超级管理员查看所有学生
      setStudents(STUDENTS);
    } else {
      // 学校管理员只查看本校学生
      setStudents(STUDENTS.filter(s => s.schoolId === admin.schoolId));
      setCurrentSchoolId(admin.schoolId);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newStudent = {
      id: students.length + 1,
      schoolId: currentSchoolId || 1,
      ...formData
    };
    
    setStudents([...students, newStudent]);
    setShowAddModal(false);
    setFormData({ name: '', studentId: '', departmentId: '', classId: '', grade: '' });
  };

  const handleEdit = (id: number) => {
    alert(`编辑学生ID: ${id}`);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('确定要删除这个学生吗？')) {
      setStudents(students.filter(s => s.id !== id));
    }
  };

  const handleResetPassword = (id: number) => {
    alert(`重置学生ID: ${id} 的密码`);
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.includes(searchTerm) || 
                         student.studentId.includes(searchTerm);
    const matchesSchool = currentSchoolId ? student.schoolId === currentSchoolId : true;
    const matchesDept = currentDepartmentId ? student.departmentId === currentDepartmentId : true;
    const matchesClass = currentClassId ? student.classId === currentClassId : true;
    
    return matchesSearch && matchesSchool && matchesDept && matchesClass;
  });

  const getDepartments = () => {
    if (currentSchoolId) {
      return DEPARTMENTS.filter(d => d.schoolId === currentSchoolId);
    }
    return DEPARTMENTS;
  };

  const getClasses = () => {
    if (currentDepartmentId) {
      return CLASSES.filter(c => c.departmentId === currentDepartmentId);
    }
    return [];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* 顶部 */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center mb-6">
            <Link to="/admin/dashboard" className="mr-4 text-white hover:text-blue-200">
              <ChevronLeft className="h-6 w-6" />
            </Link>
            <h1 className="text-3xl font-bold">学生管理</h1>
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
              placeholder="搜索学生姓名或学号..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <select
            value={currentDepartmentId || ''}
            onChange={(e) => {
              setCurrentDepartmentId(parseInt(e.target.value));
              setCurrentClassId(null);
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">所有院系</option>
            {getDepartments().map(dept => (
              <option key={dept.id} value={dept.id}>{dept.name}</option>
            ))}
          </select>
          
          <select
            value={currentClassId || ''}
            onChange={(e) => setCurrentClassId(parseInt(e.target.value))}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">所有班级</option>
            {getClasses().map(cls => (
              <option key={cls.id} value={cls.id}>{cls.name}</option>
            ))}
          </select>
          
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
          >
            <Plus className="h-5 w-5 mr-2" />
            添加学生
          </button>
        </div>

        {/* 学生列表 */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b-2 border-gray-200">
                <th className="text-left py-4 px-6 text-gray-600 font-medium">学号</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">姓名</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">院系</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">班级</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">注册时间</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">最后面试时间</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => {
                const dept = DEPARTMENTS.find(d => d.id === student.departmentId);
                const cls = CLASSES.find(c => c.id === student.classId);
                return (
                  <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6 font-mono text-gray-600">{student.studentId}</td>
                    <td className="py-4 px-6 font-medium text-gray-800 flex items-center gap-2">
                      <GraduationCap className="h-5 w-5 text-blue-600" />
                      {student.name}
                    </td>
                    <td className="py-4 px-6 text-gray-600">
                      {dept ? dept.name : '-'}
                    </td>
                    <td className="py-4 px-6 text-gray-600">
                      {cls ? cls.name : '-'}
                    </td>
                    <td className="py-4 px-6 text-gray-600">{student.registerTime || '2022-09-01'}</td>
                    <td className="py-4 px-6 text-gray-600">
                      {student.interviewCount > 0 
                        ? '2026-02-20' 
                        : '-'}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(student.id)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                          title="编辑"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleResetPassword(student.id)}
                          className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg"
                          title="重置密码"
                        >
                          <School className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(student.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          title="删除"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* 添加学生弹窗 */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">添加学生</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleAddStudent} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">姓名</label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="请输入姓名"
                      required
                    />
                  </div>
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
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="例如：2024001"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">所属院系</label>
                  <select
                    name="departmentId"
                    value={formData.departmentId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">请选择院系</option>
                    {getDepartments().map(dept => (
                      <option key={dept.id} value={dept.id}>{dept.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">班级</label>
                  <select
                    name="classId"
                    value={formData.classId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">请选择班级</option>
                    {getClasses().map(cls => (
                      <option key={cls.id} value={cls.id}>{cls.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">入学年份</label>
                  <input
                    type="number"
                    name="grade"
                    value={formData.grade}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="例如：2022"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                >
                  添加学生
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminStudents;
