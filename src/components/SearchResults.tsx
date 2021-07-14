import { useMemo, useCallback } from "react";
import { ProductItem } from "./ProductItem";

interface SearchResultsProps {
  results: Array<{ id: number; price: number; title: string }>;
  totalPrice: number;
}

export function SearchResults({ results, totalPrice }: SearchResultsProps) {
  //* Exemplo useMemo
  // const totalPrice = useMemo(() => {
  //   return results.reduce((acc, product) => {
  //     return acc + product.price;
  //   }, 0);
  // }, [results]);

  //* Exemplo useCallback
  // const handleClick = useCallback(async () => {
  //   console.log();
  // }, []);

  return (
    <div>
      <p>{totalPrice}</p>
      {results?.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
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
