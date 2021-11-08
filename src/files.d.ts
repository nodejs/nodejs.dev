declare module '*.svg' {
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const svgUrl: string;
  export default svgUrl;
}

declare module '*.png';
declare module '*.jpg';
