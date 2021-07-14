import Head from "next/head";
import { useState, FormEvent } from "react";
import { SearchResults } from "../components/SearchResults";

export default function Home() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!search.trim()) return;

    const response = await fetch(`http://localhost:3333/products?q=${search}`);
    const data = await response.json();

    setResults(data);
  }

  return (
    <div>
      <Head>
        <title>Performando no ReactJS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Search</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">Buscar</button>
        </form>

        <div>
          <SearchResults results={results} />
        </div>
      </main>
    </div>
  );
}
