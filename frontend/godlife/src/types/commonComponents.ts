export interface CommonSnackbarType {
  open: boolean;
  message: string;
  severity: "error" | "info" | "success" | "warning";
}

export interface CommonDialogType {
  open: boolean;
  title: string;
  content: string;
}
