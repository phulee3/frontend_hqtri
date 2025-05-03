import React from 'react';
import { DollarSign, Package, ShoppingCart, Users } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import StatCard from './StatCard';

const salesData = [
  { month: 'T1', sales: 4000 },
  { month: 'T2', sales: 3000 },
  { month: 'T3', sales: 5000 },
  { month: 'T4', sales: 4500 },
  { month: 'T5', sales: 6000 },
  { month: 'T6', sales: 5500 },
];

const inventoryData = [
  { name: 'Toyota', value: 30 },
  { name: 'Honda', value: 25 },
  { name: 'Ford', value: 20 },
  { name: 'BMW', value: 15 },
  { name: 'Mercedes', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Tổng Quan</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Tổng Doanh Thu"
          value="1.045.231.000đ"
          change="+20.1% so với tháng trước"
          icon={<DollarSign className="w-6 h-6" />}
        />
        <StatCard
          title="Tồn Kho"
          value="145"
          change="+12% so với tháng trước"
          icon={<Package className="w-6 h-6" />}
        />
        <StatCard
          title="Đơn Hàng"
          value="32"
          change="+8.2% so với tháng trước"
          icon={<ShoppingCart className="w-6 h-6" />}
        />
        <StatCard
          title="Khách Hàng Mới"
          value="18"
          change="+12.5% so với tháng trước"
          icon={<Users className="w-6 h-6" />}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Doanh Số Theo Tháng</h2>
          <BarChart width={500} height={300} data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Bar dataKey="sales" fill="#3B82F6" />
          </BarChart>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Tồn Kho Theo Hãng</h2>
          <PieChart width={400} height={300}>
            <Pie
              data={inventoryData}
              cx={200}
              cy={150}
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {inventoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
