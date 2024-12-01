import { Flex, Box } from "@chakra-ui/react";
import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";
import { useContext, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { Topbar } from "./-components/Topbar";
import { Navbar } from "./-components/Navbar";

export const Dashboard: React.FC = () => {
  const { user } = useContext(AuthContext);

  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(false);

  if (!user) return <Navigate to="/login" />;

  return (
    <Flex flexDir="column" h="100dvh">
      <Topbar
        minH="4rem"
        px="1.5rem"
        py="0.5rem"
        isNavbarCollapsed={isNavbarCollapsed}
        onIsNavbarCollapsedChange={() => setIsNavbarCollapsed((x) => !x)}
      />
      <Flex flex="1" overflowY="auto">
        <Navbar
          position="sticky"
          top={0}
          w="fit-content"
          isNavbarCollapsed={isNavbarCollapsed}
        />
        <Box flex="1">
          <Box minH="full" px="1.25rem" py="0.75rem">
            <Outlet />
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};

export const Route = createFileRoute("/(dashboard)/_dashboard")({
  component: Dashboard,
});
