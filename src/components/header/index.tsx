import Link from "next/link";
import { Container } from "../container";
import { FaRegUserCircle } from "react-icons/fa";

export function Header() {
  return (
    <header className="w-full bg-white shadow-md h-14 flex items-center">
      <Container>
        <div className="flex items-center justify-between">
          <Link href="/">
            <span className="text-xl font-bold">devmotors</span>
          </Link>
          <div className="border-l border-gray-200 h-14 flex items-center pl-6">
            <Link
              href="/login"
              className="flex items-start gap-1 text-[13px] font-bold"
            >
              <FaRegUserCircle size={20} />
              Entrar
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
}
