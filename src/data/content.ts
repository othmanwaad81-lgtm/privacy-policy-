export interface PolicySection {
  title: string;
  items?: string[];
  content?: string;
  note?: string;
}

export interface PolicyData {
  id: 'privacy' | 'terms' | 'data-deletion';
  route: string;
  nameAr: string;
  nameEn: string;
  lastUpdatedAr: string;
  lastUpdatedEn: string;
  summaryAr: string;
  summaryEn: string;
  metaDescriptionAr: string;
  metaDescriptionEn: string;
  contactEmail: string;
  metaRequirementNoteAr: string;
  metaRequirementNoteEn: string;
}

export const APP_INFO = {
  appName: 'OTAY',
  fullAppNameAr: 'تطبيق OTAY — خدمة الرد التلقائي',
  fullAppNameEn: 'OTAY App — Auto-Reply Service',
  descriptionAr: 'خدمة ذكية للرد التلقائي على رسائل إنستغرام المباشرة عند تفعيل وضع الغياب أو الانشغال.',
  descriptionEn: 'Automated direct message response service for Instagram during away mode.',
  developerEmail: 'othmanwaad81@gmail.com',
  year: '2026',
  copyrightAr: '© 2026 OTAY. جميع الحقوق محفوظة.',
  copyrightEn: '© 2026 OTAY. All rights reserved.',
};

export const POLICIES: Record<'privacy' | 'terms' | 'data-deletion', PolicyData> = {
  privacy: {
    id: 'privacy',
    route: '/privacy',
    nameAr: 'سياسة الخصوصية',
    nameEn: 'Privacy Policy',
    lastUpdatedAr: 'نوفمبر 2026',
    lastUpdatedEn: 'November 2026',
    summaryAr: 'توضح كيفية جمع ومعالجة معرّف إنستغرام ومحتوى الرسائل فقط لأغراض تشغيل الرد التلقائي دون تخزين دائم أو مشاركة مع أطراف ثالثة.',
    summaryEn: 'Outlines data collection strictly for Instagram auto-reply without permanent storage or third-party sharing.',
    metaDescriptionAr: 'سياسة الخصوصية الرسمية لتطبيق OTAY لخدمة الرد التلقائي على رسائل إنستغرام المباشرة.',
    metaDescriptionEn: 'Official Privacy Policy for OTAY Instagram Auto-Reply Service.',
    contactEmail: 'othmanwaad81@gmail.com',
    metaRequirementNoteAr: 'مطلوبة في لوحة مطوري Meta تحت خانة: Privacy Policy URL',
    metaRequirementNoteEn: 'Required in Meta Developer Console under: Privacy Policy URL',
  },
  terms: {
    id: 'terms',
    route: '/terms',
    nameAr: 'شروط الخدمة',
    nameEn: 'Terms of Service',
    lastUpdatedAr: 'نوفمبر 2026',
    lastUpdatedEn: 'November 2026',
    summaryAr: 'الشروط والأحكام المنظمة لاستخدام خدمة الرد التلقائي، التزامات المستخدم، إخلاء المسؤولية، وآلية إنهاء الخدمة.',
    summaryEn: 'Terms and conditions governing the auto-reply service, user obligations, disclaimers, and service termination.',
    metaDescriptionAr: 'شروط الخدمة والاستخدام الرسمية لتطبيق OTAY لخدمة الرد التلقائي.',
    metaDescriptionEn: 'Official Terms of Service for OTAY Instagram Auto-Reply Service.',
    contactEmail: 'othmanwaad81@gmail.com',
    metaRequirementNoteAr: 'مطلوبة في لوحة مطوري Meta تحت خانة: Terms of Service URL',
    metaRequirementNoteEn: 'Required in Meta Developer Console under: Terms of Service URL',
  },
  'data-deletion': {
    id: 'data-deletion',
    route: '/data-deletion',
    nameAr: 'تعليمات حذف البيانات',
    nameEn: 'Data Deletion Instructions',
    lastUpdatedAr: 'نوفمبر 2026',
    lastUpdatedEn: 'November 2026',
    summaryAr: 'دليل خطوة بخطوة للمستخدمين لإلغاء الربط من إنستغرام وطلب مسح كافة البيانات وسجلات الرسائل خلال 72 ساعة.',
    summaryEn: 'Step-by-step instructions for unlinking Instagram and requesting complete data deletion within 72 hours.',
    metaDescriptionAr: 'تعليمات وإجراءات حذف بيانات المستخدم الرسمية لتطبيق OTAY على إنستغرام.',
    metaDescriptionEn: 'Official User Data Deletion Instructions for OTAY Instagram App.',
    contactEmail: 'othmanwaad81@gmail.com',
    metaRequirementNoteAr: 'مطلوبة في لوحة مطوري Meta تحت خانة: User Data Deletion Instructions URL',
    metaRequirementNoteEn: 'Required in Meta Developer Console under: User Data Deletion URL',
  },
};
