/**
 * Site-wide image primitive.
 * Uses a plain <img> so brand SVG artwork and client JPG/PNG/WebP photos
 * behave identically. Handles lazy loading below the fold and hover zoom.
 */
export function SiteImage({
  src,
  alt,
  className = "",
  loading = "lazy",
  fetchPriority,
  sizes,
  style,
}: {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
  sizes?: string;
  style?: React.CSSProperties;
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      loading={loading}
      decoding="async"
      fetchPriority={fetchPriority}
      sizes={sizes}
      draggable={false}
    />
  );
}
