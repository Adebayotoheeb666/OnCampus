import Link from "next/link";
import { logoutResident } from "@/modules/auth/actions";

const links = [
  { href: "/resident/home", label: "Home" },
  { href: "/resident/dashboard", label: "Payments" },
  { href: "/resident/maintenance", label: "Maintenance" },
  { href: "/resident/laundry", label: "Laundry" },
  { href: "/resident/visitors", label: "Visitors" },
  { href: "/resident/wallet", label: "Wallet" },
  { href: "/resident/id", label: "My ID" },
];

export function ResidentNav({ active }: { active?: string }) {
  return (
    <nav className="mb-6 flex flex-wrap items-center gap-2 border-b border-stone-200 pb-4">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
            active === link.href ? "bg-emerald-700 text-white" : "text-stone-600 hover:bg-stone-100"
          }`}
        >
          {link.label}
        </Link>
      ))}
      <form action={logoutResident} className="ml-auto">
        <button type="submit" className="text-sm text-stone-500 hover:text-stone-800">
          Sign out
        </button>
      </form>
    </nav>
  );
}
