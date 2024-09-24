

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <Router>
      <div className="main-layout">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </div>
    </Router>
  );
}