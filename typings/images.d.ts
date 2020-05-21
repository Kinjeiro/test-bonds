//declare module '*.svg'
declare module '*.svg' {
  const content: string;
  //const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module '*.png'
declare module '*.jpg'
