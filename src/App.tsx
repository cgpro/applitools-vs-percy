import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar/Navbar';
import { Home } from './components/Home/Home';
import { ABTest } from './components/ABTest/ABTest';
import { AccessibilityIssues } from './components/AccessibilityIssues/AccessibilityIssues';
import { DynamicContent } from './components/DynamicContent/DynamicContent';
import { LoginForm } from './components/LoginForm/LoginForm';

function App() {
  return (
    <BrowserRouter>
      <div className='app'>
        <Navbar />
        <main className='container'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/ab-test' element={<ABTest />} />
            <Route path='/accessibility' element={<AccessibilityIssues />} />
            <Route path='/dynamic-content' element={<DynamicContent />} />
            <Route path='/login-form' element={<LoginForm />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
