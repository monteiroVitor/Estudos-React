import { memo, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import dynamic from "next/dynamic";

const ProductOptions = dynamic(() => {
  return import("./ProductOptions").then((mod) => mod.ProductOptions);
});

import styles from "../styles/components/ProductItem.module.scss";

interface ProductItemProps {
  product: {
    id: number;
    price: number;
    title: string;
  };
}

function ProductItemComponent({ product }: ProductItemProps) {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <article className={styles.container}>
      <div className={styles.itemContainer}>
        <p>
          <strong>{product.title}</strong>
          {product.price}
        </p>
        <button type="button" onClick={() => setShowOptions(!showOptions)}>
          {showOptions ? <AiOutlineMinus /> : <AiOutlinePlus />}
        </button>
      </div>
      {showOptions && <ProductOptions />}
    </article>
  );
}

export const ProductItem = memo(
  ProductItemComponent,
  (prevProps, nextProps) => {
    return Object.is(prevProps.product, nextProps.product);
  }
);

/**
 ** Quando usar o memo
 * 1. Pure Functional components
 * 2. Renders too often
 * 3. Re-render with same props
 * 4. Medium to big size
 ** Dynamic import (Code Splitting)
 * 1. Permite realizar import somente quando necessário, no meu exemplo o import ocorre somente quando o usuário
 * clica no botão para exibir as opções (linha 29-31).
 * 2. Ele aceita generics, então caso o meu componente tenha props e tipagem definida posso fazer
 * dynamic<MinhaTipagem> e sucesso.
 * 3. Como esse import será feito de forma dinâmica o código será solicitado ao servidor, o que pode demorar um pouco.
 * Para solucionar esse problema, passo um objeto como atributo "loading" segundo parâmetro da função dynamic.
 * Ex:
 *  {
 *    loading: () =><span>Loading...</span>
 *  }
 * Link explicando um pouco melhor (só um pouco): https://pt-br.reactjs.org/docs/code-splitting.html
 */
