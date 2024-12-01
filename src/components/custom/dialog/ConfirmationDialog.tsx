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
import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: ReactNode;
  body: ReactNode;
  onConfirm: () => Promise<void> | void;
}
export const ConfirmationDialog: React.FC<PropsWithChildren<Props>> = ({
  open,
  setOpen,
  title,
  body,
  onConfirm,
  children,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogCloseTrigger />
        </DialogHeader>
        <DialogBody>{body}</DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogActionTrigger>
          <Button
            loading={isLoading}
            onClick={async () => {
              setIsLoading(true);
              await onConfirm();
              setOpen(false);
              setIsLoading(false);
            }}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};
