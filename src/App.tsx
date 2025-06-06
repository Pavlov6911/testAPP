import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import './i18n/i18n';
import { LanguageProvider } from './context/LanguageContext';
import NextUIProvider from './context/NextUIProvider';

function App() {
  return (
    <Suspense fallback={<div className="h-screen w-screen flex items-center justify-center bg-background">Loading...</div>}>
      <NextUIProvider>
        <LanguageProvider>
          <Router>
            <Routes>
              <Route path="/*" element={<Home />} />
            </Routes>
          </Router>
        </LanguageProvider>
      </NextUIProvider>
    </Suspense>
  );
}

export default App;
