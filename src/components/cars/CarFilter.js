import React from 'react';

const CarFilter = ({ searchTerm, onSearchChange, selectedBrand, onBrandChange, selectedStatus, onStatusChange }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Tìm kiếm xe..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />

        <select
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedBrand}
          onChange={(e) => onBrandChange(e.target.value)}
        >
          <option value="Tất Cả Hãng Xe">Tất Cả Hãng Xe</option>
          <option value="Toyota">Toyota</option>
          <option value="Honda">Honda</option>
          <option value="Ford">Ford</option>
          <option value="BMW">BMW</option>
          <option value="Mercedes">Mercedes</option>
        </select>

        <select
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedStatus}
          onChange={(e) => onStatusChange(e.target.value)}
        >
          <option value="Tất Cả Trạng Thái">Tất Cả Trạng Thái</option>
          <option value="Còn Hàng">Còn Hàng</option>
          <option value="Hết Hàng">Hết Hàng</option>
        </select>
      </div>
    </div>
  );
};

export default CarFilter;