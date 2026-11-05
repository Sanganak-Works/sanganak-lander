// The legal entity name must appear verbatim on every page (Meta Business
// Verification). Keep "Sanganak" as the brand everywhere else.
export const LEGAL_NAME = "Sanganak Works Private Limited";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      {/* One string, so the legal name is contiguous in the server HTML. */}
      <p>{`© ${new Date().getFullYear()} ${LEGAL_NAME}`}</p>
    </footer>
  );
}
