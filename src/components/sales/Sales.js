import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import Modal from '../shared/Modal';
import SaleForm from './SaleForm';
import DeleteConfirmation from '../shared/DeleteConfirmation';
import SalesTable from './SalesTable';
import { salesData } from '../../data/salesData';

const Sales = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Tất Cả');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);

  const filteredSales = salesData.filter(sale => {
    const matchesSearch = 
      sale.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.car.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      selectedStatus === 'Tất Cả' || 
      sale.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

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
        <h1 className="text-2xl font-semibold">Quản Lý Bán Hàng</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
          <Plus className="w-5 h-5 mr-1" />
          Tạo Đơn Hàng
        </button>
      </div>

      <div className="mb-6 flex gap-4">
        <input
          type="text"
          placeholder="Tìm kiếm đơn hàng..."
          className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="Tất Cả">Tất Cả Trạng Thái</option>
          <option value="Đã Thanh Toán">Đã Thanh Toán</option>
          <option value="Chờ Thanh Toán">Chờ Thanh Toán</option>
          <option value="Đã Hủy">Đã Hủy</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <SummaryCard
          title="Tổng Doanh Số"
          value="8.700.000.000đ"
          trend="+1.25% so với tháng trước"
        />
        <SummaryCard
          title="Đơn Hàng"
          value="5"
          trend="+2 so với tháng trước"
        />
        <SummaryCard
          title="Chờ Thanh Toán"
          value="3.600.000.000đ"
          trend="2 đơn hàng đang chờ"
        />
        <SummaryCard
          title="Giá Trị Trung Bình"
          value="1.740.000.000đ"
          trend="+2.1% so với tháng trước"
        />
      </div>

      <Modal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)}
        title="Sửa Thông Tin Đơn Hàng"
      >
        <SaleForm 
          sale={selectedSale}
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
          message="Bạn có chắc chắn muốn xóa đơn hàng này?"
          onConfirm={handleDelete}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      </Modal>

      <SalesTable 
        sales={filteredSales}
        onEdit={(sale) => {
          setSelectedSale(sale);
          setIsEditModalOpen(true);
        }}
        onDelete={(sale) => {
          setSelectedSale(sale);
          setIsDeleteModalOpen(true);
        }}
      />
    </div>
  );
};

const SummaryCard = ({ title, value, trend }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h3 className="text-gray-500 text-sm mb-2">{title}</h3>
    <p className="text-2xl font-semibold mb-2">{value}</p>
    <p className="text-sm text-green-500">{trend}</p>
  </div>
);

export default Sales;
