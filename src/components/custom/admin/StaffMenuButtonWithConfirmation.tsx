import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { PropsWithChildren, ReactNode, useState } from "react";
import { StaffMenuButton, StaffMenuButtonProps } from "./StaffMenuButton";
import { Button } from "@/components/ui/button";
import { ConfirmationDialog } from "../dialog/ConfirmationDialog";

interface Props extends StaffMenuButtonProps {
  title: ReactNode;
  body: (newValue: string | null) => ReactNode;
}
export const StaffMenuButtonWithConfirmation: React.FC<Props> = ({
  value,
  onChange,
  staffs,
  title,
  body,
}) => {
  const [open, setOpen] = useState(false);
  const [newValue, setNewValue] = useState<StaffMenuButtonProps["value"]>(null);

  return (
    <ConfirmationDialog
      title={title}
      body={body(newValue)}
      onConfirm={async () => {
        await onChange(newValue);
      }}
      open={open}
      setOpen={setOpen}
    >
      <StaffMenuButton
        value={value}
        onChange={(value) => {
          setNewValue(value);
          setOpen(true);
        }}
        staffs={staffs}
      />
    </ConfirmationDialog>
  );
};
