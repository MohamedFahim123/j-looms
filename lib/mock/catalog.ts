export interface ActionCatalogItem {
  id: number;
  name: string;
  action: string;
  icon: string;
}

export interface ActivityCatalogItem {
  id: number;
  name: string;
  icons: string;
}

export const ACTION_CATALOG: ActionCatalogItem[] = [
  { id: 1, name: "Attendance", action: "Attendance", icon: "" },
  { id: 2, name: "Homework", action: "Homework", icon: "" },
  { id: 3, name: "Behavior Note", action: "Behavior Note", icon: "" },
  { id: 4, name: "Reading Log", action: "Reading Log", icon: "" },
  { id: 5, name: "Quiz", action: "Quiz", icon: "" },
  { id: 6, name: "Participation", action: "Participation", icon: "" },
];

export const ACTIVITY_CATALOG: ActivityCatalogItem[] = [
  { id: 1, name: "Art", icons: "" },
  { id: 2, name: "Sports", icons: "" },
  { id: 3, name: "Music", icons: "" },
  { id: 4, name: "Science Lab", icons: "" },
  { id: 5, name: "Library", icons: "" },
  { id: 6, name: "Field Trip", icons: "" },
];
