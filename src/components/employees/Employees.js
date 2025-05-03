import React, { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import Modal from '../shared/Modal';
import EmployeeForm from './EmployeeForm';
import DeleteConfirmation from '../shared/DeleteConfirmation';
import EmployeeTable from './EmployeeTable';
import { employeeData } from '../../data/employeeData';

// Tách StatsCard thành component riêng
const StatsCard = ({ title, value, subtext }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h3 className="text-gray-500 text-sm mb-2">{title}</h3>
    <p className="text-2xl font-semibold mb-2">{value}</p>
    <p className="text-sm text-gray-500">{subtext}</p>
  </div>
);

const Employees = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('Tất Cả Vai Trò');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const filteredEmployees = employeeData.filter(employee => {
    const matchesSearch = 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.phone.includes(searchTerm);
    
    const matchesRole = 
      selectedRole === 'Tất Cả Vai Trò' || 
      employee.role === selectedRole;

    return matchesSearch && matchesRole;
  });

  const stats = {
    total: employeeData.length,
    admin: employeeData.filter(e => e.role === "Quản Trị").length,
    sales: employeeData.filter(e => e.role === "Bán Hàng").length,
    warehouse: employeeData.filter(e => e.role === "Kho").length
  };

  const handleAdd = (formData) => {
    // Implement add logic here
    setIsAddModalOpen(false);
  };

  const handleEdit = (formData) => {
    // Implement edit logic here
    setIsEditModalOpen(false);
  };

  const handleDelete = () => {
    // Implement delete logic here
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Quản Lý Nhân Viên</h1>
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus className="w-5 h-5 mr-1" />
          Thêm Nhân Viên
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <StatsCard title="Tổng Nhân Viên" value={stats.total} subtext="Tất cả nhân viên trong hệ thống" />
        <StatsCard title="Quản Trị" value={stats.admin} subtext="Nhân viên quản trị hệ thống" />
        <StatsCard title="Bán Hàng" value={stats.sales} subtext="Nhân viên bán hàng" />
        <StatsCard title="Đang Hoạt Động" value={`${stats.total}/5`} subtext="Nhân viên đang hoạt động" />
      </div>

      <div className="mb-6 flex gap-4">
        <input
          type="text"
          placeholder="Tìm kiếm nhân viên..."
          className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
        >
          <option value="Tất Cả Vai Trò">Tất Cả Vai Trò</option>
          <option value="Quản Trị">Quản Trị</option>
          <option value="Bán Hàng">Bán Hàng</option>
          <option value="Kho">Kho</option>
        </select>
      </div>

      <Modal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)}
        title="Thêm Nhân Viên Mới"
      >
        <EmployeeForm 
          onSubmit={handleAdd}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      <Modal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)}
        title="Sửa Thông Tin Nhân Viên"
      >
        <EmployeeForm 
          employee={selectedEmployee}
          onSubmit={handleEdit}
          onCancel={() => setIsEditModalOpen(false)}
        />
      </Modal>

      <Modal 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)}
        title="Xác Nhận Xóa"
      >
        <DeleteConfirmation 
          message="Bạn có chắc chắn muốn xóa nhân viên này?"
          onConfirm={handleDelete}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      </Modal>

      <EmployeeTable 
        employees={filteredEmployees} 
        onEdit={(employee) => {
          setSelectedEmployee(employee);
          setIsEditModalOpen(true);
        }}
        onDelete={(employee) => {
          setSelectedEmployee(employee);
          setIsDeleteModalOpen(true);
        }}
      />
    </div>
  );
};

export default Employees;
