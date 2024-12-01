import { createFileRoute } from "@tanstack/react-router";

export const MyAccount: React.FC = () => {
  return "My Account";
};

export const Route = createFileRoute("/(dashboard)/_dashboard/my-account/")({
  component: MyAccount,
});
