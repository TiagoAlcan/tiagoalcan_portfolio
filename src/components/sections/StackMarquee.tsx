import { getTranslations } from "next-intl/server";

import { MarqueeItem } from "@/components/ui/marquee";
import { stackMarquee } from "@content/site";
import { StackTicker } from "./StackTicker";

/** Ticker of technologies. Pauses on hover and focus, and has its own pause button. */
export async function StackMarquee() {
  const t = await getTranslations("home");
  return (
    <div className="py-6">
      <StackTicker label={t("stackLabel")} pause={t("tickerPause")} play={t("tickerPlay")}>
        {stackMarquee.map((item) => (
          <MarqueeItem key={item} className="font-mono text-[0.9rem]" separator={<span aria-hidden="true" className="text-(--site-accent)">/</span>}>
            {item}
          </MarqueeItem>
        ))}
      </StackTicker>
    </div>
  );
}
