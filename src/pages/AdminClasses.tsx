import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Plus, Edit, Trash2, School, GraduationCap } from 'lucide-react';
import { SCHOOLS, DEPARTMENTS, CLASSES } from '../data/mockData';

const AdminClasses = () => {
  const [classes, setClasses] = useState<any[]>([]);
  const [currentSchoolId, setCurrentSchoolId] = useState<number | null>(null);
  const [currentDepartmentId, setCurrentDepartmentId] = useState<number | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    departmentId: '',
    grade: ''
  });

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem('adminUser') || '{}');
    
    if (admin.role === 'super') {
      // 超级管理员查看所有班级
      setClasses(CLASSES);
    } else {
      // 学校管理员只查看本校班级
      const schoolClasses = CLASSES.filter(c => {
        const dept = DEPARTMENTS.find(d => d.id === c.departmentId);
        return dept && dept.schoolId === admin.schoolId;
      });
      setClasses(schoolClasses);
      setCurrentSchoolId(admin.schoolId);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddClass = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newClass = {
      id: classes.length + 1,
      departmentId: parseInt(formData.departmentId),
      ...formData
    };
    
    setClasses([...classes, newClass]);
    setShowAddModal(false);
    setFormData({ name: '', departmentId: '', grade: '' });
  };

  const handleEdit = (id: number) => {
    alert(`编辑班级ID: ${id}`);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('确定要删除这个班级吗？')) {
      setClasses(classes.filter(c => c.id !== id));
    }
  };

  const getDepartments = () => {
    if (currentSchoolId) {
      return DEPARTMENTS.filter(d => d.schoolId === currentSchoolId);
    }
    return DEPARTMENTS;
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
            <h1 className="text-3xl font-bold">班级管理</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-white/90">
              <span>学校：</span>
              <select
                value={currentSchoolId || ''}
                onChange={(e) => {
                  setCurrentSchoolId(parseInt(e.target.value));
                  setCurrentDepartmentId(null);
                }}
                className="px-3 py-1 bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
              >
                {SCHOOLS.map(school => (
                  <option key={school.id} value={school.id}>{school.name}</option>
                ))}
              </select>
            </div>
            
            {currentDepartmentId && (
              <div className="flex items-center gap-2 text-white/90">
                <span>院系：</span>
                <span className="font-semibold">
                  {DEPARTMENTS.find(d => d.id === currentDepartmentId)?.name}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* 添加班级按钮 */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">班级列表</h2>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
          >
            <Plus className="h-5 w-5 mr-2" />
            添加班级
          </button>
        </div>

        {/* 班级列表 */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b-2 border-gray-200">
                <th className="text-left py-4 px-6 text-gray-600 font-medium">班级名称</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">所属院系</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">年级</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">学生数</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">操作</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((cls) => {
                const dept = DEPARTMENTS.find(d => d.id === cls.departmentId);
                return (
                  <tr key={cls.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6 font-medium text-gray-800 flex items-center gap-2">
                      <GraduationCap className="h-5 w-5 text-purple-600" />
                      {cls.name}
                    </td>
                    <td className="py-4 px-6 text-gray-600">
                      {dept ? dept.name : '-'}
                    </td>
                    <td className="py-4 px-6 text-gray-600">{cls.grade}级</td>
                    <td className="py-4 px-6 text-gray-600">
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                        {Math.floor(Math.random() * 30) + 10}人
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(cls.id)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                          title="编辑"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(cls.id)}
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

        {/* 添加班级弹窗 */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">添加班级</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleAddClass} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">班级名称</label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="例如：22级1班"
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">年级</label>
                  <input
                    type="number"
                    name="grade"
                    value={formData.grade}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="例如：2022"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                >
                  添加班级
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminClasses;
