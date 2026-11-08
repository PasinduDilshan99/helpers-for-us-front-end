"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  Suspense,
} from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { hexToRgba } from "@/utils/functions";
import PageHeader from "@/components/common-components/static-components/PageHeader";
import CommonLoading from "@/components/common-components/CommonLoading";
import CommonErrorState from "@/components/common-components/CommonErrorState";
import { ToastNotification } from "@/components/common-components/ToastNotification";
import {
  Search,
  MapPin,
  Plus,
  X,
  Trash2,
  Route,
  Building2,
  ExternalLink,
  Loader2,
  Map,
  Check,
  Navigation,
} from "lucide-react";
import { LocationService } from "@/services/locationService";
import { Agency, OptimalDestination } from "@/types/location-types";
import { FIND_OPTIMAL_ROUTE_BREADCRUMB_DATA } from "@/data/breadcrumb-data";

const FindOptimalRouteContent = () => {
  const { theme } = useTheme();

  // ── State ──
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [loadingAgencies, setLoadingAgencies] = useState(true);
  const [agenciesError, setAgenciesError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAgencies, setSelectedAgencies] = useState<Agency[]>([]);
  const [startLocationId, setStartLocationId] = useState<number | null>(null);
  const [endLocationId, setEndLocationId] = useState<number | null>(null);
  const [isSeeSister, setIsSeeSister] = useState(false);
  const [isBarista, setIsBarista] = useState(false);

  const [optimalDestinations, setOptimalDestinations] = useState<
    OptimalDestination[] | null
  >(null);
  const [loadingRoute, setLoadingRoute] = useState(false);
  const [routeError, setRouteError] = useState<string | null>(null);

  const [toast, setToast] = useState<{
    type: "success" | "error";
    title: string;
    message: string;
  } | null>(null);

  // ── Fetch agencies ──
  useEffect(() => {
    fetchAgencies();
  }, []);

  const fetchAgencies = async () => {
    setLoadingAgencies(true);
    setAgenciesError(null);
    try {
      const response = await LocationService.getAllAgencies();
      const list = response.data || [];
      setAgencies(list);

      // ── Auto-set default "WTC" as start & end ──
      const wtc = list.find((a) => a.name.trim().toLowerCase() === "wtc");
      if (wtc) {
        setStartLocationId(wtc.agencyId);
        setEndLocationId(wtc.agencyId);
      }
    } catch (err: any) {
      const msg = err.message || "Failed to load agencies";
      setAgenciesError(msg);
      setToast({ type: "error", title: "Load Failed", message: msg });
    } finally {
      setLoadingAgencies(false);
    }
  };

  // ── Filtered agencies ──
  const filteredAgencies = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    const selectedIds = new Set(selectedAgencies.map((a) => a.agencyId));

    return agencies.filter((agency) => {
      if (selectedIds.has(agency.agencyId)) return false;
      if (!term) return true;
      return (
        agency.name.toLowerCase().includes(term) ||
        agency.city.toLowerCase().includes(term)
      );
    });
  }, [agencies, searchTerm, selectedAgencies]);

  // ── Handlers ──
  const handleAddAgency = (agency: Agency) => {
    setSelectedAgencies((prev) => {
      if (prev.some((a) => a.agencyId === agency.agencyId)) return prev;
      return [...prev, agency];
    });
    setSearchTerm("");
  };

  const handleRemoveAgency = (agencyId: number) => {
    setSelectedAgencies((prev) => prev.filter((a) => a.agencyId !== agencyId));
    // No longer null out start/end — WTC default may not be in the list.
  };

  const handleClearAll = () => {
    setSelectedAgencies([]);
    setOptimalDestinations(null);
    setRouteError(null);
    // Keep start/end on WTC default if available
    const wtc = agencies.find((a) => a.name.trim().toLowerCase() === "wtc");
    setStartLocationId(wtc?.agencyId ?? null);
    setEndLocationId(wtc?.agencyId ?? null);
  };

  const handleFindOptimalRoute = async () => {
    if (selectedAgencies.length < 2) {
      setToast({
        type: "error",
        title: "Not Enough Agencies",
        message: "Please select at least 2 agencies to find an optimal route.",
      });
      return;
    }

    // No start/end validation — fall back to WTC / 0 if unset
    const wtc = agencies.find((a) => a.name.trim().toLowerCase() === "wtc");
    const resolvedStart = startLocationId ?? wtc?.agencyId ?? 0;
    const resolvedEnd = endLocationId ?? wtc?.agencyId ?? 0;

    setLoadingRoute(true);
    setRouteError(null);
    setOptimalDestinations(null);

    try {
      const response = await LocationService.getOptimalDestinations({
        startLocation: resolvedStart,
        endLocation: resolvedEnd,
        locations: selectedAgencies.map((a) => a.agencyId),
        isSeeSister: isSeeSister,
        isBarista: isBarista,
      });

      setOptimalDestinations(response.data || []);
      setToast({
        type: "success",
        title: "Route Found!",
        message: `Optimal route calculated across ${response.data?.length || 0} stops.`,
      });
    } catch (err: any) {
      const msg = err.message || "Failed to calculate optimal route";
      setRouteError(msg);
      setToast({ type: "error", title: "Route Failed", message: msg });
    } finally {
      setLoadingRoute(false);
    }
  };

  // ── Build Google Maps URL (multi-stop) ──
  const buildGoogleMapsUrl = () => {
    if (!optimalDestinations || optimalDestinations.length === 0) return "";

    const points = optimalDestinations.map(
      (d) => `${d.latitude},${d.longitude}`,
    );

    if (points.length === 1) {
      return `https://www.google.com/maps/search/?api=1&query=${points[0]}`;
    }

    const origin = points[0];
    const destination = points[points.length - 1];
    const waypoints = points.slice(1, -1);

    let url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;

    if (waypoints.length > 0) {
      url += `&waypoints=${waypoints.join("|")}`;
    }

    return url;
  };

  // ── Build single-agency navigation URL ──
  const buildAgencyNavigationUrl = (agency: Agency) =>
    `https://www.google.com/maps/dir/?api=1&destination=${agency.latitude},${agency.longitude}&travelmode=driving`;

  const handleOpenGoogleMaps = () => {
    const url = buildGoogleMapsUrl();
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleNavigateToAgency = (agency: Agency) => {
    const url = buildAgencyNavigationUrl(agency);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // ── Copy link helper ──
  const handleCopyLink = async () => {
    const url = buildGoogleMapsUrl();
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      setToast({
        type: "success",
        title: "Link Copied",
        message: "Google Maps link copied to clipboard.",
      });
    } catch {
      setToast({
        type: "error",
        title: "Copy Failed",
        message: "Could not copy link. Please try again.",
      });
    }
  };

  // ── Styles ──
  const surface = theme.surface;
  const border = theme.border;
  const text = theme.text;
  const textSecondary = theme.textSecondary;
  const primary = theme.primary;
  const accent = theme.accent;

  // ── Render helper: agency row ──
  const renderAgencyRow = (agency: Agency, showRemove: boolean) => (
    <div
      key={agency.agencyId}
      className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group"
      style={{
        backgroundColor: theme.background,
        border: `1px solid ${border}`,
      }}
    >
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: hexToRgba(primary, 0.1), color: primary }}
      >
        <Building2 className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="font-medium text-sm truncate" style={{ color: text }}>
            {agency.name}
          </p>
          <span
            className="text-[10px] px-1.5 py-0.5 rounded-full font-medium flex-shrink-0"
            style={{
              backgroundColor: hexToRgba(accent, 0.12),
              color: accent,
            }}
          >
            {agency.city}
          </span>
        </div>
        <p className="text-xs truncate mt-0.5" style={{ color: textSecondary }}>
          {agency.latitude.toFixed(4)}, {agency.longitude.toFixed(4)}
        </p>
      </div>

      {/* Navigate in Google Maps */}
      <button
        onClick={() => handleNavigateToAgency(agency)}
        className="cursor-pointer p-1.5 rounded-lg transition-colors flex-shrink-0"
        style={{ color: textSecondary }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = primary;
          e.currentTarget.style.backgroundColor = hexToRgba(primary, 0.1);
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = textSecondary;
          e.currentTarget.style.backgroundColor = "transparent";
        }}
        title="Navigate in Google Maps"
      >
        <Navigation className="w-4 h-4" />
      </button>

      {agency.webSiteUrl && (
        <a
          href={agency.webSiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 rounded-lg transition-colors flex-shrink-0"
          style={{ color: textSecondary }}
          onMouseEnter={(e) => (e.currentTarget.style.color = primary)}
          onMouseLeave={(e) => (e.currentTarget.style.color = textSecondary)}
          title="Open website"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      )}
      {showRemove && (
        <button
          onClick={() => handleRemoveAgency(agency.agencyId)}
          className="cursor-pointer p-1.5 rounded-lg transition-colors flex-shrink-0"
          style={{ color: textSecondary }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = theme.error;
            e.currentTarget.style.backgroundColor = hexToRgba(theme.error, 0.1);
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = textSecondary;
            e.currentTarget.style.backgroundColor = "transparent";
          }}
          title="Remove agency"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}
    </div>
  );

  // ── Loading ──
  if (loadingAgencies) {
    return (
      <CommonLoading
        message="Loading agencies..."
        subMessage="Please wait while we fetch available agencies"
        size="lg"
      />
    );
  }

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: theme.background }}
    >
      {/* Toast */}
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
            title="Find Optimal Route"
            description="Select agencies and find the most efficient travel route"
            breadcrumbItems={FIND_OPTIMAL_ROUTE_BREADCRUMB_DATA}
          />
        </div>
      </div>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error banner */}
        {agenciesError && (
          <div className="mb-6">
            <CommonErrorState
              title="Unable to Load Agencies"
              message={agenciesError}
              onRetry={fetchAgencies}
            />
          </div>
        )}

        {!agenciesError && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* ── Left Column: Search + Agency List ── */}
            <div className="lg:col-span-2 space-y-6">
              {/* Search Card */}
              <div
                className="rounded-2xl shadow-lg p-6 transition-colors duration-300"
                style={{
                  backgroundColor: surface,
                  border: `1px solid ${border}`,
                }}
              >
                <h2
                  className="text-lg font-bold mb-4 flex items-center gap-2"
                  style={{ color: text }}
                >
                  <Search className="w-5 h-5" style={{ color: primary }} />
                  Search Agencies
                </h2>

                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                    style={{ color: textSecondary }}
                  />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by agency name or city..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl outline-none transition-all duration-200 text-sm"
                    style={{
                      backgroundColor: theme.background,
                      border: `1px solid ${border}`,
                      color: text,
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = primary;
                      e.currentTarget.style.boxShadow = `0 0 0 3px ${hexToRgba(primary, 0.12)}`;
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = border;
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full cursor-pointer"
                      style={{ color: textSecondary }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = text)}
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = textSecondary)
                      }
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Agency list */}
                <div className="mt-4 space-y-2 max-h-[420px] overflow-y-auto pr-1">
                  {filteredAgencies.length === 0 ? (
                    <div className="text-center py-8">
                      <Building2
                        className="w-10 h-10 mx-auto mb-2"
                        style={{ color: textSecondary }}
                      />
                      <p className="text-sm" style={{ color: textSecondary }}>
                        {searchTerm
                          ? "No agencies match your search"
                          : "All available agencies are already selected"}
                      </p>
                    </div>
                  ) : (
                    filteredAgencies.map((agency) => (
                      <button
                        key={agency.agencyId}
                        onClick={() => handleAddAgency(agency)}
                        className="w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200 cursor-pointer group"
                        style={{
                          backgroundColor: theme.background,
                          border: `1px solid ${border}`,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = primary;
                          e.currentTarget.style.backgroundColor = hexToRgba(
                            primary,
                            0.05,
                          );
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = border;
                          e.currentTarget.style.backgroundColor =
                            theme.background;
                        }}
                      >
                        <div
                          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{
                            backgroundColor: hexToRgba(primary, 0.1),
                            color: primary,
                          }}
                        >
                          <Building2 className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p
                              className="font-medium text-sm truncate"
                              style={{ color: text }}
                            >
                              {agency.name}
                            </p>
                            <span
                              className="text-[10px] px-1.5 py-0.5 rounded-full font-medium flex-shrink-0"
                              style={{
                                backgroundColor: hexToRgba(accent, 0.12),
                                color: accent,
                              }}
                            >
                              {agency.city}
                            </span>
                          </div>
                          <p
                            className="text-xs truncate mt-0.5"
                            style={{ color: textSecondary }}
                          >
                            {agency.latitude.toFixed(4)},{" "}
                            {agency.longitude.toFixed(4)}
                          </p>
                        </div>
                        <Plus
                          className="w-4 h-4 flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                          style={{ color: primary }}
                        />
                      </button>
                    ))
                  )}
                </div>
              </div>

              {/* Selected Agencies Card */}
              <div
                className="rounded-2xl shadow-lg p-6 transition-colors duration-300"
                style={{
                  backgroundColor: surface,
                  border: `1px solid ${border}`,
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h2
                    className="text-lg font-bold flex items-center gap-2"
                    style={{ color: text }}
                  >
                    <MapPin className="w-5 h-5" style={{ color: accent }} />
                    Selected Agencies
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-semibold"
                      style={{
                        backgroundColor: hexToRgba(primary, 0.12),
                        color: primary,
                      }}
                    >
                      {selectedAgencies.length}
                    </span>
                  </h2>
                  {selectedAgencies.length > 0 && (
                    <button
                      onClick={handleClearAll}
                      className="cursor-pointer text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
                      style={{ color: theme.error }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = hexToRgba(
                          theme.error,
                          0.1,
                        ))
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "transparent")
                      }
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {selectedAgencies.length === 0 ? (
                  <div
                    className="text-center py-10 rounded-xl"
                    style={{
                      backgroundColor: theme.background,
                      border: `1px dashed ${border}`,
                    }}
                  >
                    <Route
                      className="w-10 h-10 mx-auto mb-2"
                      style={{ color: textSecondary }}
                    />
                    <p className="text-sm" style={{ color: textSecondary }}>
                      No agencies selected yet
                    </p>
                    <p
                      className="text-xs mt-1"
                      style={{ color: textSecondary }}
                    >
                      Search and add at least 2 agencies to find a route
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {selectedAgencies.map((agency) =>
                      renderAgencyRow(agency, true),
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* ── Right Column: Configuration + Action ── */}
            <div className="space-y-6">
              {/* Configuration Card */}
              <div
                className="rounded-2xl shadow-lg p-6 transition-colors duration-300"
                style={{
                  backgroundColor: surface,
                  border: `1px solid ${border}`,
                }}
              >
                <h2
                  className="text-lg font-bold mb-4 flex items-center gap-2"
                  style={{ color: text }}
                >
                  <Route className="w-5 h-5" style={{ color: primary }} />
                  Route Configuration
                </h2>

                {/* Start location */}
                <div className="mb-4">
                  <label
                    className="block text-xs font-semibold mb-1.5"
                    style={{ color: textSecondary }}
                  >
                    Start Location
                  </label>
                  <select
                    value={startLocationId ?? ""}
                    onChange={(e) =>
                      setStartLocationId(
                        e.target.value ? Number(e.target.value) : null,
                      )
                    }
                    className="w-full px-3 py-2.5 rounded-xl text-sm outline-none transition-all duration-200"
                    style={{
                      backgroundColor: theme.background,
                      border: `1px solid ${border}`,
                      color: text,
                    }}
                  >
                    <option value="">Select start agency</option>
                    {selectedAgencies.map((a) => (
                      <option key={a.agencyId} value={a.agencyId}>
                        {a.name} — {a.city}
                      </option>
                    ))}
                  </select>
                </div>

                {/* End location */}
                <div className="mb-4">
                  <label
                    className="block text-xs font-semibold mb-1.5"
                    style={{ color: textSecondary }}
                  >
                    End Location
                  </label>
                  <select
                    value={endLocationId ?? ""}
                    onChange={(e) =>
                      setEndLocationId(
                        e.target.value ? Number(e.target.value) : null,
                      )
                    }
                    className="w-full px-3 py-2.5 rounded-xl text-sm outline-none transition-all duration-200"
                    style={{
                      backgroundColor: theme.background,
                      border: `1px solid ${border}`,
                      color: text,
                    }}
                  >
                    <option value="">Select end agency</option>
                    {selectedAgencies.map((a) => (
                      <option key={a.agencyId} value={a.agencyId}>
                        {a.name} — {a.city}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Nested Toggles: Sister → Barista */}
                <div className="space-y-2 mt-6">
                  {/* Parent: Include Sister Agencies */}
                  <label
                    className="flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors"
                    style={{
                      backgroundColor: theme.background,
                      border: `1px solid ${isSeeSister ? hexToRgba(accent, 0.4) : border}`,
                    }}
                  >
                    <span
                      className="text-sm font-medium flex items-center gap-2"
                      style={{ color: text }}
                    >
                      <span
                        className="w-6 h-6 rounded-full flex items-center justify-center text-xs"
                        style={{
                          backgroundColor: hexToRgba(accent, 0.12),
                          color: accent,
                        }}
                      >
                        👭
                      </span>
                       Meet my sister
                    </span>
                    <input
                      type="checkbox"
                      checked={isSeeSister}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setIsSeeSister(checked);
                        // Reset child toggle when parent is unchecked
                        if (!checked) setIsBarista(false);
                      }}
                      className="w-4 h-4 rounded cursor-pointer"
                      style={{ accentColor: primary }}
                    />
                  </label>

                  {/* Child: Include Barista Locations — only when sister enabled */}
                  {isSeeSister && (
                    <div
                      className="ml-6 pl-4 rounded-xl transition-all duration-300"
                      style={{
                        borderLeft: `2px solid ${hexToRgba(accent, 0.35)}`,
                      }}
                    >
                      <label
                        className="flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors"
                        style={{
                          backgroundColor: theme.background,
                          border: `1px solid ${isBarista ? hexToRgba(accent, 0.4) : border}`,
                        }}
                      >
                        <span
                          className="text-sm font-medium flex items-center gap-2"
                          style={{ color: text }}
                        >
                          <span
                            className="w-6 h-6 rounded-full flex items-center justify-center text-xs"
                            style={{
                              backgroundColor: hexToRgba(accent, 0.12),
                              color: accent,
                            }}
                          >
                            ☕
                          </span>
                          Meet her at the barista
                        </span>
                        <input
                          type="checkbox"
                          checked={isBarista}
                          onChange={(e) => setIsBarista(e.target.checked)}
                          className="w-4 h-4 rounded cursor-pointer"
                          style={{ accentColor: primary }}
                        />
                      </label>
                      <p
                        className="text-xs mt-1.5 px-1"
                        style={{ color: textSecondary }}
                      >
                        Also include barista stops where your sister works
                      </p>
                    </div>
                  )}
                </div>

                {/* Action buttons */}
                <div className="mt-6 space-y-2">
                  <button
                    onClick={handleFindOptimalRoute}
                    disabled={selectedAgencies.length < 2 || loadingRoute}
                    className="cursor-pointer w-full px-4 py-3 rounded-xl text-white font-medium flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      background: `linear-gradient(135deg, ${primary}, ${accent})`,
                    }}
                  >
                    {loadingRoute ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Calculating...
                      </>
                    ) : (
                      <>
                        <Route className="w-4 h-4" />
                        Find Optimal Route
                      </>
                    )}
                  </button>
                </div>

                {/* Hint */}
                {selectedAgencies.length < 2 && (
                  <p
                    className="text-xs text-center mt-3"
                    style={{ color: textSecondary }}
                  >
                    Select at least 2 agencies to continue
                  </p>
                )}
              </div>

              {/* Route Result Card */}
              {routeError && (
                <div
                  className="rounded-2xl p-5 transition-colors duration-300"
                  style={{
                    backgroundColor: hexToRgba(theme.error, 0.08),
                    border: `1px solid ${hexToRgba(theme.error, 0.25)}`,
                  }}
                >
                  <p
                    className="text-sm font-medium"
                    style={{ color: theme.error }}
                  >
                    {routeError}
                  </p>
                </div>
              )}

              {optimalDestinations && optimalDestinations.length > 0 && (
                <div
                  className="rounded-2xl shadow-lg p-6 transition-colors duration-300"
                  style={{
                    backgroundColor: surface,
                    border: `1px solid ${border}`,
                  }}
                >
                  <h2
                    className="text-lg font-bold mb-4 flex items-center gap-2"
                    style={{ color: text }}
                  >
                    <Map className="w-5 h-5" style={{ color: accent }} />
                    Optimal Route
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-semibold"
                      style={{
                        backgroundColor: hexToRgba(accent, 0.12),
                        color: accent,
                      }}
                    >
                      {optimalDestinations.length} stops
                    </span>
                  </h2>

                  {/* Route list */}
                  <div className="space-y-0 max-h-[360px] overflow-y-auto pr-1">
                    {optimalDestinations.map((dest, idx) => {
                      const isFirst = idx === 0;
                      const isLast = idx === optimalDestinations.length - 1;

                      return (
                        <div key={`${dest.index}-${idx}`} className="relative">
                          <div className="flex items-start gap-3 py-2">
                            {/* Timeline dot */}
                            <div className="flex flex-col items-center flex-shrink-0">
                              <div
                                className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-white"
                                style={{
                                  backgroundColor: isFirst
                                    ? primary
                                    : isLast
                                      ? accent
                                      : hexToRgba(primary, 0.6),
                                }}
                              >
                                {idx + 1}
                              </div>
                              {!isLast && (
                                <div
                                  className="w-0.5 h-full min-h-[24px] my-1"
                                  style={{
                                    backgroundColor: hexToRgba(border, 1),
                                  }}
                                />
                              )}
                            </div>

                            {/* Destination info */}
                            <div className="flex-1 min-w-0 pb-2">
                              <p
                                className="font-medium text-sm"
                                style={{ color: text }}
                              >
                                {dest.locationName}
                              </p>
                              <p
                                className="text-xs mt-0.5"
                                style={{ color: textSecondary }}
                              >
                                {dest.city} · {dest.latitude.toFixed(4)},{" "}
                                {dest.longitude.toFixed(4)}
                              </p>
                              {dest.webSiteUrl && (
                                <a
                                  href={dest.webSiteUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs inline-flex items-center gap-1 mt-1 font-medium"
                                  style={{ color: primary }}
                                >
                                  Visit website
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              )}
                            </div>

                            {/* Badge */}
                            <div className="flex-shrink-0">
                              {isFirst && (
                                <span
                                  className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                                  style={{
                                    backgroundColor: hexToRgba(primary, 0.12),
                                    color: primary,
                                  }}
                                >
                                  START
                                </span>
                              )}
                              {isLast && (
                                <span
                                  className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                                  style={{
                                    backgroundColor: hexToRgba(accent, 0.12),
                                    color: accent,
                                  }}
                                >
                                  END
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Google Maps actions */}
                  <div
                    className="mt-5 pt-4 space-y-2"
                    style={{ borderTop: `1px solid ${border}` }}
                  >
                    <button
                      onClick={handleOpenGoogleMaps}
                      className="cursor-pointer w-full px-4 py-3 rounded-xl text-white font-medium flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-200"
                      style={{
                        background: `linear-gradient(135deg, ${primary}, ${accent})`,
                      }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      Open in Google Maps
                    </button>
                    <button
                      onClick={handleCopyLink}
                      className="cursor-pointer w-full px-4 py-2.5 rounded-xl border-2 font-medium flex items-center justify-center gap-2 transition-all duration-200 text-sm"
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
                      <Check className="w-4 h-4" />
                      Copy Google Maps Link
                    </button>
                  </div>
                </div>
              )}

              {/* Empty state for route */}
              {!optimalDestinations && !routeError && (
                <div
                  className="rounded-2xl p-6 text-center transition-colors duration-300"
                  style={{
                    backgroundColor: surface,
                    border: `1px dashed ${border}`,
                  }}
                >
                  <Map
                    className="w-12 h-12 mx-auto mb-3"
                    style={{ color: textSecondary }}
                  />
                  <p className="text-sm font-medium" style={{ color: text }}>
                    No route calculated yet
                  </p>
                  <p className="text-xs mt-1" style={{ color: textSecondary }}>
                    Configure your route and click "Find Optimal Route"
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const FindOptimalRoutePage = () => {
  return (
    <Suspense
      fallback={
        <CommonLoading message="Loading..." size="lg" fullScreen={false} />
      }
    >
      <FindOptimalRouteContent />
    </Suspense>
  );
};

export default FindOptimalRoutePage;
