import Image from "next/image";
import logo from "@/public/logo.png";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <Image 
        src={logo}
        alt="Logo"
        width={48}
        height={48}
        className="rounded-full"
      />
    </Link>
  )
}
