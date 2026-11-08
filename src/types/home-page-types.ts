export interface DashboardCardProps {
  card: {
    id: number | string;
    name: string;
    description?: string;
    iconUrl: string;
    color: string;
    linkTo: string;
    privilege: string;
  };
  index: number;
  onClick: () => void;
  theme: {
    surface: string;
    textSecondary: string;
  };
  isDarkMode: boolean;
}
