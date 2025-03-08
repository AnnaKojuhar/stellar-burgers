import constructorSlice, {
  addIngredient,
  initialState,
  moveIngredientUp,
  orderBurgerThunk,
  removeIngredient,
  TConstructorState
} from '../services/slices/constructorSlice';
import { TConstructorIngredient, TIngredient } from '@utils-types';

describe('тестирование constructorSlice', () => {
  const bun: TIngredient = {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  };

  const ingredient1: TConstructorIngredient = {
    id: '643d69a5c3f7b9001cfa0941',
    _id: '643d69a5c3f7b9001cfa093e',
    name: 'Филе Люминесцентного тетраодонтимформа',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
  };

  const ingredient2: TConstructorIngredient = {
    id: '643d69a5c3f7b9001cfa0941',
    _id: '643d69a5c3f7b9001cfa0942',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
  };

  const ingredient3: TConstructorIngredient = {
    id: '643d69a5c3f7b9001cfa093e',
    _id: '643d69a5c3f7b9001cfa0943',
    name: 'Соус фирменный Space Sauce',
    type: 'sauce',
    proteins: 50,
    fat: 22,
    carbohydrates: 11,
    calories: 14,
    price: 80,
    image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png'
  };

  const orderInfo = {
    ingredients: [
      {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large:
          'https://code.s3.yandex.net/react/code/meat-01-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        __v: 0
      }
    ],
    _id: '67c9cb29133acd001be55d1e',
    owner: {
      name: 'test111@gmail.com',
      email: 'test222@gmail.com',
      createdAt: '2025-03-06T16:19:01.668Z',
      updatedAt: '2025-03-06T16:19:01.668Z'
    },
    status: 'done',
    name: 'Краторный био-марсианский бургер',
    createdAt: '2025-03-06T16:19:53.447Z',
    updatedAt: '2025-03-06T16:19:54.180Z',
    number: 70189,
    price: 2934
  };

  it('добавление ингредиента', () => {
    const updatedState = constructorSlice(initialState, addIngredient(bun));

    expect(updatedState.constructorItems.bun).toEqual({
      ...bun,
      id: expect.any(String)
    });
  });

  it('удаление ингредиента', () => {
    initialState.constructorItems.ingredients.push(ingredient1);

    const updatedState = constructorSlice(
      initialState,
      removeIngredient(ingredient1.id)
    );

    expect(updatedState.constructorItems.ingredients.length).toEqual(0);
  });

  it('изменение порядка ингредиентов в начинке', () => {
    initialState.constructorItems.ingredients.push(
      ingredient1,
      ingredient2,
      ingredient3
    );

    const updatedState = constructorSlice(initialState, moveIngredientUp(1));

    expect(updatedState.constructorItems.ingredients).toEqual([
      ingredient2,
      ingredient1,
      ingredient3
    ]);
  });


  describe('тестирование extraReducers constructorSlice', () => {
    it('orderBurgerThunk.pending', () => {
      const updatedState = constructorSlice(initialState, {
        type: orderBurgerThunk.pending.type,
        payload: null
      });
      expect(updatedState.orderRequest).toEqual(true);
      expect(updatedState.error).toEqual(null);
    });

    it('orderBurgerThunk.rejected', () => {
      const updatedState = constructorSlice(initialState, {
        type: orderBurgerThunk.rejected.type,
        error: { message: 'error' }
      });
      expect(updatedState.orderRequest).toEqual(false);
      expect(updatedState.error).toEqual('error');
    });

    it('orderBurgerThunk.fulfilled', () => {
      initialState.constructorItems.ingredients.push(ingredient2);

      initialState.constructorItems.bun = {
        id: '643d69a5c3f7b9001cfa093b',
        ...bun
      };

      const updatedState = constructorSlice(initialState, {
        type: orderBurgerThunk.fulfilled.type,
        payload: {
          success: true,
          name: 'Краторный био-марсианский бургер',
          order: orderInfo
        }
      });
      expect(updatedState.orderRequest).toEqual(false);
      expect(updatedState.constructorItems.bun).toEqual(null);
      expect(updatedState.constructorItems.ingredients).toEqual([]);
      expect(updatedState.orderModalData).toEqual(orderInfo);
    });
  });

});
