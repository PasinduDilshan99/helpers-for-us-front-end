"use client";

import React from 'react';
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Shield, 
  Users,
  Facebook,
  Twitter,
  Linkedin,
  Github,
  ArrowUpRight
} from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

// Helper function to convert hex to rgba
const hexToRgba = (hex: string, opacity: number): string => {
  hex = hex.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const Footer = () => {
  const { theme, isDarkMode } = useTheme();
  const currentYear = new Date().getFullYear();

  // Quick links data
  const quickLinks = [
    { name: 'Travel Management', href: '/travel-management' },
    { name: 'Employee Portal', href: '/employee-management' },
    { name: 'Hotels & Booking', href: '/hotels-management' },
    { name: 'Vehicle Fleet', href: '/vehicle-management' },
    { name: 'ERP Dashboard', href: '/erp-system' },
    { name: 'Reports & Analytics', href: '/reports' },
  ];

  // Company links
  const companyLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact Sales', href: '/contact' },
    { name: 'Support Center', href: '/support' },
    { name: 'Documentation', href: '/docs' },
    { name: 'API Reference', href: '/api' },
  ];

  // Legal links
  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'GDPR Compliance', href: '/gdpr' },
    { name: 'Security', href: '/security' },
    { name: 'SLA Agreement', href: '/sla' },
  ];

  // Contact info
  const contactInfo = [
    { icon: <Mail size={16} />, text: 'support@businessmanager.com' },
    { icon: <Phone size={16} />, text: '+1 (555) 123-4567' },
    { icon: <MapPin size={16} />, text: '123 Enterprise St, Suite 500, San Francisco, CA 94107' },
  ];

  // Social media links
  const socialLinks = [
    { icon: <Facebook size={18} />, href: '#', label: 'Facebook' },
    { icon: <Twitter size={18} />, href: '#', label: 'Twitter' },
    { icon: <Linkedin size={18} />, href: '#', label: 'LinkedIn' },
    { icon: <Github size={18} />, href: '#', label: 'GitHub' },
  ];

  // Determine footer background colors
  const getFooterBackground = () => {
    if (isDarkMode) {
      return theme.surface;
    }
    return '#ffffff';
  };

  const getBottomBarBackground = () => {
    if (isDarkMode) {
      return hexToRgba(theme.primary, 0.1);
    }
    return hexToRgba(theme.primary, 0.05);
  };

  return (
    <footer className="mt-auto transition-colors duration-300" style={{ backgroundColor: getFooterBackground() }}>
      {/* Main Footer Content */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Company Info Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <div 
                className="h-10 w-10 rounded-lg flex items-center justify-center mr-3 transition-colors duration-300"
                style={{ backgroundColor: theme.primary }}
              >
                <Building2 className="text-white" size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold transition-colors duration-300" style={{ color: theme.text }}>
                  Business Manager
                </h2>
                <p className="text-sm transition-colors duration-300" style={{ color: theme.textSecondary }}>
                  Enterprise Management Suite
                </p>
              </div>
            </div>
            
            <p className="mb-6 max-w-md transition-colors duration-300" style={{ color: theme.textSecondary }}>
              A comprehensive enterprise management platform integrating travel, employee, 
              hotel, vehicle, and ERP systems for modern businesses.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start">
                  <span className="mr-3 mt-0.5 transition-colors duration-300" style={{ color: theme.primary }}>
                    {item.icon}
                  </span>
                  <span className="text-sm transition-colors duration-300" style={{ color: theme.textSecondary }}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Social Media */}
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105"
                  style={{ 
                    backgroundColor: hexToRgba(theme.primary, 0.1),
                    color: theme.textSecondary
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = theme.primary;
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = hexToRgba(theme.primary, 0.1);
                    e.currentTarget.style.color = theme.textSecondary;
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center transition-colors duration-300" style={{ color: theme.text }}>
              <ArrowUpRight size={18} className="mr-2" style={{ color: theme.primary }} />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors duration-300 flex items-center hover:translate-x-1 transform transition-transform"
                    style={{ color: theme.textSecondary }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = theme.primary;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = theme.textSecondary;
                    }}
                  >
                    <span 
                      className="w-1.5 h-1.5 rounded-full mr-3 transition-colors duration-300"
                      style={{ backgroundColor: hexToRgba(theme.primary, 0.3) }}
                    ></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center transition-colors duration-300" style={{ color: theme.text }}>
              <Users size={18} className="mr-2" style={{ color: theme.primary }} />
              Company
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors duration-300 flex items-center hover:translate-x-1 transform transition-transform"
                    style={{ color: theme.textSecondary }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = theme.primary;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = theme.textSecondary;
                    }}
                  >
                    <span 
                      className="w-1.5 h-1.5 rounded-full mr-3 transition-colors duration-300"
                      style={{ backgroundColor: hexToRgba(theme.primary, 0.3) }}
                    ></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center transition-colors duration-300" style={{ color: theme.text }}>
              <Shield size={18} className="mr-2" style={{ color: theme.primary }} />
              Legal
            </h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors duration-300 flex items-center hover:translate-x-1 transform transition-transform"
                    style={{ color: theme.textSecondary }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = theme.primary;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = theme.textSecondary;
                    }}
                  >
                    <span 
                      className="w-1.5 h-1.5 rounded-full mr-3 transition-colors duration-300"
                      style={{ backgroundColor: hexToRgba(theme.primary, 0.3) }}
                    ></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            {/* System Status */}
            <div 
              className="mt-8 p-4 rounded-lg transition-colors duration-300"
              style={{ 
                backgroundColor: hexToRgba(theme.warning, 0.1),
                border: `1px solid ${hexToRgba(theme.warning, 0.2)}`
              }}
            >
              <div className="flex items-center mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                <span className="text-sm font-medium transition-colors duration-300" style={{ color: theme.text }}>
                  All Systems Operational
                </span>
              </div>
              <p className="text-xs transition-colors duration-300" style={{ color: theme.textSecondary }}>
                Last checked: Today, 14:30 UTC
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div 
        className="border-t transition-colors duration-300"
        style={{ 
          backgroundColor: getBottomBarBackground(),
          borderColor: theme.border
        }}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="mb-4 md:mb-0">
              <p className="text-sm transition-colors duration-300" style={{ color: theme.textSecondary }}>
                © {currentYear} Business Manager. All rights reserved.
              </p>
              <p className="text-xs mt-1 transition-colors duration-300" style={{ color: theme.textSecondary }}>
                Version 2.4.1 • Build #20231215 • 
                <span className="inline-flex items-center ml-2">
                  <Globe size={12} className="mr-1" />
                  English (US)
                </span>
              </p>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-4">
                <span className="text-xs transition-colors duration-300" style={{ color: theme.textSecondary }}>
                  Secure Connection
                </span>
                <div className="flex items-center">
                  <Shield size={14} className="text-green-600 mr-1" />
                  <span className="text-xs font-medium text-green-600">SSL/TLS Encrypted</span>
                </div>
              </div>
              
              {/* Optional: Download Links */}
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-xs transition-colors duration-300 hover:underline"
                  style={{ color: theme.textSecondary }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = theme.primary;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = theme.textSecondary;
                  }}
                >
                  Mobile App
                </a>
                <a
                  href="#"
                  className="text-xs transition-colors duration-300 hover:underline"
                  style={{ color: theme.textSecondary }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = theme.primary;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = theme.textSecondary;
                  }}
                >
                  Developer API
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;