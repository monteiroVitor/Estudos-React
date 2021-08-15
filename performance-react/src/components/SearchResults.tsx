import { useCallback } from "react";
import { List } from "react-virtualized";
import { ProductItem } from "./ProductItem";

interface SearchResultsProps {
  results: Array<{ id: number; price: number; title: string }>;
}

export function SearchResults({ results }: SearchResultsProps) {
  //* Exemplo useMemo
  // const totalPrice = useMemo(() => {
  //   return results.reduce((acc, product) => {
  //     return acc + product.price;
  //   }, 0);
  // }, [results]);

  //* Exemplo useCallback
  const handleClick = useCallback(async (id: number) => {
    console.log(id);
  }, []);

  function rowRenderer({ key, index, style }) {
    return (
      <div key={key} style={style}>
        <ProductItem
          product={results[index]}
          handleClick={() => handleClick(results[index].id)}
        />
      </div>
    );
  }

  return (
    <>
      <List
        height={400}
        rowHeight={100}
        rowCount={results.length}
        rowRenderer={rowRenderer}
        overscanRowCount={4}
        width={496}
      />
    </>
  );
}

/**
 ** useMedo, quando usar ?
 * 1. Cálculos pesados
 * 2. Igualdade referencial: ao passar uma informação a um componente filho a comparação é rasa, a cada renderização novo espaço de memoria
 * é alocado para armazenar o dado
 ** useCallback, quando usar ?
 * 1. Não gerar re-render desnecessários em componentes que recebem a função como props
 * Obs: O tamanho/complexidade da função não gera um custo grande no re-render como eu pensava, então não preciso usar useCallback na tentativa
 * de tornar o render mais rápido.
 ** Porque removi o userMedo
 * É melhor formatar e calcular esses após o termino do fetch, pq tenho certeza que ele ocorre uma única vez e não força um re-render.
 */
