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

// Types
interface Stats {
  totalOrders: number;
  revenue: number;
  totalManuscripts: number;
  pendingOrders: number;
}

interface Order {
  _id: string;
  customer: string;
  date: string;
  amount: number;
  status: string;
}

interface Manuscript {
  _id: string;
  title: string;
  author: string;
  category: string;
  date: string;
}

// -------------------- Dashboard Page --------------------
export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [stats, setStats] = useState<Stats>({
    totalOrders: 0,
    revenue: 0,
    totalManuscripts: 0,
    pendingOrders: 0,
  });
  const [orders, setOrders] = useState<Order[]>([]);
  const [manuscripts, setManuscripts] = useState<Manuscript[]>([]);

  // Fetch stats
  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Stats fetch error:", err));
  }, []);

  // Fetch orders
  useEffect(() => {
    if (activeTab === "Orders") {
      fetch("/api/orders")
        .then((res) => res.json())
        .then((data) => setOrders(data))
        .catch((err) => console.error("Orders fetch error:", err));
    }
  }, [activeTab]);

  // Fetch manuscripts
  useEffect(() => {
    if (activeTab === "Manuscripts") {
      fetch("/api/manuscripts")
        .then((res) => res.json())
        .then((data) => setManuscripts(data))
        .catch((err) => console.error("Manuscripts fetch error:", err));
    }
  }, [activeTab]);

  // Sidebar menu
  const menu = [
    { label: "Dashboard", icon: <FiHome /> },
    { label: "Orders", icon: <FiShoppingCart /> },
    { label: "Manuscripts", icon: <FiBook /> },
    { label: "Customers", icon: <FiUsers /> },
    { label: "Analytics", icon: <FiBarChart2 /> },
    { label: "Settings", icon: <FiSettings /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-lg flex flex-col">
        <h1 className="text-2xl font-bold p-6 border-b text-primary">
          Admin Panel
        </h1>
        <nav className="flex-1 p-4 space-y-2">
          {menu.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveTab(item.label)}
              className={`flex items-center w-full gap-3 px-4 py-3 rounded-lg font-medium transition ${
                activeTab === item.label
                  ? "bg-primary text-white"
                  : "text-gray-700 hover:bg-primary/10 hover:text-primary"
              }`}
            >
              <span className="text-xl">{item.icon}</span> {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Topbar */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-lg w-80">
            <FiSearch className="text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="Search orders, customers..."
              className="bg-transparent outline-none w-full text-sm text-gray-700"
            />
          </div>
          <div className="flex items-center gap-6">
            <FiBell className="text-2xl cursor-pointer text-gray-500 hover:text-primary transition" />
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white text-lg font-bold">
                <FiUser />
              </div>
              <span className="font-semibold text-gray-700">Admin</span>
            </div>
          </div>
        </div>

        {/* Render Active Tab */}
        {activeTab === "Dashboard" && <DashboardCards stats={stats} />}
        {activeTab === "Orders" && <OrdersTable orders={orders} />}
        {activeTab === "Manuscripts" && <ManuscriptsTable manuscripts={manuscripts} />}
        {activeTab === "Customers" && <Placeholder title="Customers" />}
        {activeTab === "Analytics" && <Placeholder title="Analytics" />}
        {activeTab === "Settings" && <Placeholder title="Settings" />}
      </main>
    </div>
  );
}

// -------------------- Dashboard Cards --------------------
function DashboardCards({ stats }: { stats: Stats }) {
  const cards = [
    { title: "Total Orders", value: stats.totalOrders, icon: <FiShoppingCart /> },
    { title: "Revenue", value: `$${stats.revenue}`, icon: <FiDollarSign /> },
    { title: "Manuscripts", value: stats.totalManuscripts, icon: <FiBook /> },
    { title: "Pending Orders", value: stats.pendingOrders, icon: <FiPackage /> },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {cards.map((card, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-3xl shadow-lg border-l-4 border-primary hover:shadow-xl transition"
          >
            <div className="flex justify-between items-start gap-4">
              <div>
                <h3 className="text-gray-400 text-sm">{card.title}</h3>
                <p className="text-3xl font-bold text-gray-800 mt-1">{card.value}</p>
              </div>
              <div className="p-3 rounded-xl bg-primary/10 text-primary text-2xl">
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// -------------------- Orders Table --------------------
function OrdersTable({ orders }: { orders: Order[] }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered": return "bg-green-100 text-green-800";
      case "Processing": return "bg-yellow-100 text-yellow-800";
      case "Shipped": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Recent Orders</h2>
      <div className="overflow-x-auto bg-white rounded-3xl shadow-lg p-6">
        <table className="w-full text-left border-separate border-spacing-y-2">
          <thead>
            <tr className="border-b text-gray-600">
              <th className="py-3 px-2">Order ID</th>
              <th className="py-3 px-2">Customer</th>
              <th className="py-3 px-2">Date</th>
              <th className="py-3 px-2">Amount</th>
              <th className="py-3 px-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr key={i} className="border-b last:border-0 hover:bg-gray-50 transition">
                <td className="py-3 px-2 font-medium text-primary">{order._id}</td>
                <td className="py-3 px-2">{order.customer}</td>
                <td className="py-3 px-2">{new Date(order.date).toLocaleDateString()}</td>
                <td className="py-3 px-2 font-medium">${order.amount}</td>
                <td className="py-3 px-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
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

// -------------------- Manuscripts Table --------------------
function ManuscriptsTable({ manuscripts }: { manuscripts: Manuscript[] }) {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Manuscripts</h2>
      <div className="overflow-x-auto bg-white rounded-3xl shadow-lg p-6">
        <table className="w-full text-left border-separate border-spacing-y-2">
          <thead>
            <tr className="border-b text-gray-600">
              <th className="py-3 px-2">Title</th>
              <th className="py-3 px-2">Author</th>
              <th className="py-3 px-2">Category</th>
              <th className="py-3 px-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {manuscripts.map((m, i) => (
              <tr key={i} className="border-b last:border-0 hover:bg-gray-50 transition">
                <td className="py-3 px-2 font-medium text-primary">{m.title}</td>
                <td className="py-3 px-2">{m.author}</td>
                <td className="py-3 px-2">{m.category}</td>
                <td className="py-3 px-2">{new Date(m.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// -------------------- Placeholder Component --------------------
function Placeholder({ title }: { title: string }) {
  return (
    <div className="text-center mt-32 text-gray-500">
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      <p>Feature coming soon 🚧</p>
    </div>
  );
}
