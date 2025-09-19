// Används då en bild saknas i API:t

import React from "react";
import safeImage from '../assets/safe_image.webp';

type Props = {
  src: string;
  alt: string;
  className?: string;
};

export const SafeImage: React.FC<Props> = ({ src, alt, className }) => {
  const [imgSrc, setImgSrc] = React.useState(src);

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={() => setImgSrc(safeImage)} // fallback till importerad bild
    />
  );
};
