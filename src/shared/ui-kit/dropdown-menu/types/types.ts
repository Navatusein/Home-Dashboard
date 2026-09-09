export type DropdownItem = {
  key: string;
  label: string;
  icon?: string;
  disabled?: boolean;
  selected?: boolean;
  onItemSelect?: (item: DropdownItem, event: Event) => void;
}