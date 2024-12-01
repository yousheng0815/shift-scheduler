import { createFileRoute, Navigate } from "@tanstack/react-router";

export const DashboardIndex: React.FC = () => {
  return <Navigate to="/" />;
};

export const Route = createFileRoute("/(dashboard)/_dashboard/")({
  component: DashboardIndex,
});
