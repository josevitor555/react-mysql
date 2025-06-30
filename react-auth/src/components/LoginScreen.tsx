// import React from 'react'

// Import Shadcn Components
// import { Button } from "../components/ui/button";
// import { Input } from '../components/ui/input';
// import { Label } from '../components/ui/label';

// Icons from lucide react
// import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';

import me from "../images/me.png"

// Login Form Componenent
import LoginForm from './LoginForm';

interface LoginScreenProps {
    onSwitchToRegister: () => void;
}

// States
// import { useState } from "react";

const LoginScreen = ({ onSwitchToRegister }: LoginScreenProps) => {

    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [showPassword, setShowPassword] = useState(false);
    // const [isLoading, setIsLoading] = useState(false);

    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     setIsLoading(true);

    //     // Simulate Login Process
    //     setTimeout(() => {
    //         setIsLoading(false);
    //         alert("Welcome back!");
    //     }, 2000);
    // };

    return (
        <div className="min-h-screen bg-[#0f0f0f] flex">

            {/* Left Column - Login Form */}
            <div className="flex-1 flex items-center justify-center p-8 lg:p-12">
                <div className="w-full max-w-md">
                    <LoginForm onSwitchToRegister={onSwitchToRegister} />
                </div>
            </div>

            {/* Right Column - Image */}
            <div className="hidden lg:flex flex-1 h-screen relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0B]/20 to-[#2A2A2C]/20 z-10" />
                <img
                    src={me}
                    alt="Me, hahaha"
                    className="w-full h-full object-cover"
                />
                <div className="absolute bottom-8 left-8 z-20 text-white">
                    <h3 className="text-2xl font-bold mb-4"> About Me </h3>
                    <p className="text-white/80 max-w-sm">
                        I'm José Vitor, a dev who programs with his soul, questions with his heart, and always finds a way to make even the scroll bar more beautiful.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginScreen;
