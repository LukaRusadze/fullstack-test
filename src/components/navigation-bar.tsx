import Link from "next/link";
import { getServerPathname } from "~/lib/server-utils";

const NAVIGATION_LINKS: Readonly<
  (React.ComponentProps<typeof Link> & { label: string })[]
> = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function NavigationBar() {
  const pathname = getServerPathname();

  return (
    <nav className="flex sticky top-[72px] w-full items-start gap-8 text-lg font-normal px-[5%] z-10 py-4 bg-white">
      {NAVIGATION_LINKS.map((link) => (
        <Link
          {...link}
          className={
            link.href === pathname
              ? "opacity-100"
              : "opacity-50 hover:opacity-100 transition-opacity"
          }
          href={link.href}
          key={link.label}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
