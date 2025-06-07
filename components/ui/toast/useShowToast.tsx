import { useCallback } from "react";
import { Toast, ToastDescription, ToastTitle, useToast } from "./index";

export function useShowToast() {
  const toast = useToast();

  const showToast = useCallback(
    (
      message: string,
      type: "success" | "error" | "info" = "info",
      title?: string
    ) => {
      toast.show({
        render: () => (
          <Toast action={type}>
            {title && <ToastTitle>{title}</ToastTitle>}
            <ToastDescription>{message}</ToastDescription>
          </Toast>
        ),
      });
    },
    [toast]
  );

  return showToast;
}
