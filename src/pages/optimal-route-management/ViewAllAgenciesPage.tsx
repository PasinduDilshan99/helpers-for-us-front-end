"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { hexToRgba } from "@/utils/functions";
import PageHeader from "@/components/common-components/static-components/PageHeader";
import CommonLoading from "@/components/common-components/CommonLoading";
import CommonErrorState from "@/components/common-components/CommonErrorState";
import { ToastNotification } from "@/components/common-components/ToastNotification";
import { LocationService } from "@/services/locationService";
import { Agency } from "@/types/location-types";
import { VIEW_ALL_AGENCIES_BREADCRUMB_DATA } from "@/data/breadcrumb-data";
import {
  Search,
  Building2,
  MapPin,
  ExternalLink,
  Navigation,
  X,
  Grid3x3,
  List,
  SortAsc,
  Loader2,
  Plus,
  MapPinned,
  Globe,
} from "lucide-react";
import Link from "next/link";
import { ADD_AGENCY_URL } from "@/utils/urls";

type SortKey = "name-asc" | "name-desc" | "city-asc" | "city-desc" | "newest";
type ViewMode = "grid" | "list";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "name-asc", label: "Name (A → Z)" },
  { value: "name-desc", label: "Name (Z → A)" },
  { value: "city-asc", label: "City (A → Z)" },
  { value: "city-desc", label: "City (Z → A)" },
  { value: "newest", label: "Newest first" },
];

