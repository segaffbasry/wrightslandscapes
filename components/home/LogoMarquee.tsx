import clients from "@/content/clients.json";

/*
 * Client logos, cut from the live site's logo sheet into transparent single-colour
 * masks so they take the palette. Two rows drift in opposite directions.
 * Each logo is sized to a similar visual area rather than a fixed height.
 */
const AREA = 5200;

function Logo({ c, hidden }: { c: (typeof clients)[number]; hidden?: boolean }) {
  const h = Math.min(64, Math.round(Math.sqrt((AREA * c.h) / c.w)));
  const w = Math.round((h * c.w) / c.h);
  return (
    <span
      role={hidden ? undefined : "img"}
      aria-label={hidden ? undefined : c.name}
      aria-hidden={hidden || undefined}
      className="mx-8 block shrink-0 bg-forest lg:mx-12"
      style={{
        width: w,
        height: h,
        WebkitMask: `url(${c.src}) center / contain no-repeat`,
        mask: `url(${c.src}) center / contain no-repeat`,
      }}
    />
  );
}

export default function LogoMarquee() {
  const half = Math.ceil(clients.length / 2);
  const rows = [clients.slice(0, half), clients.slice(half)];
  return (
    <div className="marquee-wrap space-y-10 overflow-hidden py-4 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      {rows.map((row, r) => (
        <div key={r} className="marquee items-center" data-reverse={r === 1 ? "" : undefined} style={{ ["--marquee-speed" as string]: "45s" }}>
          {[...row, ...row].map((c, i) => (
            <Logo key={i} c={c} hidden={i >= row.length} />
          ))}
        </div>
      ))}
    </div>
  );
}
