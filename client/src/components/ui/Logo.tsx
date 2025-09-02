import React from 'react';

type LogoProps = {
  width?: number | string;
  className?: string;
  alt?: string;
};

export default function Logo({ width = 32, className, alt = 'Logo' }: LogoProps) {
  const style = typeof width === 'number' ? { width: `${width}px` } : { width };

  return (
    <img
      src="/logo.svg"
      alt={alt}
      style={style}
      className={className}
      loading="lazy"
    />
  );
}




