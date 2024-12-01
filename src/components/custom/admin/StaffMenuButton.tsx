import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import { Staff } from "@/firebase/database/types";
import { Button } from "@chakra-ui/react";
import React, { PropsWithChildren } from "react";

export interface StaffMenuButtonProps {
  value: string | null;
  onChange: (id: string | null) => void | Promise<void>;
  staffs: Staff[];
}

export const StaffMenuButton: React.FC<StaffMenuButtonProps> = ({
  value,
  onChange,
  staffs,
}) => {
  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button
          px="0.5rem"
          borderRadius={4}
          variant="ghost"
          {...(value
            ? {
                children: staffs.find((x) => x.id === value)?.name,
              }
            : { children: "Open", variant: "subtle" })}
        />
      </MenuTrigger>
      <MenuContent>
        {staffs.map((worker) => (
          <MenuItem
            key={worker.id}
            value={worker.id}
            onClick={() => onChange(worker.id)}
          >
            {worker.name}
          </MenuItem>
        ))}
        {value && (
          <MenuItem
            value="delete"
            color="fg.error"
            onClick={() => onChange(null)}
          >
            Delete
          </MenuItem>
        )}
      </MenuContent>
    </MenuRoot>
  );
};
