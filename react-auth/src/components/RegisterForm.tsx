// import React from 'react'

// Hooks
import { useState } from 'react';

// Shadcn UI components
// import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

// Lucide Icons
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from 'lucide-react';

// Styled Component
import Checkbox from './ui/checkbox';

// Axios
import axios from 'axios';

// For routes
import { useNavigate } from 'react-router-dom';

// URL da API
const apiUrl = import.meta.env.VITE_API_URL;

// Interface
interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

const RegisterForm = ({ onSwitchToLogin }: RegisterFormProps) => {

  // States
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // States for password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Navigation
  const navigate = useNavigate();

  // Handle input change
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Handle sign up
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      alert("Invalid Password. Please make sure your passwords match.");
      return;
    }

    // Set loading to true
    setIsLoading(true);

    try {

      // Send request to register
      const response = await axios.post(`${apiUrl}/api/register`, {
        username: formData.fullName,
        email: formData.email,
        password: formData.password,
      });

      // Log the token
      console.log("Received token:", response.data.token);

      // Check if token is received
      if (!response.data.token) {
        throw new Error("No token received");
      }

      // Save token to local storage
      localStorage.setItem("token", response.data.token);
      alert("Account created successfully!");

      // Navigate to home
      navigate("/home");

    } catch (error) {
      console.error("Error to register user.", error);

      // Check if the error is an Axios error
      if (axios.isAxiosError(error)) {
        console.log("Backend response:", error.response?.data);

        // Alert if email or username already exists
        if (error.response?.status === 409) {
          alert("Email or username already exists. Please try again.");
        } else {
          alert("Server error. Please try again later.");
        }
      } else {
        // Alert if an unexpected error occurs
        alert("An unexpected error occurred. Please try again.");
      }

    } finally {
      // Set loading to false
      setIsLoading(false);
    }
  }

  return (
    <div className='space-y-8 bg-[#0A0A0B] rounded-2xl py-6 w-full max-w-[900px]'>

      {/* Header */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 mx-auto bg-[#fafafa] rounded-full flex items-center justify-center">
          <User className="w-8 h-8 text-black" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white"> Create Account </h1>
          <p className="text-gray-400 mt-2"> Join us and start your journey today </p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-[transparent] rounded-2xl p-8 space-y-6">
        <form onSubmit={handleSignUp} className='space-y-6'>

          <div className="space-y-2">
            <Label htmlFor='email' className='text-white text-lg font-medium'>
              Your Name
            </Label>

            {/* Full Name Field */}
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                className="pl-10 py-6 bg-dark-secondary border-glass-border text-white placeholder:text-gray-500 focus:border-indigo-500 transition-all duration-300"
                required
              />
            </div>

            {/* E-mail field */}
            <Label htmlFor='email' className='text-white mt-4 text-lg font-medium'>
              Email Address
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="pl-10 py-6 bg-dark-secondary border-glass-border text-white placeholder:text-gray-500 focus:border-indigo-500 transition-all duration-300"
                required
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor='email' className='text-white mt-4 text-lg font-medium'>
                Password
              </Label>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
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

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <Label htmlFor='email' className='text-white mt-4 text-lg font-medium'>
                Confirm Password
              </Label>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  className="pl-10 pr-10 py-6 bg-dark-secondary border-glass-border text-white placeholder:text-gray-500 focus:border-indigo-500 transition-all duration-300"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Term and Conditions */}
            <div className="flex items-start space-x-2 mt-4 mb-4">
              <Checkbox />
              <label htmlFor="terms" className="text-sm ml-2 text-gray-400">
                I agree to the

                <button type="button" className="text-indigo-400 ml-2 mr-2 hover:text-indigo-300 transition-colors cursor-pointer">
                  Terms of Service
                </button>

                and

                <button type="button" className="text-indigo-400 ml-2 mr-2 hover:text-indigo-300 transition-colors cursor-pointer">
                  Privacy Policy
                </button>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#fafafa] hover:opacity-90 text-white text-lg font-semibold py-3 cursor-pointer rounded-full transition-all duration-300 flex items-center justify-center space-x-2 group"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
              ) : (
                <>
                  <span className='text-[#1A1A1C]'> Create Account </span>
                  <ArrowRight className="w-6 h-6 text-[#1A1A1C]" />
                </>
              )}
            </button>
          </div>
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

        {/* Social Registration */}
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

          <button className="bg-[#fafafa] py-3 rounded-full text-lg text-[#0A0A0B] cursor-pointer flex items-center justify-center">

            <svg className="w-5 h-5 mr-2" fill="#1d1d1d" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>

            Facebook
          </button>
        </div>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-gray-400">
            Already have an account?
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-white ml-2 font-medium cursor-pointer"
            >
              Sign in now
            </button>
          </p>
        </div>

      </div>

    </div>
  );
}

export default RegisterForm;
