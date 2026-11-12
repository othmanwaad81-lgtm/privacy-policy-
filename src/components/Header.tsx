import React, { useState } from 'react';
import { ShieldCheck, Copy, Check, ExternalLink, Globe, Moon, Sun, Layers } from 'lucide-react';
import { APP_INFO } from '../data/content';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  lang: 'ar' | 'en';
  onToggleLang: () => void;
  isDark: boolean;
  onToggleDark: () => void;
  onOpenMetaModal: () => void;
  onOpenFirebaseModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate,
  lang,
  onToggleLang,
  isDark,
  onToggleDark,
  onOpenMetaModal,
  onOpenFirebaseModal,
}) => {
  const [copied, setCopied] = useState(false);

  const getFullCurrentUrl = () => {
    if (typeof window === 'undefined') return '';
    return `${window.location.origin}${currentPath}`;
  };

  const copyCurrentUrl = () => {
    const url = getFullCurrentUrl();
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const navLinks = [
    { path: '/', labelAr: 'الرئيسية (البوابة)', labelEn: 'Hub' },
    { path: '/privacy', labelAr: 'الموقع ١: سياسة الخصوصية', labelEn: 'Site 1: Privacy' },
    { path: '/terms', labelAr: 'الموقع ٢: شروط الخدمة', labelEn: 'Site 2: Terms' },
    { path: '/data-deletion', labelAr: 'الموقع ٣: حذف البيانات', labelEn: 'Site 3: Deletion' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-6">
          
          {/* Brand Zone: 1-line wordmark */}
          <button
            onClick={() => onNavigate('/')}
            className="flex items-center gap-2.5 text-slate-900 dark:text-white font-bold text-lg tracking-tight hover:opacity-90 transition-opacity whitespace-nowrap shrink-0 text-start"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-black text-sm shadow-sm">
              O
            </div>
            <span>{APP_INFO.appName}</span>
            <span className="hidden sm:inline-block text-xs font-normal text-slate-500 dark:text-slate-400 border-s border-slate-200 dark:border-slate-700 ps-2">
              {lang === 'ar' ? 'السياسات والامتثال' : 'Compliance & Legal'}
            </span>
          </button>

          {/* Navigation Zone: 4 clean single-line links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => onNavigate(link.path)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-slate-100 text-indigo-700 dark:bg-slate-800 dark:text-indigo-400 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                  }`}
                >
                  {lang === 'ar' ? link.labelAr : link.labelEn}
                </button>
              );
            })}
          </nav>

          {/* Action Zone: Helper buttons, language, and theme */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Meta Helper Button */}
            <button
              onClick={onOpenMetaModal}
              title={lang === 'ar' ? 'روابط توثيق Meta' : 'Meta Review URLs'}
              className="px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="hidden sm:inline">{lang === 'ar' ? 'روابط Meta' : 'Meta Links'}</span>
            </button>

            {/* Firebase Helper Button */}
            <button
              onClick={onOpenFirebaseModal}
              title={lang === 'ar' ? 'تعليمات نشر Firebase' : 'Firebase Deployment'}
              className="px-2.5 py-1.5 text-xs font-medium text-amber-800 dark:text-amber-300 bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/60 dark:hover:bg-amber-900/60 rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 border border-amber-200/60 dark:border-amber-800/40"
            >
              <Layers className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span className="hidden sm:inline">{lang === 'ar' ? 'نشر فايربيس' : 'Firebase'}</span>
            </button>

            {/* Copy Current Route Button */}
            <button
              onClick={copyCurrentUrl}
              title={lang === 'ar' ? 'نسخ رابط الصفحة الحالية' : 'Copy Current URL'}
              className="p-1.5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>

            {/* Language Switcher */}
            <button
              onClick={onToggleLang}
              title={lang === 'ar' ? 'Switch to English' : 'التحويل للعربية'}
              className="px-2 py-1 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors flex items-center gap-1"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'EN' : 'عربي'}</span>
            </button>

            {/* Dark / Light Toggle */}
            <button
              onClick={onToggleDark}
              title={isDark ? 'Light Mode' : 'Dark Mode'}
              className="p-1.5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar for narrow screens */}
        <div className="lg:hidden flex items-center justify-between overflow-x-auto py-2 border-t border-slate-100 dark:border-slate-800 gap-1 text-xs">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <button
                key={link.path}
                onClick={() => onNavigate(link.path)}
                className={`px-2.5 py-1 font-medium rounded-md whitespace-nowrap shrink-0 transition-colors ${
                  isActive
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {lang === 'ar' ? link.labelAr : link.labelEn}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
