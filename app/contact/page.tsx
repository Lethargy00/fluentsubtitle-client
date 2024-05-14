import style from "./page.module.css";

export default function Home() {
  return (
    <main className={style.container}>
      <h1>
        If you like what you see and want to get extra details on the project
        contact me on:
      </h1>
      <h2>
        <span>Github:</span>{" "}
        <a
          href="https://github.com/Lethargy00/"
          target="_blank"
          className="underline hover:text-gray-500"
        >
          Lethargy00
        </a>
      </h2>
      <h2>
        <span>Email:</span> fluentSubtitle@gmail.com (Fake)
      </h2>
      <h2>
        <span>Phone:</span> 073-215-548-25 (Fake)
      </h2>
      <h2>
        <span>Github-repository:</span>{" "}
        <a
          href="https://github.com/Lethargy00/fluentsubtitle-client"
          target="_blank"
          className="underline hover:text-gray-500"
        >
          fluentsubtitle-client
        </a>
      </h2>
    </main>
  );
}
