"use client";
import React from "react";
import {
  LayoutDashboard,
  MapPin,
  Package,
  Activity,
  Compass,
  Ticket,
  Hotel,
  Star,
  Search,
  Filter,
  Calendar,
  Clock,
  Layers,
  Tag,
  Sun,
  Mountain,
  Ship,
  Car,
  Plane,
  Coffee,
  Utensils,
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { EmptyStateProps, EntityType } from "@/types/common-components-types";

const ENTITY_CONFIG: Record<
  EntityType,
  { icon: React.ElementType; label: string }
> = {
  destination: { icon: MapPin, label: "destinations" },
  tour: { icon: Compass, label: "tours" },
  package: { icon: Package, label: "packages" },
  activity: { icon: Activity, label: "activities" },
  category: { icon: LayoutDashboard, label: "categories" },
  hotel: { icon: Hotel, label: "hotels" },
  review: { icon: Star, label: "reviews" },
  ticket: { icon: Ticket, label: "tickets" },
  generic: { icon: LayoutDashboard, label: "items" },
  destinationCategory: { icon: Layers, label: "destination categories" },
  activityCategory: { icon: Tag, label: "activity categories" },
  tourCategory: { icon: Tag, label: "tour categories" },
  tourType: { icon: Layers, label: "tour types" },
  packageType: { icon: Layers, label: "package types" },
  activitySchedule: { icon: Clock, label: "activity schedules" },
  tourSchedule: { icon: Calendar, label: "tour schedules" },
  packageSchedule: { icon: Calendar, label: "package schedules" },
  season: { icon: Sun, label: "seasons" },
  mountain: { icon: Mountain, label: "mountains" },
  cruise: { icon: Ship, label: "cruises" },
  transport: { icon: Car, label: "transportation" },
  flight: { icon: Plane, label: "flights" },
  restaurant: { icon: Utensils, label: "restaurants" },
  cafe: { icon: Coffee, label: "cafes" },
};

export const EmptyState: React.FC<EmptyStateProps> = ({
  entityType = "generic",
  title,
  description,
  actionLabel = "Clear Filters",
  onClearFilters,
  hideAction = false,
  isFiltered = true,
}) => {
  const { theme } = useTheme();

  const config = ENTITY_CONFIG[entityType];
  const IconComponent = isFiltered ? Filter : config.icon;
  const SearchIcon = isFiltered ? Search : null;

  const defaultTitle = title ?? `No ${config.label} found`;
  const defaultDescription =
    description ??
    (isFiltered
      ? `Try adjusting your search filters or explore different ${config.label}`
      : `No ${config.label} are available at the moment`);

  return (
    <div
      className="rounded-xl shadow-sm border p-16 text-center transition-colors duration-300"
      style={{
        backgroundColor: theme.surface,
        borderColor: theme.border,
      }}
    >
      <div
        className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center relative"
        style={{
          background: `linear-gradient(135deg, ${theme.primary}15, ${theme.accent}15)`,
        }}
      >
        <IconComponent
          className="w-12 h-12"
          style={{ color: theme.textSecondary }}
        />
        {SearchIcon && (
          <div
            className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center shadow-sm"
            style={{
              background: `linear-gradient(135deg, ${theme.primary}, ${theme.accent})`,
            }}
          >
            <SearchIcon className="w-3.5 h-3.5 text-white" />
          </div>
        )}
      </div>

      <div
        className="text-2xl font-semibold mb-2"
        style={{ color: theme.text }}
      >
        {defaultTitle}
      </div>

      <p
        className="mb-6 max-w-sm mx-auto"
        style={{ color: theme.textSecondary }}
      >
        {defaultDescription}
      </p>

      {!hideAction && onClearFilters && (
        <button
          onClick={onClearFilters}
          className="px-6 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg hover:opacity-90"
          style={{
            background: `linear-gradient(135deg, ${theme.primary}, ${theme.accent})`,
            color: "#fff",
          }}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};
