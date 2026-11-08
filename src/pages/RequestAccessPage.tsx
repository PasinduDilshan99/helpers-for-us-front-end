"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";

export default function RequestAccessPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    department: "",
    jobTitle: "",
    phoneNumber: "",
    reason: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      setError(null);
      setIsLoading(true);

      // Basic validation
      if (
        !formData.fullName ||
        !formData.email ||
        !formData.department ||
        !formData.reason
      ) {
        setError("Please fill in all required fields");
        setIsLoading(false);
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError("Please enter a valid email address");
        setIsLoading(false);
        return;
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // TODO: Replace with actual API call
      // await fetch('/api/request-access', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });

      setSuccess(true);
    } catch (err: unknown) {
      console.log(err);
      setError("Failed to submit request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Request Submitted
            </h2>
            <p className="text-gray-600 mb-6">
              Your access request has been submitted successfully. Our team will
              review your request and contact you within 1-2 business days.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => router.push("/login")}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
              >
                Back to Login
              </button>
              <button
                onClick={() => {
                  setSuccess(false);
                  setFormData({
                    fullName: "",
                    email: "",
                    department: "",
                    jobTitle: "",
                    phoneNumber: "",
                    reason: "",
                  });
                }}
                className="w-full bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-lg border border-gray-300 transition-colors"
              >
                Submit Another Request
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-100/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-50/30 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-2xl relative z-10">
        {/* Main Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-700 to-purple-800 px-8 py-10 text-center">
            <div className="inline-flex items-center justify-center mb-4 w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold text-white mb-2">
              Request Admin Access
            </h1>
            <p className="text-purple-100 text-sm">
              Fill out the form below to request access to the admin portal
            </p>
          </div>

          {/* Form Section */}
          <div className="p-8">
            {error && (
              <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start space-x-3">
                <svg
                  className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-sm text-amber-800 font-medium">{error}</p>
              </div>
            )}

            <div className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  className="w-full px-4 py-2.5 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  value={formData.fullName}
                  placeholder="Enter your full name"
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  className="w-full px-4 py-2.5 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  value={formData.email}
                  placeholder="your.email@company.com"
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>

              {/* Two Column Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Department */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="department"
                    className="w-full px-4 py-2.5 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                    value={formData.department}
                    onChange={handleChange}
                    disabled={isLoading}
                  >
                    <option value="">Select department</option>
                    <option value="operations">Operations</option>
                    <option value="sales">Sales</option>
                    <option value="marketing">Marketing</option>
                    <option value="finance">Finance</option>
                    <option value="it">IT</option>
                    <option value="hr">Human Resources</option>
                    <option value="customer-service">Customer Service</option>
                    <option value="management">Management</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Job Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Title
                  </label>
                  <input
                    type="text"
                    name="jobTitle"
                    className="w-full px-4 py-2.5 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                    value={formData.jobTitle}
                    placeholder="e.g. Sales Manager"
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  className="w-full px-4 py-2.5 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  value={formData.phoneNumber}
                  placeholder="+1 (555) 000-0000"
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>

              {/* Reason */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Access <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="reason"
                  rows={4}
                  className="w-full px-4 py-2.5 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-none"
                  value={formData.reason}
                  placeholder="Please explain why you need access to the admin portal..."
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>

              {/* Info Box */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <svg
                    className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div className="text-sm text-purple-800">
                    <p className="font-medium mb-1">What happens next?</p>
                    <ul className="space-y-1 text-purple-700">
                      <li>• Your request will be reviewed by our admin team</li>
                      <li>• You'll receive an email within 1-2 business days</li>
                      <li>
                        • Approved users will receive login credentials via
                        email
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                <span className="flex items-center justify-center">
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Submitting Request...
                    </>
                  ) : (
                    <>
                      Submit Request
                      <svg
                        className="ml-2 w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </>
                  )}
                </span>
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 py-6 bg-slate-50 border-t border-gray-200 rounded-b-lg">
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-purple-600 hover:text-purple-700"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Need immediate assistance?{" "}
            <a
              href="mailto:admin@company.com"
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              Contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}