import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './styles/theme';
import { PaperProvider } from './contexts/PaperContext';

// Import pages
import Home from './pages/Home';
import Upload from './pages/Upload';
import Results from './pages/Results';
import Chat from './pages/Chat';

// Import common components
import Header from './components/common/Header';
import Footer from './components/common/Footer';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PaperProvider>
        <Router>
          <div className="app">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/results" element={<Results />} />
                <Route path="/chat" element={<Chat />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </PaperProvider>
    </ThemeProvider>
  );
}

export default App;
