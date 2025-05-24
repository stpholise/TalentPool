// src/declarations.d.ts
declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.svg' {
  import React from 'react';
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const url: string;
  export { ReactComponent };
  export default url;
}

declare module '*.jpg' {
  const value: string;
  export default value;
}

declare module '*.jpeg' {
  const value: string;
  export default value;
}