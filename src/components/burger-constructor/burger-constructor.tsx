import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import {
  clearModalData,
  orderBurgerThunk
} from '../../services/slices/constructorSlice';

export const BurgerConstructor: FC = () => {
  const { constructorItems, orderRequest, orderModalData } = useSelector(
    (state) => state.constructorItems
  );
  const { isAuth } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!isAuth) {
      navigate('/login', { replace: true });
      return;
    }

    const ids = constructorItems.ingredients.map((el) => el._id);
    ids.push(constructorItems.bun._id);
    ids.unshift(constructorItems.bun._id);

    dispatch(orderBurgerThunk(ids));
  };
  const closeOrderModal = () => {
    dispatch(clearModalData());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  // return null;

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
