import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import Modal from '../shared/Modal';
import CustomerForm from './CustomerForm';
import DeleteConfirmation from '../shared/DeleteConfirmation';
import CustomerTable from './CustomerTable';
import { customerData } from '../../data/customerData';

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [customers] = useState(customerData);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

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
        <h1 className="text-2xl font-semibold">Quản Lý Khách Hàng</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
          <Plus className="w-5 h-5 mr-1" />
          Thêm Khách Hàng
        </button>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Tìm kiếm khách hàng..."
          className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Modal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)}
        title="Sửa Thông Tin Khách Hàng"
      >
        <CustomerForm 
          customer={selectedCustomer}
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
          message="Bạn có chắc chắn muốn xóa khách hàng này?"
          onConfirm={handleDelete}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      </Modal>

      <CustomerTable 
        customers={filteredCustomers}
        onEdit={(customer) => {
          setSelectedCustomer(customer);
          setIsEditModalOpen(true);
        }}
        onDelete={(customer) => {
          setSelectedCustomer(customer);
          setIsDeleteModalOpen(true);
        }}
      />
    </div>
  );
};

export default Customers;
