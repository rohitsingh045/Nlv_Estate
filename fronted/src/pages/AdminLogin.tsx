import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("adminToken", data.token);
        toast({ title: "Login Successful", description: "Navigating to admin dashboard" });
        navigate("/admin/dashboard");
      } else {
        toast({ title: "Login Failed", description: data.message, variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to connect to backend", variant: "destructive" });
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-charcoal text-primary-foreground">
      <div className="w-full max-w-md p-8 glass-panel rounded-lg shadow-gold">
        <h2 className="text-3xl font-serif text-gold text-center mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-sm font-sans mb-1 block">Email</label>
            <Input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full bg-white text-black" 
              required 
            />
          </div>
          <div>
            <label className="text-sm font-sans mb-1 block">Password</label>
            <Input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full bg-white text-black" 
              required 
            />
          </div>
          <Button type="submit" className="w-full bg-gold text-charcoal hover:bg-gold/80 hover:text-charcoal mt-4">
            Login
          </Button>
          <div className="text-center mt-4">
            <Link to="/admin-signup-hidden-xy" className="text-sm text-gold hover:underline">
              Don't have an account? Sign up here.
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;