import Head from "next/head";
import { useState, FormEvent } from "react";
import { SearchResults } from "../components/SearchResults";

type Results = {
  products: Array<{ id: number; price: number; title: string }>;
  totalPrice: number;
};

export default function Home() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Results>({
    products: [],
    totalPrice: 0,
  });

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!search.trim()) return;

    const response = await fetch(`http://localhost:3333/products?q=${search}`);
    const data = await response.json();

    //*Formatando preço
    // const formatter = new Intl.NumberFormat("pt-BR", {
    //   style: "currency",
    //   currency: "pt-BR",
    // });
    // formatter.format(product.price)

    const totalPrice = data?.reduce((acc, product) => {
      return acc + product.price;
    }, 0);

    setResults({ totalPrice, products: data });
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
          <SearchResults
            results={results.products}
            totalPrice={results.totalPrice}
          />
        </div>
      </main>
    </div>
  );
}

/**
 ** Momentos que uma nova renderização ocorre
 * 1. Propriedade foi modificada
 * 2. Componente "Pai" foi modificado
 * 3. States foram modificados
 * Obs: "Pai" for modificado ? se sim, todos os filhos serão renderizados novamente)
 ** Nova Renderização
 * 1. Cria uma nova versão do componente
 * 2. Comparar com a versão anterior
 * 3. Se houverem alterações, vai atualizar o que alterou
 ** Links interessantes:
 * 1. https://pt-br.reactjs.org/docs/reconciliation.html
 * 2. https://pt-br.reactjs.org/docs/rendering-elements.html (sempre bom revisar)
 */
