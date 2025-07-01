
// Hooks
import React, { useState } from 'react'

// Shadcn ui components
// import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

// Lucide Icons
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';

// Axios
import axios from "axios";

// Styled Component
import Checkbox from './ui/checkbox';
// import { useNavigate } from 'react-router-dom';

// URL da API
const apiUrl = import.meta.env.VITE_API_URL;

// Interface
interface LoginFormProps {
  onSwitchToRegister: () => void;
}

const LoginForm = ({ onSwitchToRegister }: LoginFormProps) => {

  // States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Navigation
  // const navigate = useNavigate();

  // Handle function
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${apiUrl}/api/login`, {
        email,
        password
      });

      localStorage.setItem("token", response.data.token);
      alert("Login successful!");
      // navigate("/home");

    } catch (error) {
      console.error("Error to login: ", error);
      alert("Error to login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className='space-y-8 bg-[#0A0A0B] rounded-2xl py-6 w-full max-w-[900px]'>

      {/* Header */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 mx-auto bg-[#fafafa] rounded-2xl flex items-center justify-center">
          <Lock className="w-8 h-8 text-[#1d1d1d]" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white"> Welcome Back </h1>
          <p className="text-gray-400 mt-2"> Sign in to your account to continue </p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-[transparent] rounded-2xl p-8 space-y-6">
        <form onSubmit={handleSignIn} className='space-y-6'>

          {/* E-mail Field */}
          <div className="space-y-2">
            <Label htmlFor='email' className='text-white text-lg font-medium'>
              Email Address
            </Label>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 py-6 bg-dark-secondary border-glass-border text-white placeholder:text-gray-500 focus:border-indigo-500 transition-all duration-300"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor='email' className='text-white text-lg font-medium'>
              Password
            </Label>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10 py-6 bg-dark-secondary border-glass-border text-white placeholder:text-gray-500 focus:border-indigo-500 transition-all duration-300"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Remenber Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">

              <div className="flex items-center gap-4 text-[#fafafa]">
                <Checkbox />
                Remenber Me
              </div>

            </div>
            <button
              type="button"
              className="text-sm text-white cursor-pointer"
            >
              Forgot password?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#fafafa] hover:opacity-90 text-white text-lg font-semibold py-3 cursor-pointer rounded-full transition-all duration-300 flex items-center justify-center space-x-2 group"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (

              <>
                <span className='text-[#1A1A1C]'> Sign In </span>
                <ArrowRight className="w-6 h-6 text-[#1A1A1C]" />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-glass-border" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-6 text-gray-300"> Or continue with </span>
          </div>
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-2 gap-3">
          <button
            className="bg-[transparent] border border-gray-100 py-3 rounded-full text-lg text-[#fafafa] cursor-pointer flex items-center justify-center"
          >

            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="#fafafa"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#fafafa"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#fafafa"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#fafafa"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>

            Google
          </button>

          <button
            className="bg-[#fafafa] py-3 rounded-full text-lg text-[#0A0A0B] cursor-pointer flex items-center justify-center"
          >

            <svg className="w-5 h-5 mr-2" fill="#1d1d1d" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>

            Facebook
          </button>
        </div>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-gray-400">
            Don't have an account?
            <button
              onClick={onSwitchToRegister}
              className="text-white ml-2 font-medium cursor-pointer"
            >
              Sign up now
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}

export default LoginForm;
