import styles from "../styles/components/ProductOptions.module.scss";

export interface ProductOptionsProps {
  handleClick: () => void;
}

export function ProductOptions({ handleClick }: ProductOptionsProps) {
  return (
    <div className={styles.optionsContainer}>
      <p>Favoritar ?</p>
      <button type="button" onClick={handleClick}>
        Sim
      </button>
      <button type="button" disabled>
        Não
      </button>
    </div>
  );
}
