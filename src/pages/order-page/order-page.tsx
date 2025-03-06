import React, { FC } from 'react';
import { OrderInfo } from '@components';
import styles from './order-page.module.css';
import { useParams } from 'react-router-dom';
import clsx from 'clsx';

const OrderPage:FC = () => {
  const { number } = useParams();

  return (
    <div className={styles.container}>
      <h3 className={clsx('text_type_digits-default', styles.title)}>#{number}</h3>
      <OrderInfo />
    </div>
  );
};

export { OrderPage };
