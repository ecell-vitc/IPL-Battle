import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, User, Lock, Gamepad2 } from 'lucide-react';
import { makeRequest } from '../lib/utils';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const role = (props.isAdmin ? 'admin' : props.isauc ? 'auctioneer' : 'participant');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const role =
      props.isAdmin ? 'admin' : props.isauc ? 'auctioneer' : 'participant';
  
    try {
      const data = await makeRequest(`/${role}/login/`, 'POST', { username, password })
  
      if (!data.valid) {
        throw new Error(data.message || 'Login failed. Please check your credentials.');
      }
  
      localStorage.setItem('token', data.token);
      if (data.room_uid)
        localStorage.setItem('room_uid', data.room_uid);

      localStorage.setItem('login', 'true');
      localStorage.setItem('Name', username);
      localStorage.setItem('role', role);
  
      if (role === 'participant' || role === 'auctioneer')
        window.location.href = `/${role}/${data.room_uid}`;
      
      else
        window.location.href = `/admin/dashboard`;
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0c1629] relative overflow-hidden p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-r from-blue-600 to-orange-600 rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute inset-0 bg-[url('/subtle-prism.svg')] opacity-10"></div>
      </div>

      <Card className="w-full max-w-md bg-[#1a2436]/90 border border-blue-900/30 shadow-2xl backdrop-blur-xl relative transition-all hover:shadow-blue-900/20">
        <CardHeader className="space-y-2 pb-6">
          <div className="flex justify-center mb-4">
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-800 rounded-full blur-2xl opacity-30 animate-pulse"></div>
            </div>
          </div>
          <CardTitle className="text-4xl font-bold text-center tracking-tighter">
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              {role[0].toUpperCase() + role.slice(1)} Login
            </span>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-5">
              <div className="relative group">
                <User className="absolute left-3 top-3 h-5 w-5 text-blue-300/60 transition-colors group-focus-within:text-blue-400 z-10" />
                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3.5 bg-[#0c1629]/70 border-2 border-blue-900/20 rounded-xl focus:outline-none focus:border-blue-500/30 text-blue-100 placeholder-blue-300/40 transition-all hover:border-blue-800/40 shadow-inner"
                  required
                />
              </div>
              
              <div className="relative group">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-blue-300/60 transition-colors group-focus-within:text-blue-400 z-10" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3.5 bg-[#0c1629]/70 border-2 border-blue-900/20 rounded-xl focus:outline-none focus:border-blue-500/30 text-blue-100 placeholder-blue-300/40 transition-all hover:border-blue-800/40 shadow-inner"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 hover:text-blue-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-blue-300/60 hover:text-blue-300 transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-blue-300/60 hover:text-blue-300 transition-colors" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="text-red-400 text-sm text-center mb-4">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="relative w-full py-4 px-6 bg-gradient-to-br from-blue-600 via-blue-500 to-orange-600 text-white font-medium rounded-xl focus:outline-none transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-blue-500/20 group overflow-hidden"
            >
              <span className="relative flex items-center justify-center gap-2">
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <>
                    <span>Continue</span>
                    <div className="w-2.5 h-2.5 bg-white/80 rounded-full animate-pulse"></div>
                  </>
                )}
              </span>
            </button>
          </form>
        </CardContent>
      </Card>

      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${10 + Math.random() * 20}s infinite`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Login;
