import { memo } from "react";

import styles from "../styles/components/ProductItem.module.scss";

interface ProductItemProps {
  product: {
    id: number;
    price: number;
    title: string;
  };
}

function ProductItemComponent({ product }: ProductItemProps) {
  return (
    <article className={styles.container}>
      <div className={styles.itemContainer}>
        <p>
          <strong>{product.title}</strong>
          {product.price}
        </p>
        <button type="button">opções</button>
      </div>
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
 */
