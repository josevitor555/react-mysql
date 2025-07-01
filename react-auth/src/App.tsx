
// Config style css
import './App.css'
import './index.css'

// React route
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from './pages/Index';
import Welcome from './pages/Welcome';

const App = () => {

  return (
    <BrowserRouter>
      <Routes>

        {/* Main route */}
        <Route path='/' element={<Index />} />
        <Route path='/home' element={<Welcome />} />

        {/* Page not found */}
        <Route path="*" element={<div> Page not found </div>} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
