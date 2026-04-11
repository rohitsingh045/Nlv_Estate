import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutDashboard, Building, Users, MessageSquare, LogOut, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [stats, setStats] = useState<any>(null);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if admin is logged in
    const verifyToken = async () => {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        navigate("/admin-login-8472");
        return;
      }

      try {
        const [statsResponse, inquiriesResponse] = await Promise.all([
          fetch("/api/admin/dashboard-stats", {
            headers: { Authorization: `Bearer ${token}` }
          }),
          fetch("/api/admin/inquiries", {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        if (!statsResponse.ok || !inquiriesResponse.ok) {
          throw new Error("Unauthorized");
        }

        const statsData = await statsResponse.json();
        const inquiriesData = await inquiriesResponse.json();
        
        setStats(statsData);
        setInquiries(inquiriesData);
      } catch (err) {
        localStorage.removeItem("adminToken");
        navigate("/admin-login-8472");
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin-login-8472");
  };

  const handleDeleteInquiry = async (id: string) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`/api/admin/inquiries/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!response.ok) throw new Error("Failed to delete inquiry");

      setInquiries(inquiries.filter(inq => inq._id !== id));
      setStats((prev: any) => ({ ...prev, recentInquiries: Math.max(0, (prev?.recentInquiries || 1) - 1) }));
      
      toast({ title: "Deleted", description: "Inquiry deleted successfully", variant: "default" });
    } catch (err) {
      toast({ title: "Error", description: "Failed to delete inquiry", variant: "destructive" });
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center font-sans tracking-wide">Loading Admin Panel...</div>;
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 bg-slate-950 hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-2xl font-serif text-emerald-400 font-bold tracking-wider">NLV ADMIN</h1>
        </div>
        <nav className="mt-6 flex-1 px-4 space-y-2">
          {/* Navigation items can be customized here */}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="flex justify-between items-center p-6 border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
          <h2 className="text-xl font-medium tracking-wide">Dashboard Overview</h2>
          <div className="flex gap-4">
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              className="bg-emerald-500/10 border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300 transition-colors"
            >
              Go to Home
            </Button>
            <Button 
              onClick={handleLogout} 
              variant="outline" 
              className="bg-transparent border-slate-700 text-slate-300 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/50 gap-2 transition-colors"
            >
              <LogOut size={16} /> Logout
            </Button>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8 overflow-y-auto bg-slate-950">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full max-w-2xl grid-cols-4 bg-slate-900 p-1 border border-slate-800 rounded-lg mb-8">
              <TabsTrigger value="overview" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white rounded-md transition-all"><LayoutDashboard size={16} className="mr-2 hidden sm:block" /> Overview</TabsTrigger>
              <TabsTrigger value="properties" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white rounded-md transition-all"><Building size={16} className="mr-2 hidden sm:block" /> Properties</TabsTrigger>
              <TabsTrigger value="inquiries" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white rounded-md transition-all"><MessageSquare size={16} className="mr-2 hidden sm:block" /> Inquiries</TabsTrigger>
              <TabsTrigger value="users" className="data-[state=active]:bg-emerald-500 data-[state=active]:text-white rounded-md transition-all"><Users size={16} className="mr-2 hidden sm:block" /> Users</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="p-6 bg-slate-900 rounded-xl flex items-center justify-between border border-slate-800 shadow-sm">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">Total Inquiries</h3>
                    <p className="text-4xl text-white font-bold">{stats?.recentInquiries || 0}</p>
                  </div>
                  <div className="h-14 w-14 rounded-full bg-slate-800 flex items-center justify-center text-emerald-400">
                    <MessageSquare size={28} />
                  </div>
                </div>
                <div className="p-6 bg-slate-900 rounded-xl flex items-center justify-between border border-slate-800 shadow-sm">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">Properties</h3>
                    <p className="text-4xl text-white font-bold">{stats?.totalProperties || 0}</p>
                  </div>
                  <div className="h-14 w-14 rounded-full bg-slate-800 flex items-center justify-center text-emerald-400">
                    <Building size={28} />
                  </div>
                </div>
                <div className="p-6 bg-slate-900 rounded-xl flex items-center justify-between border border-slate-800 shadow-sm">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">Total Users</h3>
                    <p className="text-4xl text-white font-bold">{stats?.totalUsers || 0}</p>
                  </div>
                  <div className="h-14 w-14 rounded-full bg-slate-800 flex items-center justify-center text-emerald-400">
                    <Users size={28} />
                  </div>
                </div>
              </div>

              <div className="mt-8 p-12 bg-slate-900 rounded-xl border border-slate-800 min-h-[300px] flex flex-col items-center justify-center text-slate-500 shadow-sm">
                <LayoutDashboard size={48} className="mb-4 opacity-50" />
                <p className="text-lg">Overview activity charts and statistics will appear here.</p>
              </div>
            </TabsContent>

            <TabsContent value="properties">
              <div className="p-8 bg-slate-900 rounded-xl border border-slate-800 min-h-[400px] shadow-sm">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl text-emerald-400 font-semibold tracking-wide">Manage Properties</h3>
                  <Button className="bg-emerald-500 text-white hover:bg-emerald-600 transition-colors">Add New Property</Button>
                </div>
                <div className="text-center py-16 text-slate-500">
                  <Building size={48} className="mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Property management table is empty.</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="inquiries">
              <div className="p-8 bg-slate-900 rounded-xl border border-slate-800 min-h-[400px] shadow-sm">
                <h3 className="text-xl text-emerald-400 font-semibold tracking-wide mb-8">Customer Inquiries</h3>
                
                {inquiries && inquiries.length > 0 ? (
                  <div className="space-y-4">
                    {inquiries.map((inq: any) => (
                        <div key={inq._id} className="p-6 border border-slate-700/50 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-bold text-lg text-white mb-1">{inq.name}</h4>
                            <p className="text-sm text-slate-400 font-medium">
                              <span className="text-emerald-400 mr-2">{inq.email}</span> • <span className="ml-2 text-blue-400">{inq.phone}</span>
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-semibold text-slate-500 bg-slate-950 px-3 py-1 rounded-full border border-slate-800">
                              {new Date(inq.date).toLocaleString()}
                            </span>
                            <Button 
                                onClick={() => handleDeleteInquiry(inq._id)} 
                              variant="destructive" 
                              size="sm"
                              className="h-8 shadow-sm hover:bg-red-600 transition-colors"
                            >
                              <Trash2 size={14} className="mr-1" /> Delete
                            </Button>
                          </div>
                        </div>
                        <div className="mt-4 p-4 bg-slate-950 rounded-md border border-slate-800/50">
                          <p className="text-slate-300 whitespace-pre-wrap leading-relaxed">{inq.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 text-slate-500">
                    <MessageSquare size={48} className="mx-auto mb-4 opacity-50" />
                    <p className="text-lg">No new inquiries to show.</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="users">
              <div className="p-8 bg-slate-900 rounded-xl border border-slate-800 min-h-[400px] shadow-sm">
                <h3 className="text-xl text-emerald-400 font-semibold tracking-wide mb-8">System Users</h3>
                <div className="text-center py-16 text-slate-500">
                  <Users size={48} className="mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Admin and user management data will appear here.</p>
                </div>
              </div>
            </TabsContent>

          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;