// import React from 'react'

// Register form
import RegisterForm from "./RegisterForm";

// Import images
import me from "../images/me.png";

interface RegisterScreenProps {
  onSwitchToLogin: () => void;
}

const RegisterScreen = ({ onSwitchToLogin }: RegisterScreenProps) => {
  return (
    <div className="min-h-screen space-y-8 bg-[linear-gradient(135deg,_#0A0A0B_0%,_#1A1A1C_50%,_#2A2A2C_100%)] flex">

      {/* Left Column - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md">
          <RegisterForm onSwitchToLogin={onSwitchToLogin} />
        </div>
      </div>

      {/* Right Column - Image */}
      <div className="hidden lg:flex w-auto max-w-[600px] h-full relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0B]/20 to-[#2A2A2C]/20 z-10" />
        <img
          src={me}
          alt="Me, hahaha"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-8 left-30 z-20 text-white text-center">
          <h3 className="text-2xl font-bold mb-4"> About Me </h3>
          <p className="text-white/80 max-w-sm">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis nisi, magni fugiat aperiam dolorem quam quas cumque dicta culpa. Quo, eos iure! Possimus explicabo accusantium enim sapiente nisi laboriosam expedita.
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterScreen;
