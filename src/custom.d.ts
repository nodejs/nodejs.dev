declare module '*.svg' {
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const svgUrl: string;
  export default svgUrl;
}

declare module '*.png';
declare module '*.jpg';

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}
