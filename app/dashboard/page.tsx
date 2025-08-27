import Sidebar from "@/components/sidebar";
import Topbar from "@/components/topbar";
import DashboardCards from "@/components/dashboard-cards";

export default function DashboardPage() {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="ml-64 flex-1 min-h-screen bg-gray-50">
        <Topbar />
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
          <DashboardCards />
        </div>
      </main>
    </div>
  );
}
