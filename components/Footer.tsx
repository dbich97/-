import React from 'react';

type Page = 'home' | 'privacy' | 'terms' | 'cookies' | 'about' | 'contact' | 'disclaimer';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

// FIX: The NavLink component's props are extracted into a separate interface.
// This makes the component's signature clearer and resolves the type inference error
// where the 'children' prop was not being correctly identified.
interface NavLinkProps {
  page: Page;
  children: React.ReactNode;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const linkClassName = "text-gray-500 hover:text-indigo-600 hover:underline transition-colors duration-300";

  // Using buttons for navigation to control state within the SPA
  // FIX: Explicitly typing NavLink as React.FC<NavLinkProps> helps TypeScript correctly
  // identify it as a component that accepts children, resolving the type error.
  const NavLink: React.FC<NavLinkProps> = ({ page, children }) => (
    <button onClick={() => onNavigate(page)} className={linkClassName}>
      {children}
    </button>
  );

  return (
    <footer className="w-full max-w-5xl mx-auto text-center py-8 mt-16 border-t border-gray-200">
      <div className="flex justify-center items-center flex-wrap gap-x-6 gap-y-2 mb-4">
        <NavLink page="privacy">سياسة الخصوصية</NavLink>
        <NavLink page="terms">اتفاقية الاستخدام</NavLink>
        <NavLink page="cookies">سياسة الكوكيز</NavLink>
        <NavLink page="about">من نحن</NavLink>
        <NavLink page="contact">اتصل بنا</NavLink>
        <NavLink page="disclaimer">إخلاء المسؤولية</NavLink>
      </div>
      <p className="text-sm text-gray-400">
        &copy; {new Date().getFullYear()} حاسبة العمر. جميع الحقوق محفوظة.
      </p>
    </footer>
  );
};

export default Footer;