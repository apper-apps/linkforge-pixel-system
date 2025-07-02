import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from '@/components/organisms/Layout';
import CreatePage from '@/components/pages/CreatePage';
import MyLinksPage from '@/components/pages/MyLinksPage';
import AnalyticsPage from '@/components/pages/AnalyticsPage';
import SettingsPage from '@/components/pages/SettingsPage';

function App() {
  return (
    <Router>
      <div className="App min-h-screen bg-background text-white">
        <Layout>
          <Routes>
            <Route path="/" element={<CreatePage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/my-links" element={<MyLinksPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </Layout>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          style={{ zIndex: 9999 }}
        />
      </div>
    </Router>
  );
}

export default App;