const ViewAllAgenciesPage = () => {
  const { theme } = useTheme();

  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<SortKey>("name-asc");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

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

  /* ── Fetch ── */
  const fetchAgencies = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await LocationService.getAllAgencies();
      setAgencies(response.data || []);
    } catch (err: any) {
      const msg = err.message || "Failed to load agencies";
      setError(msg);
      setToast({ type: "error", title: "Load Failed", message: msg });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAgencies();
  }, [fetchAgencies]);

  /* ── Filter + sort ── */
  const processedAgencies = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    let list = agencies.filter((a) => {
      if (!term) return true;
      return (
        a.name.toLowerCase().includes(term) ||
        a.city.toLowerCase().includes(term)
      );
    });

    list = [...list].sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "city-asc":
          return a.city.localeCompare(b.city);
        case "city-desc":
          return b.city.localeCompare(a.city);
        case "newest":
          return b.agencyId - a.agencyId;
        default:
          return 0;
      }
    });

    return list;
  }, [agencies, searchTerm, sortBy]);

  /* ── Helpers ── */
  const navigateUrl = (a: Agency) =>
    `https://www.google.com/maps/dir/?api=1&destination=${a.latitude},${a.longitude}&travelmode=driving`;

  const viewOnMapUrl = (a: Agency) =>
    `https://www.google.com/maps/search/?api=1&query=${a.latitude},${a.longitude}`;

  /* ── Loading ── */
  if (loading) {
    return (
      <CommonLoading
        message="Loading agencies..."
        subMessage="Fetching all registered agency locations"
        size="lg"
      />
    );
  }

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
            title="All Agencies"
            description="Browse every registered agency location"
            breadcrumbItems={VIEW_ALL_AGENCIES_BREADCRUMB_DATA}
          />
        </div>
      </div>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error banner */}
        {error && (
          <div className="mb-6">
            <CommonErrorState
              title="Unable to Load Agencies"
              message={error}
              onRetry={fetchAgencies}
            />
          </div>
        )}

        {!error && (
          <>
            {/* Toolbar */}
            <div
              className="rounded-2xl shadow-lg p-4 sm:p-5 mb-6 transition-colors duration-300"
              style={{
                backgroundColor: surface,
                border: `1px solid ${border}`,
              }}
            >
              <div className="flex flex-col lg:flex-row gap-3">
                {/* Search */}
                <div className="relative flex-1">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                    style={{ color: textSecondary }}
                  />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by agency name or city..."
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl text-sm outline-none transition-all duration-200"
                    style={{
                      backgroundColor: theme.background,
                      border: `1px solid ${border}`,
                      color: text,
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = primary;
                      e.currentTarget.style.boxShadow = `0 0 0 3px ${hexToRgba(
                        primary,
                        0.12,
                      )}`;
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = border;
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full cursor-pointer"
                      style={{ color: textSecondary }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = text)
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = textSecondary)
                      }
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Sort */}
                <div className="relative">
                  <SortAsc
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                    style={{ color: textSecondary }}
                  />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortKey)}
                    className="w-full lg:w-56 pl-10 pr-8 py-2.5 rounded-xl text-sm outline-none cursor-pointer appearance-none transition-all duration-200"
                    style={{
                      backgroundColor: theme.background,
                      border: `1px solid ${border}`,
                      color: text,
                    }}
                  >
                    {SORT_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* View mode toggle */}
                <div
                  className="flex items-center rounded-xl p-1"
                  style={{
                    backgroundColor: theme.background,
                    border: `1px solid ${border}`,
                  }}
                >
                  <button
                    onClick={() => setViewMode("grid")}
                    className="cursor-pointer px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-medium transition-all duration-200"
                    style={{
                      backgroundColor:
                        viewMode === "grid"
                          ? hexToRgba(primary, 0.12)
                          : "transparent",
                      color:
                        viewMode === "grid" ? primary : textSecondary,
                    }}
                  >
                    <Grid3x3 className="w-3.5 h-3.5" />
                    Grid
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className="cursor-pointer px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-medium transition-all duration-200"
                    style={{
                      backgroundColor:
                        viewMode === "list"
                          ? hexToRgba(primary, 0.12)
                          : "transparent",
                      color:
                        viewMode === "list" ? primary : textSecondary,
                    }}
                  >
                    <List className="w-3.5 h-3.5" />
                    List
                  </button>
                </div>

                {/* Add agency link */}
                <Link
                  href={ADD_AGENCY_URL}
                  className="cursor-pointer px-4 py-2.5 rounded-xl text-white text-sm font-medium flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-200 whitespace-nowrap"
                  style={{
                    background: `linear-gradient(135deg, ${primary}, ${accent})`,
                  }}
                >
                  <Plus className="w-4 h-4" />
                  Add Agency
                </Link>
              </div>

              {/* Results count */}
              <div
                className="mt-3 text-xs flex items-center gap-2"
                style={{ color: textSecondary }}
              >
                <Building2 className="w-3.5 h-3.5" />
                {searchTerm ? (
                  <>
                    Found{" "}
                    <span
                      className="font-semibold"
                      style={{ color: primary }}
                    >
                      {processedAgencies.length}
                    </span>{" "}
                    of {agencies.length} agencies matching "{searchTerm}"
                  </>
                ) : (
                  <>
                    Showing{" "}
                    <span
                      className="font-semibold"
                      style={{ color: primary }}
                    >
                      {agencies.length}
                    </span>{" "}
                    {agencies.length === 1 ? "agency" : "agencies"}
                  </>
                )}
              </div>
            </div>

            {/* Empty state */}
            {agencies.length === 0 ? (
              <div
                className="rounded-2xl p-12 text-center transition-colors duration-300"
                style={{
                  backgroundColor: surface,
                  border: `1px dashed ${border}`,
                }}
              >
                <Building2
                  className="w-14 h-14 mx-auto mb-3"
                  style={{ color: textSecondary }}
                />
                <h3
                  className="text-lg font-bold mb-1"
                  style={{ color: text }}
                >
                  No agencies yet
                </h3>
                <p
                  className="text-sm mb-5"
                  style={{ color: textSecondary }}
                >
                  Add your first agency to get started.
                </p>
                <Link
                  href={ADD_AGENCY_URL}
                  className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                  style={{
                    background: `linear-gradient(135deg, ${primary}, ${accent})`,
                  }}
                >
                  <Plus className="w-4 h-4" />
                  Add Agency
                </Link>
              </div>
            ) : processedAgencies.length === 0 ? (
              <div
                className="rounded-2xl p-12 text-center transition-colors duration-300"
                style={{
                  backgroundColor: surface,
                  border: `1px dashed ${border}`,
                }}
              >
                <Search
                  className="w-12 h-12 mx-auto mb-3"
                  style={{ color: textSecondary }}
                />
                <h3
                  className="text-base font-bold mb-1"
                  style={{ color: text }}
                >
                  No agencies match your search
                </h3>
                <p
                  className="text-sm mb-4"
                  style={{ color: textSecondary }}
                >
                  Try a different name or city.
                </p>
                <button
                  onClick={() => setSearchTerm("")}
                  className="cursor-pointer px-4 py-2 rounded-xl border-2 text-sm font-medium transition-all duration-200"
                  style={{
                    backgroundColor: theme.background,
                    borderColor: border,
                    color: textSecondary,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = primary;
                    e.currentTarget.style.color = primary;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = border;
                    e.currentTarget.style.color = textSecondary;
                  }}
                >
                  Clear search
                </button>
              </div>
            ) : viewMode === "grid" ? (
              /* ── GRID ── */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {processedAgencies.map((agency) => (
                  <div
                    key={agency.agencyId}
                    className="rounded-2xl shadow-md p-5 transition-all duration-200 flex flex-col"
                    style={{
                      backgroundColor: surface,
                      border: `1px solid ${border}`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = hexToRgba(
                        primary,
                        0.4,
                      );
                      e.currentTarget.style.boxShadow =
                        "0 8px 24px rgba(0,0,0,0.08)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = border;
                      e.currentTarget.style.boxShadow = "";
                    }}
                  >
                    {/* Top row */}
                    <div className="flex items-start gap-3 mb-3">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{
                          backgroundColor: hexToRgba(primary, 0.1),
                          color: primary,
                        }}
                      >
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3
                          className="font-bold text-sm leading-tight truncate"
                          style={{ color: text }}
                        >
                          {agency.name}
                        </h3>
                        <p
                          className="text-xs flex items-center gap-1 mt-0.5"
                          style={{ color: textSecondary }}
                        >
                          <MapPinned className="w-3 h-3" />
                          {agency.city}
                        </p>
                      </div>
                      <span
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
                        style={{
                          backgroundColor: hexToRgba(accent, 0.12),
                          color: accent,
                        }}
                      >
                        #{agency.agencyId}
                      </span>
                    </div>

                    {/* Coordinates */}
                    <div
                      className="rounded-lg px-2.5 py-1.5 mb-3"
                      style={{
                        backgroundColor: theme.background,
                        border: `1px solid ${border}`,
                      }}
                    >
                      <p
                        className="text-[11px] font-mono flex items-center gap-1.5"
                        style={{ color: textSecondary }}
                      >
                        <MapPin className="w-3 h-3" />
                        {agency.latitude.toFixed(4)},{" "}
                        {agency.longitude.toFixed(4)}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="mt-auto flex items-center gap-2">
                      <a
                        href={navigateUrl(agency)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cursor-pointer flex-1 px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-all duration-200 text-white"
                        style={{
                          background: `linear-gradient(135deg, ${primary}, ${accent})`,
                        }}
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        Navigate
                      </a>
                      {agency.webSiteUrl && (
                        <a
                          href={agency.webSiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cursor-pointer p-2 rounded-xl transition-colors"
                          style={{
                            backgroundColor: theme.background,
                            border: `1px solid ${border}`,
                            color: textSecondary,
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = primary;
                            e.currentTarget.style.borderColor = hexToRgba(
                              primary,
                              0.4,
                            );
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = textSecondary;
                            e.currentTarget.style.borderColor = border;
                          }}
                          title="Open website"
                        >
                          <Globe className="w-3.5 h-3.5" />
                        </a>
                      )}
                      <a
                        href={viewOnMapUrl(agency)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cursor-pointer p-2 rounded-xl transition-colors"
                        style={{
                          backgroundColor: theme.background,
                          border: `1px solid ${border}`,
                          color: textSecondary,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = primary;
                          e.currentTarget.style.borderColor = hexToRgba(
                            primary,
                            0.4,
                          );
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = textSecondary;
                          e.currentTarget.style.borderColor = border;
                        }}
                        title="View on map"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* ── LIST ── */
              <div className="space-y-3">
                {processedAgencies.map((agency) => (
                  <div
                    key={agency.agencyId}
                    className="rounded-2xl shadow-md p-4 transition-all duration-200"
                    style={{
                      backgroundColor: surface,
                      border: `1px solid ${border}`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = hexToRgba(
                        primary,
                        0.4,
                      );
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = border;
                    }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{
                          backgroundColor: hexToRgba(primary, 0.1),
                          color: primary,
                        }}
                      >
                        <Building2 className="w-5 h-5" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3
                            className="font-bold text-sm truncate"
                            style={{ color: text }}
                          >
                            {agency.name}
                          </h3>
                          <span
                            className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                            style={{
                              backgroundColor: hexToRgba(accent, 0.12),
                              color: accent,
                            }}
                          >
                            #{agency.agencyId}
                          </span>
                          <span
                            className="text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1"
                            style={{
                              backgroundColor: theme.background,
                              color: textSecondary,
                              border: `1px solid ${border}`,
                            }}
                          >
                            <MapPinned className="w-3 h-3" />
                            {agency.city}
                          </span>
                        </div>
                        <p
                          className="text-[11px] font-mono mt-1 flex items-center gap-1.5"
                          style={{ color: textSecondary }}
                        >
                          <MapPin className="w-3 h-3" />
                          {agency.latitude.toFixed(4)},{" "}
                          {agency.longitude.toFixed(4)}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <a
                          href={navigateUrl(agency)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cursor-pointer px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all duration-200 text-white"
                          style={{
                            background: `linear-gradient(135deg, ${primary}, ${accent})`,
                          }}
                        >
                          <Navigation className="w-3.5 h-3.5" />
                          Navigate
                        </a>
                        {agency.webSiteUrl && (
                          <a
                            href={agency.webSiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cursor-pointer p-2 rounded-xl transition-colors"
                            style={{
                              backgroundColor: theme.background,
                              border: `1px solid ${border}`,
                              color: textSecondary,
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = primary;
                              e.currentTarget.style.borderColor = hexToRgba(
                                primary,
                                0.4,
                              );
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = textSecondary;
                              e.currentTarget.style.borderColor = border;
                            }}
                            title="Open website"
                          >
                            <Globe className="w-4 h-4" />
                          </a>
                        )}
                        <a
                          href={viewOnMapUrl(agency)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cursor-pointer p-2 rounded-xl transition-colors"
                          style={{
                            backgroundColor: theme.background,
                            border: `1px solid ${border}`,
                            color: textSecondary,
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = primary;
                            e.currentTarget.style.borderColor = hexToRgba(
                              primary,
                              0.4,
                            );
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = textSecondary;
                            e.currentTarget.style.borderColor = border;
                          }}
                          title="View on map"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ViewAllAgenciesPage;