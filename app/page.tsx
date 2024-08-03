import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-xl">Home</h1>
      <Link className="bg-green-400 px-3 py-1 rounded-md" href={"/blog"}>Blog page</Link>
    </main>
  );
}
