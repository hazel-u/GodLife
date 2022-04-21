export interface CommonSnackbarType {
  open: boolean;
  message: string;
  severity: "error" | "info" | "success" | "warning";
}
