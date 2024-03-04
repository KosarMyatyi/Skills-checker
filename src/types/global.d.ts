declare module "*.scss" {
  interface IClassNames {
    [className: string]: string;
  }
  const cls: IClassNames;
  export = cls;
}