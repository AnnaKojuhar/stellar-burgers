import React, { FC } from 'react';
import styles from './ingredient-page.module.css';
import { IngredientDetails } from '@components';
import clsx from 'clsx';

const IngredientPage: FC = () => (
  <div className={styles.container}>
    <h3 className={clsx('text_type_main-large', styles.title)}>
      Детали ингредиента
    </h3>
    <IngredientDetails />
  </div>
);

export { IngredientPage };
