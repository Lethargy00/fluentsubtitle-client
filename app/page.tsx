import Link from "next/link";


export default function Home() {
  return (
    <main>
      <h1 className="text-3xl text-center">Welcome to FluentSubtitle the #1 site for downloading subtitles</h1>
      <Link href="./list" className="text-2xl text-center underline hover:text-gray-600">Movie List</Link>
    </main>
  );
}
