import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { School, Plus, Edit, Trash2, Users, CheckCircle } from 'lucide-react';

const AdminSchools = () => {
  const [schools, setSchools] = useState<any[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    shortName: '',
    adminName: '',
    adminPhone: '',
    adminEmail: ''
  });

  useEffect(() => {
    // 模拟从服务器获取学校数据
    const mockSchools = [
      { id: 1, name: '南京大学', shortName: '南大', status: 1, adminName: '南大管理员', adminPhone: '13800138001', adminEmail: 'admin@nju.edu.cn' },
      { id: 2, name: '东南大学', shortName: '东大', status: 1, adminName: '东大管理员', adminPhone: '13800138002', adminEmail: 'admin@seu.edu.cn' }
    ];
    setSchools(mockSchools);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddSchool = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newSchool = {
      id: schools.length + 1,
      ...formData,
      status: 1
    };
    
    setSchools([...schools, newSchool]);
    setShowAddModal(false);
    setShowSuccess(true);
    setFormData({ name: '', shortName: '', adminName: '', adminPhone: '', adminEmail: '' });
    
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleEdit = (id: number) => {
    alert(`编辑学校ID: ${id}`);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('确定要删除这个学校吗？')) {
      setSchools(schools.filter(s => s.id !== id));
    }
  };

  const handleResetPassword = (id: number) => {
    alert(`重置学校ID: ${id} 的管理员密码`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* 顶部 */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center mb-6">
            <Link to="/admin/dashboard" className="mr-4 text-white hover:text-blue-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <h1 className="text-3xl font-bold">学校管理</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* 添加学校按钮 */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">学校列表</h2>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
          >
            <Plus className="h-5 w-5 mr-2" />
            添加学校
          </button>
        </div>

        {/* 学校列表 */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b-2 border-gray-200">
                <th className="text-left py-4 px-6 text-gray-600 font-medium">学校名称</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">简称</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">管理员</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">联系电话</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">状态</th>
                <th className="text-left py-4 px-6 text-gray-600 font-medium">操作</th>
              </tr>
            </thead>
            <tbody>
              {schools.map((school) => (
                <tr key={school.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6 font-medium text-gray-800">{school.name}</td>
                  <td className="py-4 px-6 text-gray-600">{school.shortName}</td>
                  <td className="py-4 px-6 text-gray-600">{school.adminName}</td>
                  <td className="py-4 px-6 text-gray-600">{school.adminPhone}</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      school.status === 1 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {school.status === 1 ? '启用' : '禁用'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(school.id)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        title="编辑"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleResetPassword(school.id)}
                        className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg"
                        title="重置密码"
                      >
                        <Users className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(school.id)}
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

        {/* 添加学校弹窗 */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">添加学校</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleAddSchool} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">学校名称</label>
                  <div className="relative">
                    <School className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="例如：南京大学"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">简称</label>
                  <input
                    type="text"
                    name="shortName"
                    value={formData.shortName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="例如：南大"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">管理员姓名</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="adminName"
                      value={formData.adminName}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="例如：张三"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">联系电话</label>
                  <input
                    type="tel"
                    name="adminPhone"
                    value={formData.adminPhone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="例如：13800138000"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">邮箱</label>
                  <input
                    type="email"
                    name="adminEmail"
                    value={formData.adminEmail}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="例如：admin@nju.edu.cn"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                >
                  添加学校
                </button>
              </form>
            </div>
          </div>
        )}

        {/* 成功提示 */}
        {showSuccess && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-fade-in-up z-50">
            <CheckCircle className="h-6 w-6" />
            <div>
              <p className="font-semibold">添加成功！</p>
              <p className="text-sm opacity-90">已自动生成管理员账号</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSchools;
