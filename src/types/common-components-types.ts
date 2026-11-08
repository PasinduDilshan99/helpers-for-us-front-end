export interface PaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  showResultsCount?: boolean;
  showFirstLastButtons?: boolean;
  showProgressBar?: boolean;
  maxVisiblePages?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "minimal" | "compact";
}

export interface ImageModalImage {
  url: string;
  name?: string;
  description?: string;
  id?: string | number;
}

export interface ImageModalProps {
  isOpen: boolean;
  images: ImageModalImage[];
  initialIndex?: number;
  onClose: () => void;
  showNavigation?: boolean;
  showDownload?: boolean;
  showZoom?: boolean;
  allowKeyboardNavigation?: boolean;
}

export type EntityType =
  | "destination"
  | "destinationCategory"
  | "activity"
  | "activityCategory"
  | "tour"
  | "tourType"
  | "tourCategory"
  | "package"
  | "packageType"
  | "activitySchedule"
  | "tourSchedule"
  | "packageSchedule"
  | "season"
  | "category"
  | "hotel"
  | "review"
  | "ticket"
  | "generic"
  | "mountain"
  | "cruise"
  | "transport"
  | "flight"
  | "restaurant"
  | "cafe";

export interface EmptyStateProps {
  entityType?: EntityType;
  title?: string;
  description?: string;
  actionLabel?: string;
  onClearFilters?: () => void;
  hideAction?: boolean;
  isFiltered?: boolean;
}

export type NavigationDirection = "left" | "right";

export interface NavigationButtonProps {
  direction: NavigationDirection;
  onClick: (e: React.MouseEvent) => void;
  className?: string;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  ariaLabel?: string;
}

export type ErrorVariant = "error" | "warning" | "info" | "not-found";

export interface CommonErrorStateProps {
  error?: string | null;
  title?: string;
  message?: string;
  variant?: ErrorVariant;
  showIcon?: boolean;
  showBackButton?: boolean;
  showRetryButton?: boolean;
  showHomeButton?: boolean;
  onBack?: () => void;
  onRetry?: () => void;
  onHome?: () => void;
  backButtonText?: string;
  retryButtonText?: string;
  homeButtonText?: string;
  fullScreen?: boolean;
  className?: string;
}

export interface ToastState {
  show: boolean;
  type: ToastType;
  title: string;
  message: string;
  destinationId?: number;
}

export type ToastType = "success" | "error";

export interface ToastNotificationProps {
  type: ToastType;
  title: string;
  message: string;
  duration?: number;
  onClose: () => void;
  actionLink?: string;
  actionText?: string;
}

export interface ResultsHeaderProps {
  title: string;
  currentStart: number;
  currentEnd: number;
  totalItems: number;
  viewMode: "grid" | "list";
  onViewModeChange: (mode: "grid" | "list") => void;
}
