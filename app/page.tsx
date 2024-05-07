import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1 className="title">
        Welcome to FluentSubtitle the #1 site for downloading subtitles
      </h1>
      <div className="buttonContainer">
        <Link href="./list" className="button">
          Movie List
        </Link>
        <Link href="./contact" className="button">
          Contact information
        </Link>
      </div>
    </>
  );
}
