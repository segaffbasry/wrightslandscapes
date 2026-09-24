import Media from "./Media";
import type { Img } from "@/lib/content";

/* The live site's three-column photo gallery, each frame with its own clip reveal and parallax. */
export default function Gallery({ images }: { images: Img[] }) {
  const cols: Img[][] = [[], [], []];
  images.forEach((img, i) => cols[i % 3].push(img));
  return (
    <div className="grid gap-4 md:grid-cols-3 lg:gap-6">
      {cols.map((col, c) => (
        <div key={c} className={`flex flex-col gap-4 lg:gap-6 ${c === 1 ? "md:pt-24" : ""}`}>
          {col.map((img) => (
            <Media key={img.src} img={img} sizes="(min-width: 768px) 33vw, 100vw" className="rounded-[4px]" />
          ))}
        </div>
      ))}
    </div>
  );
}
