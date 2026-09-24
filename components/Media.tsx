import Image from "next/image";
import { imgSize, type Img } from "@/lib/content";

/*
 * Image with the clip-open reveal and ~10% parallax (see ScrollEffects).
 * The parallax layer is 12% taller than the frame so it never shows an edge.
 * Pass `ratio` to force a frame shape, otherwise the photo's own ratio is used.
 */
export default function Media({
  img,
  ratio,
  className = "",
  sizes = "100vw",
  priority,
}: {
  img: Img;
  ratio?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const [w, h] = imgSize(img.src);
  return (
    <div data-media className={`relative overflow-hidden bg-forest ${className}`} style={{ aspectRatio: ratio ?? `${w} / ${h}` }}>
      <div data-parallax className="absolute inset-x-0 -top-[6%] -bottom-[6%]">
        <Image src={img.src} alt={img.alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    </div>
  );
}
