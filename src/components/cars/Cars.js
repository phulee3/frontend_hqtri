import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import Modal from '../shared/Modal';
import CarForm from './CarForm';
import DeleteConfirmation from '../shared/DeleteConfirmation';
import CarFilter from './CarFilter';
import CarTable from './CarTable';
import { useCars } from '../../hooks/useCars';

const Cars = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const { 
    cars,
    searchTerm,
    setSearchTerm,
    selectedBrand,
    setSelectedBrand,
    selectedStatus,
    setSelectedStatus,
    filteredCars
  } = useCars();

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
      <h1 className="text-2xl font-semibold mb-6">Quản Lý Xe</h1>
      
      <CarFilter 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedBrand={selectedBrand}
        onBrandChange={setSelectedBrand}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
      />
      
      <div className="mt-6">
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus className="inline-block mr-2" />
          Thêm Xe
        </button>
      </div>

      <Modal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)}
        title="Thêm Xe Mới"
      >
        <CarForm 
          onSubmit={handleAdd}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      <Modal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)}
        title="Sửa Thông Tin Xe"
      >
        <CarForm 
          car={selectedCar}
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
          message="Bạn có chắc chắn muốn xóa xe này?"
          onConfirm={handleDelete}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      </Modal>

      <div className="mt-6">
        <CarTable 
          cars={filteredCars}
          onEdit={(car) => {
            setSelectedCar(car);
            setIsEditModalOpen(true);
          }}
          onDelete={(car) => {
            setSelectedCar(car);
            setIsDeleteModalOpen(true);
          }}
        />
      </div>
    </div>
  );
};

export default Cars;
