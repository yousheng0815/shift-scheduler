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
import React, {
  PropsWithChildren,
  ReactNode,
  useContext,
  useState,
} from "react";
import { Button } from "@/components/ui/button";
import { ConfirmationDialog } from "../dialog/ConfirmationDialog";
import { Shift, Staff } from "@/firebase/database/types";
import { UserContext } from "@/contexts/AuthContext";

interface Props {
  onConfirm: () => Promise<void> | void;
  title: string;
  body: string;
}
export const StaffShiftButton: React.FC<PropsWithChildren<Props>> = ({
  onConfirm,
  children,
  title,
  body,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <ConfirmationDialog
      onConfirm={async () => {
        await onConfirm();
      }}
      open={open}
      setOpen={setOpen}
      title={title}
      body={body}
    >
      {children}
    </ConfirmationDialog>
  );
};
