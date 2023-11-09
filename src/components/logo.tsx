import localFont from "next/font/local";
import { cn } from "~/lib/utils";

const montserrat = localFont({
  src: "../../public/fonts/MontserratAlt1-Regular.woff2",
});

export function Logo() {
  return (
    <p
      className={cn(
        montserrat.className,
        "uppercase text-3xl tracking-[16px] select-none",
      )}
    >
      artitems
    </p>
  );
}
