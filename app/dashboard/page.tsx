"use client";

import { useState, useEffect } from "react";
import {
  FiHome,
  FiUsers,
  FiSettings,
  FiBell,
  FiSearch,
  FiUser,
  FiBarChart2,
  FiShoppingCart,
  FiBook,
  FiDollarSign,
  FiPackage,
} from "react-icons/fi";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// -------------------- Sidebar --------------------
function Sidebar() {
  const menu = [
    { label: "Dashboard", icon: <FiHome /> },
    { label: "Orders", icon: <FiShoppingCart /> },
    { label: "Manuscripts", icon: <FiBook /> },
    { label: "Customers", icon: <FiUsers /> },
    { label: "Analytics", icon: <FiBarChart2 /> },
    { label: "Settings", icon: <FiSettings /> },
  ];

  return (
    <aside className="fixed left-0 top-0 w-64 h-screen bg-white border-r shadow-md p-4 mt-16 ml-9 mr-9">
      <h1 className="text-2xl font-bold mb-8 text-primary">Admin</h1>
      <nav className="space-y-3">
        {menu.map((item, i) => (
          <button
            key={i}
            className="flex items-center gap-3 w-full text-left p-3 rounded-lg hover:bg-blue-50 transition text-gray-700 hover:text-primary"
          >
            <span className="text-primary">{item.icon}</span> {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}

// -------------------- Topbar --------------------
function Topbar() {
  return (
    <header className="sticky top-0 bg-white border-b shadow-sm flex items-center justify-between px-6 py-3 z-10">
      <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
        <FiSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Search orders, customers..."
          className="bg-transparent outline-none"
        />
      </div>
      <div className="flex items-center gap-6">
        <FiBell className="text-xl cursor-pointer text-gray-600 hover:text-primary" />
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
            <FiUser />
          </div>
          <span className="font-medium">Admin</span>
        </div>
      </div>
    </header>
  );
}

// -------------------- Dashboard Cards --------------------
function DashboardCards() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    revenue: 0,
    totalManuscripts: 0,
    pendingOrders: 0,
  });

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then((data) => setStats(data));
  }, []);

  const cards = [
    { title: "Total Orders", value: stats.totalOrders, trend: "+12%", icon: <FiShoppingCart /> },
    { title: "Revenue", value: `$${stats.revenue}`, trend: "+18%", icon: <FiDollarSign /> },
    { title: "Manuscripts", value: stats.totalManuscripts, trend: "+5%", icon: <FiBook /> },
    { title: "Pending Orders", value: stats.pendingOrders, trend: "-3%", icon: <FiPackage /> },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, i) => (
        <div key={i} className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition border-t-4 border-primary">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-gray-500 text-sm">{card.title}</h3>
              <p className="text-2xl font-bold text-gray-800">{card.value}</p>
              <span className={`text-sm ${card.trend.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                {card.trend} from last week
              </span>
            </div>
            <div className="p-2 rounded-lg bg-blue-100 text-primary">{card.icon}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// -------------------- Analytics Chart --------------------
function AnalyticsChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/orders/recent")
      .then((res) => res.json())
      .then((orders) => {
        // Transform orders to monthly revenue data
        const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        const monthlySales: { name: string; sales: number }[] = Array.from({ length: 12 }, (_, i) => ({ name: months[i], sales: 0 }));
        orders.forEach((o: any) => {
          const d = new Date(o.date);
          const month = d.getMonth();
          monthlySales[month].sales += o.amount;
        });
        setData(monthlySales);
      });
  }, []);

  return (
    <div className="mt-8 bg-white p-6 rounded-2xl shadow">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Revenue Growth</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <Line type="monotone" dataKey="sales" stroke="#2563eb" strokeWidth={3} />
          <CartesianGrid stroke="#e5e7eb" strokeDasharray="5 5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value) => [`$${value}`, "Sales"]} contentStyle={{ borderRadius: '8px', borderColor: '#2563eb' }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// -------------------- Category Chart --------------------
function CategoryChart() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("/api/manuscripts/categories")
      .then((res) => res.json())
      .then((data) =>
        setCategories(data.map((c: any) => ({ name: c._id, value: c.count })))
      );
  }, []);

  const COLORS = ["#2563eb", "#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe"];

  return (
    <div className="mt-8 bg-white p-6 rounded-2xl shadow">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Manuscript Categories</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={categories}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {categories.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

// -------------------- Recent Orders --------------------
function RecentOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("/api/orders/recent")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered": return "bg-green-100 text-green-800";
      case "Processing": return "bg-yellow-100 text-yellow-800";
      case "Shipped": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="mt-8 bg-white p-6 rounded-2xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800">Recent Orders</h3>
        <button className="text-primary hover:underline text-sm">View all</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-gray-600">
              <th className="py-3">Order ID</th>
              <th className="py-3">Customer</th>
              <th className="py-3">Date</th>
              <th className="py-3">Amount</th>
              <th className="py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: any, i: number) => (
              <tr key={i} className="border-b last:border-0 hover:bg-gray-50">
                <td className="py-3 font-medium text-primary">{order._id}</td>
                <td className="py-3">{order.customer}</td>
                <td className="py-3">{new Date(order.date).toLocaleDateString()}</td>
                <td className="py-3 font-medium">${order.amount}</td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// -------------------- Dashboard Page --------------------
export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="ml-64 flex-1 min-h-screen">
        <Topbar />
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Dashboard Overview</h2>
          <DashboardCards />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            <AnalyticsChart />
            <CategoryChart />
          </div>
          <RecentOrders />
        </div>
      </main>
    </div>
  );
}
