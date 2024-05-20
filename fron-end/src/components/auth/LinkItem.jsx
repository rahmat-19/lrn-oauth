import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LinkItem() {
  const pathname = usePathname();
  return (
    <li className="block p-1 font-sans text-sm antialiased font-normal leading-normal dark:text-slate-100 text-blue-900">
      <Link
        href="/about"
        className={`flex items-center ${
          pathname == "/about" ? "underline" : ""
        }`}
      >
        About
      </Link>
    </li>
  );
}
