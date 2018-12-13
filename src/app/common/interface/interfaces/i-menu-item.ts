export interface IMenuItem {
  label: string;
  route: string | string[];
  children?: IMenuItem[];
}
