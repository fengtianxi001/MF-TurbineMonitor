export interface panelTitleType {
  sequence?: number | string;
  en?: string;
  cn: string;
}

export interface messageListType {
  label: number | string;
  value: number | string;
  type?: "primary" | "danger" | "warning";
}
