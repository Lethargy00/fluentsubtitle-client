import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1 className="text-3xl text-center">
        Welcome to FluentSubtitle the #1 site for downloading subtitles
      </h1>
      <div className="flex gap-5 mt-10">
        <Link
          href="./list"
          className="text-2xl text-center underline border-zinc-700 border-8 rounded-md bg-zinc-700 bd hover:text-gray-600"
        >
          Movie List
        </Link>
        <Link
          href="./contact"
          className="text-2xl text-center underline  border-zinc-700 border-8 rounded-md bg-zinc-700 hover:text-gray-600"
        >
          Contact information
        </Link>
      </div>
    </>
  );
}
