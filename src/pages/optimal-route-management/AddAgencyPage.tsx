"use client";

import React, { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { hexToRgba } from "@/utils/functions";
import PageHeader from "@/components/common-components/static-components/PageHeader";
import { ToastNotification } from "@/components/common-components/ToastNotification";
import { LocationService } from "@/services/locationService";
import { AddAgencyRequest } from "@/types/location-types";
import { ADD_AGENCY_BREADCRUMB_DATA } from "@/data/breadcrumb-data";
import {
  Building2,
  MapPin,
  Save,
  RotateCcw,
  Loader2,
  Globe,
  Phone,
  MapPinned,
  FileText,
  Navigation,
  CheckCircle2,
} from "lucide-react";

/* ─────────────────────────────────────────────
   Form state shape
───────────────────────────────────────────── */
type FormState = {
  name: string;
  description: string;
  address: string;
  city: string;
  webSite: string;
  contactNumber: string;
  latitude: string;
  longitude: string;
};

const EMPTY_FORM: FormState = {
  name: "",
  description: "",
  address: "",
  city: "",
  webSite: "",
  contactNumber: "",
  latitude: "",
  longitude: "",
};

type FormErrors = Partial<Record<keyof FormState, string>>;

/** Only these fields are mandatory — everything else is optional */
const REQUIRED_FIELDS: (keyof FormState)[] = [
  "name",
  "latitude",
  "longitude",
];

const AddAgencyPage = () => {
  const { theme } = useTheme();

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [locating, setLocating] = useState(false);

  // Success state — show created ID
  const [createdId, setCreatedId] = useState<number | null>(null);

  const [toast, setToast] = useState<{
    type: "success" | "error";
    title: string;
    message: string;
  } | null>(null);

  /* ── Styles ── */
  const surface = theme.surface;
  const border = theme.border;
  const text = theme.text;
  const textSecondary = theme.textSecondary;
  const primary = theme.primary;
  const accent = theme.accent;

  /* ── Handlers ── */
  const handleChange =
    (field: keyof FormState) =>
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  const handleReset = () => {
    setForm(EMPTY_FORM);
    setErrors({});
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setToast({
        type: "error",
        title: "Not Supported",
        message: "Your browser does not support geolocation.",
      });
      return;
    }

    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setForm((prev) => ({
          ...prev,
          latitude: pos.coords.latitude.toFixed(6),
          longitude: pos.coords.longitude.toFixed(6),
        }));
        setErrors((prev) => ({
          ...prev,
          latitude: undefined,
          longitude: undefined,
        }));
        setLocating(false);
        setToast({
          type: "success",
          title: "Location Found",
          message: "Coordinates have been filled in from your current location.",
        });
      },
      () => {
        setLocating(false);
        setToast({
          type: "error",
          title: "Location Failed",
          message: "Could not get your location. Please enter coordinates manually.",
        });
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  /* ── Validation — only name, latitude, longitude are required ── */
  const validate = (): FormErrors => {
    const errs: FormErrors = {};

    // Required fields
    if (!form.name.trim()) errs.name = "Agency name is required.";

    if (!form.latitude.trim()) {
      errs.latitude = "Latitude is required.";
    } else {
      const lat = Number(form.latitude);
      if (Number.isNaN(lat) || lat < -90 || lat > 90) {
        errs.latitude = "Latitude must be between -90 and 90.";
      }
    }

    if (!form.longitude.trim()) {
      errs.longitude = "Longitude is required.";
    } else {
      const lng = Number(form.longitude);
      if (Number.isNaN(lng) || lng < -180 || lng > 180) {
        errs.longitude = "Longitude must be between -180 and 180.";
      }
    }

    // Optional field — only validate format IF user entered something
    if (form.webSite.trim()) {
      try {
        new URL(form.webSite.trim());
      } catch {
        errs.webSite = "Please enter a valid URL (e.g. https://example.com).";
      }
    }

    if (form.contactNumber.trim()) {
      if (!/^[+\d][\d\s()-]{5,}$/.test(form.contactNumber.trim())) {
        errs.contactNumber = "Please enter a valid phone number.";
      }
    }

    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setToast({
        type: "error",
        title: "Please check the form",
        message: "Some required fields need your attention before submitting.",
      });
      const firstKey = Object.keys(errs)[0];
      document
        .getElementById(`field-${firstKey}`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setErrors({});
    setSubmitting(true);

    // Send empty strings for optional fields that were left blank,
    // so the payload matches AddAgencyRequest (all `string`).
    const payload: AddAgencyRequest = {
      name: form.name.trim(),
      description: form.description.trim(),
      address: form.address.trim(),
      city: form.city.trim(),
      webSite: form.webSite.trim(),
      contactNumber: form.contactNumber.trim(),
      latitude: Number(form.latitude),
      longitude: Number(form.longitude),
    };

    try {
      const response = await LocationService.addAgency(payload);

      setCreatedId(response.data?.id ?? null);

      setToast({
        type: "success",
        title: "Agency Added!",
        message:
          response.data?.message ||
          `"${payload.name}" has been added successfully.`,
      });
    } catch (err: any) {
      const msg = err.message || "Failed to add agency";
      setToast({ type: "error", title: "Add Failed", message: msg });
    } finally {
      setSubmitting(false);
    }
  };

  /* ── Field renderer ── */
  const renderInput = (
    field: keyof FormState,
    label: string,
    opts: {
      icon?: React.ReactNode;
      placeholder?: string;
      type?: string;
      fullWidth?: boolean;
      hint?: string;
      textarea?: boolean;
      step?: string;
      min?: number;
      max?: number;
    } = {},
  ) => {
    const hasError = !!errors[field];
    const isRequired = REQUIRED_FIELDS.includes(field);
    const commonStyle: React.CSSProperties = {
      backgroundColor: theme.background,
      border: `1px solid ${hasError ? theme.error : border}`,
      color: text,
    };

    return (
      <div
        id={`field-${field}`}
        className={opts.fullWidth ? "md:col-span-2" : ""}
      >
        <label
          className="block text-xs font-semibold mb-1.5 flex items-center gap-1.5"
          style={{ color: textSecondary }}
        >
          {opts.icon}
          {label}
          {isRequired ? (
            <span style={{ color: theme.error }}>*</span>
          ) : (
            <span
              className="text-[10px] font-normal"
              style={{ color: textSecondary, opacity: 0.7 }}
            >
              (optional)
            </span>
          )}
        </label>

        {opts.textarea ? (
          <textarea
            value={form[field]}
            onChange={handleChange(field)}
            placeholder={opts.placeholder}
            rows={3}
            className="w-full px-3 py-2.5 rounded-xl text-sm outline-none transition-all duration-200 resize-y"
            style={commonStyle}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = hasError
                ? theme.error
                : primary;
              e.currentTarget.style.boxShadow = `0 0 0 3px ${hexToRgba(
                hasError ? theme.error : primary,
                0.12,
              )}`;
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = hasError
                ? theme.error
                : border;
              e.currentTarget.style.boxShadow = "none";
            }}
          />
        ) : (
          <input
            type={opts.type || "text"}
            value={form[field]}
            onChange={handleChange(field)}
            placeholder={opts.placeholder}
            step={opts.step}
            min={opts.min}
            max={opts.max}
            className="w-full px-3 py-2.5 rounded-xl text-sm outline-none transition-all duration-200"
            style={commonStyle}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = hasError
                ? theme.error
                : primary;
              e.currentTarget.style.boxShadow = `0 0 0 3px ${hexToRgba(
                hasError ? theme.error : primary,
                0.12,
              )}`;
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = hasError
                ? theme.error
                : border;
              e.currentTarget.style.boxShadow = "none";
            }}
          />
        )}

        {hasError ? (
          <p className="text-xs mt-1" style={{ color: theme.error }}>
            {errors[field]}
          </p>
        ) : opts.hint ? (
          <p className="text-xs mt-1" style={{ color: textSecondary }}>
            {opts.hint}
          </p>
        ) : null}
      </div>
    );
  };

  /* ── Success view ── */
  if (createdId !== null) {
    return (
      <div
        className="min-h-screen transition-colors duration-300"
        style={{ backgroundColor: theme.background }}
      >
        {toast && (
          <ToastNotification
            type={toast.type}
            title={toast.title}
            message={toast.message}
            onClose={() => setToast(null)}
          />
        )}

        <div
          className="sticky top-0 z-10 backdrop-blur-sm border-b transition-colors duration-300"
          style={{
            backgroundColor: `${surface}CC`,
            borderColor: border,
          }}
        >
          <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <PageHeader
              title="Add Agency"
              description="Register a new agency location"
              breadcrumbItems={ADD_AGENCY_BREADCRUMB_DATA}
            />
          </div>
        </div>

        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-2xl">
          <div
            className="rounded-2xl shadow-lg p-8 text-center"
            style={{
              backgroundColor: surface,
              border: `1px solid ${border}`,
            }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{
                backgroundColor: hexToRgba(theme.success, 0.12),
                color: theme.success,
              }}
            >
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h2 className="text-2xl font-bold mb-2" style={{ color: text }}>
              Agency Added Successfully
            </h2>
            <p className="text-sm mb-1" style={{ color: textSecondary }}>
              "{form.name}" has been registered.
            </p>
            <p className="text-xs mb-6" style={{ color: textSecondary }}>
              Agency ID:{" "}
              <span
                className="font-semibold px-2 py-0.5 rounded"
                style={{
                  backgroundColor: hexToRgba(primary, 0.12),
                  color: primary,
                }}
              >
                #{createdId}
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  setCreatedId(null);
                  setForm(EMPTY_FORM);
                }}
                className="cursor-pointer flex-1 px-4 py-3 rounded-xl text-white font-medium flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-200"
                style={{
                  background: `linear-gradient(135deg, ${primary}, ${accent})`,
                }}
              >
                <Building2 className="w-4 h-4" />
                Add Another Agency
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ── Form view ── */
  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: theme.background }}
    >
      {toast && (
        <ToastNotification
          type={toast.type}
          title={toast.title}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}

      {/* Header */}
      <div
        className="sticky top-0 z-10 backdrop-blur-sm border-b transition-colors duration-300"
        style={{
          backgroundColor: `${surface}CC`,
          borderColor: border,
        }}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <PageHeader
            title="Add Agency"
            description="Register a new agency location with details and coordinates"
            breadcrumbItems={ADD_AGENCY_BREADCRUMB_DATA}
          />
        </div>
      </div>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl">
        <form onSubmit={handleSubmit}>
          <div
            className="rounded-2xl shadow-lg p-6 sm:p-8 transition-colors duration-300"
            style={{
              backgroundColor: surface,
              border: `1px solid ${border}`,
            }}
          >
            <h2
              className="text-lg font-bold mb-1 flex items-center gap-2"
              style={{ color: text }}
            >
              <Building2 className="w-5 h-5" style={{ color: primary }} />
              Agency Details
            </h2>
            <p className="text-xs mb-6" style={{ color: textSecondary }}>
              Fields marked with{" "}
              <span style={{ color: theme.error }}>*</span> are required.
              Coordinates are used for route optimization.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {renderInput("name", "Agency Name", {
                icon: <Building2 className="w-3.5 h-3.5" />,
                placeholder: "e.g. WTC Colombo",
                fullWidth: true,
              })}

              {renderInput("description", "Description", {
                icon: <FileText className="w-3.5 h-3.5" />,
                placeholder: "A short description about this agency...",
                textarea: true,
                fullWidth: true,
              })}

              {renderInput("address", "Address", {
                icon: <MapPin className="w-3.5 h-3.5" />,
                placeholder: "Street address",
                fullWidth: true,
              })}

              {renderInput("city", "City", {
                icon: <MapPinned className="w-3.5 h-3.5" />,
                placeholder: "e.g. Colombo",
              })}

              {renderInput("contactNumber", "Contact Number", {
                icon: <Phone className="w-3.5 h-3.5" />,
                placeholder: "e.g. +94 11 234 5678",
                type: "tel",
              })}

              {renderInput("webSite", "Website URL", {
                icon: <Globe className="w-3.5 h-3.5" />,
                placeholder: "https://example.com",
                type: "url",
                fullWidth: true,
              })}
            </div>

            {/* Coordinates section */}
            <div
              className="mt-8 pt-6"
              style={{ borderTop: `1px solid ${border}` }}
            >
              <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
                <h3
                  className="text-sm font-bold flex items-center gap-2"
                  style={{ color: text }}
                >
                  <Navigation
                    className="w-4 h-4"
                    style={{ color: accent }}
                  />
                  Location Coordinates{" "}
                  <span style={{ color: theme.error }}>*</span>
                </h3>
                <button
                  type="button"
                  onClick={handleUseCurrentLocation}
                  disabled={locating}
                  className="cursor-pointer px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: hexToRgba(accent, 0.12),
                    color: accent,
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = hexToRgba(
                      accent,
                      0.2,
                    ))
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = hexToRgba(
                      accent,
                      0.12,
                    ))
                  }
                >
                  {locating ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Locating...
                    </>
                  ) : (
                    <>
                      <MapPinned className="w-3.5 h-3.5" />
                      Use my current location
                    </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {renderInput("latitude", "Latitude", {
                  icon: <MapPin className="w-3.5 h-3.5" />,
                  placeholder: "e.g. 6.9271",
                  type: "number",
                  step: "any",
                  min: -90,
                  max: 90,
                  hint: "Between -90 and 90",
                })}

                {renderInput("longitude", "Longitude", {
                  icon: <MapPin className="w-3.5 h-3.5" />,
                  placeholder: "e.g. 79.8612",
                  type: "number",
                  step: "any",
                  min: -180,
                  max: 180,
                  hint: "Between -180 and 180",
                })}
              </div>

              {/* Live preview of coordinates */}
              {form.latitude && form.longitude && (
                <div
                  className="mt-4 p-3 rounded-xl flex items-center gap-2"
                  style={{
                    backgroundColor: hexToRgba(primary, 0.06),
                    border: `1px solid ${hexToRgba(primary, 0.15)}`,
                  }}
                >
                  <MapPin
                    className="w-4 h-4 flex-shrink-0"
                    style={{ color: primary }}
                  />
                  <span
                    className="text-xs"
                    style={{ color: textSecondary }}
                  >
                    Preview:{" "}
                    <span
                      className="font-mono font-semibold"
                      style={{ color: primary }}
                    >
                      {form.latitude}, {form.longitude}
                    </span>
                  </span>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${form.latitude},${form.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto text-xs font-medium flex items-center gap-1"
                    style={{ color: primary }}
                  >
                    Verify on map
                    <Navigation className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleReset}
                disabled={submitting}
                className="cursor-pointer flex-1 px-6 py-3.5 rounded-xl border-2 font-medium flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: theme.background,
                  borderColor: border,
                  color: textSecondary,
                }}
                onMouseEnter={(e) => {
                  if (!submitting) {
                    e.currentTarget.style.borderColor = primary;
                    e.currentTarget.style.color = primary;
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = border;
                  e.currentTarget.style.color = textSecondary;
                }}
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>

              <button
                type="submit"
                disabled={submitting}
                className="cursor-pointer flex-1 px-6 py-3.5 rounded-xl text-white font-medium flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: `linear-gradient(135deg, ${primary}, ${accent})`,
                }}
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Adding Agency...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Add Agency
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAgencyPage;