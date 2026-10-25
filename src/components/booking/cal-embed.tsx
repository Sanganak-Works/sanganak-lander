"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

// The public cal.com event every "book a conversation" entry point uses.
export const CAL_LINK = "samyak-sahu/intro";
const NAMESPACE = "intro";

export function CalEmbed() {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: NAMESPACE });
      cal("ui", { theme: "dark", hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  return (
    <Cal
      namespace={NAMESPACE}
      calLink={CAL_LINK}
      config={{ layout: "month_view", theme: "dark" }}
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
    />
  );
}
