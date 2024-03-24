import Swal, { SweetAlertIcon } from "sweetalert2";

interface ToastProps {
  position?: "top" | "top-start" | "top-end" | "center" | "center-start" | "center-end" | "bottom" | "bottom-start" | "bottom-end";
  confirmButton?: boolean;
  timer?: number;
  timerProgressBar?: boolean;
  icon?: SweetAlertIcon;
  title: string;
}

export function Toast({
  position = "top-end",
  confirmButton = false,
  timer = 3000,
  timerProgressBar = true,
  icon,
  title,
}: ToastProps) {
  const Toast = Swal.mixin({
    toast: true,
    position,
    showConfirmButton: confirmButton,
    timer,
    timerProgressBar,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  return Toast.fire({
    icon,
    title,
  });
}
