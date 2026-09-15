import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/hooks/useAuth';
import { PublicLayout } from '@/layouts/PublicLayout';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Home } from '@/pages/Home';
import { About } from '@/pages/About';
import { Courses } from '@/pages/Courses';
import { Admission } from '@/pages/Admission';
import { StudentCorner } from '@/pages/StudentCorner';
import { Gallery } from '@/pages/Gallery';
import { Contact } from '@/pages/Contact';
import { AdminLogin } from '@/pages/admin/AdminLogin';
import { AdminDashboard } from '@/pages/admin/AdminDashboard';
import { AdminHeroManager } from '@/pages/admin/AdminHeroManager';
import { AdminGalleryManager } from '@/pages/admin/AdminGalleryManager';
import { AdminAnnouncementManager } from '@/pages/admin/AdminAnnouncementManager';
import { AdminAdmissionContent } from '@/pages/admin/AdminAdmissionContent';
import { AdminSettings } from '@/pages/admin/AdminSettings';
import { ScrollToTop } from '@/components/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
          <Route path="/courses" element={<PublicLayout><Courses /></PublicLayout>} />
          <Route path="/admission" element={<PublicLayout><Admission /></PublicLayout>} />
          <Route path="/student-corner" element={<PublicLayout><StudentCorner /></PublicLayout>} />
          <Route path="/gallery" element={<PublicLayout><Gallery /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />

          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/hero" element={<ProtectedRoute><AdminHeroManager /></ProtectedRoute>} />
          <Route path="/admin/gallery" element={<ProtectedRoute><AdminGalleryManager /></ProtectedRoute>} />
          <Route path="/admin/announcements" element={<ProtectedRoute><AdminAnnouncementManager /></ProtectedRoute>} />
          <Route path="/admin/admission" element={<ProtectedRoute><AdminAdmissionContent /></ProtectedRoute>} />
          <Route path="/admin/settings" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} />

          {/* Fallback */}
          <Route path="*" element={<PublicLayout><Home /></PublicLayout>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
