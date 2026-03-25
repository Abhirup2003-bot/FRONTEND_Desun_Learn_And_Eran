import React from "react";
import desunLogo from "../../assets/logo.png";

const Footer = () => {
  const footerData = {
    company: ["About Us", "Careers", "Blog"],
    support: ["Help Center", "Contact Support", "FAQs"],
    legal: ["Terms of Service", "Privacy Policy"],
    resources: ["Community", "Guides", "Webinars"],
  };

  return (
    <footer className="bg-white border-t mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
        {/* Brand Column */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-2">
          <div className="flex gap-2 items-center">
            <div className="w-8 h-8 sm:w-10 sm:h-10 mr-1 sm:mr-2">
              <img src={desunLogo} className="w-full h-full object-cover" />
            </div>
            <div className="text-base sm:text-xl font-bold">Desun Academy</div>
          </div>
          <p className="text-sm text-slate-500 mt-2 max-w-sm">
            Build your career with modern learning, real-world projects, and a
            strong developer community.
          </p>
        </div>

        {/* Dynamic Columns */}
        {Object.entries(footerData).map(([title, links]) => (
          <div key={title}>
            <h3 className="text-sm font-semibold text-slate-800 mb-3 capitalize">
              {title}
            </h3>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-sm text-slate-500 hover:text-indigo-600 transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom Bar */}
      <div className="border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs sm:text-sm text-slate-500 text-center sm:text-left">
            © 2024 Desun Academy. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex gap-3">
            <button className="p-2 rounded-full bg-slate-100 hover:bg-indigo-100 transition-all hover:scale-110">
              🔗
            </button>
            <button className="p-2 rounded-full bg-slate-100 hover:bg-indigo-100 transition-all hover:scale-110">
              🌐
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
