import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Plus, Edit, Trash2, School } from 'lucide-react';
import { SCHOOLS, DEPARTMENTS } from '../data/mockData';

const AdminDepartments = () => {
  const [departments, setDepartments] = useState<any[]>([]);
  const [currentSchoolId, setCurrentSchoolId] = useState<number | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: ''
  });

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem('adminUser') || '{}');
    
    if (admin.role === 'super') {
      // 超级管理员查看所有院系
      setDepartments(DEPARTMENTS);
    } else {
      // 学校管理员只查看本校院系
      setDepartments(DEPARTMENTS.filter(d => d.schoolId === admin.schoolId));
      setCurrentSchoolId(admin.schoolId);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddDepartment = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newDepartment = {
      id: departments.length + 1,
      schoolId: currentSchoolId || 1,
      ...formData
    };
    
    setDepartments([...departments, newDepartment]);
    setShowAddModal(false);
    setFormData({ name: '', code: '', description: '' });
  };

  const handleEdit = (id: number) => {
    alert(`编辑院系ID: ${id}`);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('确定要删除这个院系吗？')) {
      setDepartments(departments.filter(d => d.id !== id));
    }
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
            <h1 className="text-3xl font-bold">院系管理</h1>
          </div>
          
          {currentSchoolId && (
            <div className="flex items-center gap-2 text-white/90">
              <span>当前学校：</span>
              <span className="font-semibold">{SCHOOLS.find(s => s.id === currentSchoolId)?.name}</span>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* 添加院系按钮 */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">院系列表</h2>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
          >
            <Plus className="h-5 w-5 mr-2" />
            添加院系
          </button>
        </div>

        {/* 院系列表 */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b-2 border-gray-200">
                <th className="text-left py-4 px-6 text-gray-600 font-medium">院系名称</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">代码</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">描述</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">学生数</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">操作</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((dept) => (
                <tr key={dept.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6 font-medium text-gray-800 flex items-center gap-2">
                    <School className="h-5 w-5 text-blue-600" />
                    {dept.name}
                  </td>
                  <td className="py-4 px-6 text-gray-600 font-mono">{dept.code}</td>
                  <td className="py-4 px-6 text-gray-600">{dept.description || '-'}</td>
                  <td className="py-4 px-6 text-gray-600">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {Math.floor(Math.random() * 50) + 20}人
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(dept.id)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        title="编辑"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(dept.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        title="删除"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 添加院系弹窗 */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">添加院系</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleAddDepartment} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">院系名称</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="例如：计算机科学与技术"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">院系代码</label>
                  <input
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="例如：CS"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">描述</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="院系描述..."
                    rows={3}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                >
                  添加院系
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDepartments;
