import styles from "@/components/editorial/editorial.module.css";

// Optional intro video for the /services booking section. Sam pastes a Loom
// share link here, e.g. "https://www.loom.com/share/<id>". Leave it empty to
// hide the video slot entirely; nothing renders on the site while it's "".
export const LOOM_URL = "";

const LOOM_ID = /^https:\/\/(?:www\.)?loom\.com\/(?:share|embed)\/([a-zA-Z0-9]+)/;

/** Turns a Loom share (or embed) URL into its embed URL, or null if it isn't one. */
export function toLoomEmbedUrl(url: string): string | null {
  const id = url.trim().match(LOOM_ID)?.[1];
  return id ? `https://www.loom.com/embed/${id}` : null;
}

export function LoomVideo({
  url = LOOM_URL,
  title = "A 60-second intro from Sam",
}: {
  url?: string;
  title?: string;
}) {
  const embedUrl = toLoomEmbedUrl(url);
  if (!embedUrl) return null;

  return (
    <div className={styles.loomFrame}>
      <iframe src={embedUrl} title={title} loading="lazy" allowFullScreen />
    </div>
  );
}
