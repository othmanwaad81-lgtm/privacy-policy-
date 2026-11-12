import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';
import { TermsOfServicePage } from './components/TermsOfServicePage';
import { DataDeletionPage } from './components/DataDeletionPage';
import { ComplianceHubPage } from './components/ComplianceHubPage';
import { MetaHelperModal } from './components/MetaHelperModal';
import { FirebaseDeployModal } from './components/FirebaseDeployModal';
import { POLICIES, APP_INFO } from './data/content';
import { testFirestoreConnection } from './firebase';

export default function App() {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [isDark, setIsDark] = useState<boolean>(false);
  const [currentPath, setCurrentPath] = useState<string>('/');
  const [isMetaModalOpen, setIsMetaModalOpen] = useState(false);
  const [isFirebaseModalOpen, setIsFirebaseModalOpen] = useState(false);

  // Parse path and hash to determine route
  const resolvePath = (): string => {
    if (typeof window === 'undefined') return '/';
    
    // Check hash first (useful for static hosts or GitHub Pages)
    const hash = window.location.hash.replace('#', '').trim();
    if (hash === 'privacy' || hash === 'privacy-policy') return '/privacy';
    if (hash === 'terms' || hash === 'terms-of-service') return '/terms';
    if (hash === 'data-deletion' || hash === 'deletion') return '/data-deletion';

    // Check pathname
    const pathname = window.location.pathname.toLowerCase();
    if (pathname.includes('/privacy')) return '/privacy';
    if (pathname.includes('/terms')) return '/terms';
    if (pathname.includes('/data-deletion') || pathname.includes('/deletion')) return '/data-deletion';

    return '/';
  };

  // Initialize route, theme, and popstate listeners
  useEffect(() => {
    // Initial route resolve
    setCurrentPath(resolvePath());

    // Test Firestore connection
    testFirestoreConnection();

    // Popstate listener (back/forward browser buttons)
    const handlePopState = () => {
      setCurrentPath(resolvePath());
    };
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);

    // Initial theme preference
    const savedTheme = localStorage.getItem('otay_theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialDark = savedTheme ? savedTheme === 'dark' : prefersDark;
    setIsDark(initialDark);
    if (initialDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Initial language preference
    const savedLang = localStorage.getItem('otay_lang') as 'ar' | 'en' | null;
    if (savedLang) {
      setLang(savedLang);
      document.documentElement.setAttribute('lang', savedLang);
      document.documentElement.setAttribute('dir', savedLang === 'ar' ? 'rtl' : 'ltr');
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  // Update document title and metadata whenever route or language changes
  useEffect(() => {
    if (currentPath === '/privacy') {
      document.title = lang === 'ar'
        ? 'الموقع الأول: سياسة الخصوصية | OTAY'
        : 'Site 1: Privacy Policy | OTAY';
    } else if (currentPath === '/terms') {
      document.title = lang === 'ar'
        ? 'الموقع الثاني: شروط الخدمة | OTAY'
        : 'Site 2: Terms of Service | OTAY';
    } else if (currentPath === '/data-deletion') {
      document.title = lang === 'ar'
        ? 'الموقع الثالث: تعليمات حذف البيانات | OTAY'
        : 'Site 3: Data Deletion Instructions | OTAY';
    } else {
      document.title = lang === 'ar'
        ? 'OTAY — بوابة السياسات الرسمية وشروط الخدمة'
        : 'OTAY — Official Compliance & Legal Policies';
    }
  }, [currentPath, lang]);

  // Navigate handler
  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Toggle Language
  const handleToggleLang = () => {
    const nextLang = lang === 'ar' ? 'en' : 'ar';
    setLang(nextLang);
    localStorage.setItem('otay_lang', nextLang);
    document.documentElement.setAttribute('lang', nextLang);
    document.documentElement.setAttribute('dir', nextLang === 'ar' ? 'rtl' : 'ltr');
  };

  // Toggle Dark Theme
  const handleToggleDark = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    localStorage.setItem('otay_theme', nextDark ? 'dark' : 'light');
    if (nextDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      
      {/* Top Bar Header */}
      <Header
        currentPath={currentPath}
        onNavigate={handleNavigate}
        lang={lang}
        onToggleLang={handleToggleLang}
        isDark={isDark}
        onToggleDark={handleToggleDark}
        onOpenMetaModal={() => setIsMetaModalOpen(true)}
        onOpenFirebaseModal={() => setIsFirebaseModalOpen(true)}
      />

      {/* Main Routed View */}
      <main className="flex-1">
        {currentPath === '/privacy' && (
          <PrivacyPolicyPage lang={lang} onNavigate={handleNavigate} />
        )}
        {currentPath === '/terms' && (
          <TermsOfServicePage lang={lang} onNavigate={handleNavigate} />
        )}
        {currentPath === '/data-deletion' && (
          <DataDeletionPage lang={lang} onNavigate={handleNavigate} />
        )}
        {currentPath === '/' && (
          <ComplianceHubPage
            lang={lang}
            onNavigate={handleNavigate}
            onOpenMetaModal={() => setIsMetaModalOpen(true)}
            onOpenFirebaseModal={() => setIsFirebaseModalOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        lang={lang}
        onNavigate={handleNavigate}
        onOpenMetaModal={() => setIsMetaModalOpen(true)}
        onOpenFirebaseModal={() => setIsFirebaseModalOpen(true)}
      />

      {/* Meta App Review Helper Modal */}
      <MetaHelperModal
        isOpen={isMetaModalOpen}
        onClose={() => setIsMetaModalOpen(false)}
        lang={lang}
      />

      {/* Firebase Hosting Deployment Helper Modal */}
      <FirebaseDeployModal
        isOpen={isFirebaseModalOpen}
        onClose={() => setIsFirebaseModalOpen(false)}
        lang={lang}
      />

    </div>
  );
}
