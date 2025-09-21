import Link from "next/link";
import { Container } from "../container";
import { UserMenu } from "../user-menu";

export function Header() {
  return (
    <header className="w-full bg-white shadow-md h-14 flex items-center">
      <Container>
        <div className="flex items-center justify-between">
          <Link href="/">
            <span className="text-xl font-bold">devmotors</span>
          </Link>
          <UserMenu />
        </div>
      </Container>
    </header>
  );
}
