import ingredientsSlice, {
  getIngredientsThunk,
  initialState,
  TIngredientsState
} from '../services/slices/ingredientsSlice';

describe('тестирование ingredientsSlice', () => {
  describe('тестирование getIngredientsThunk', () => {
    it('getIngredientsThunk.pending', () => {
      const updatedState = ingredientsSlice(initialState, {
        type: getIngredientsThunk.pending.type,
        payload: null
      });
      expect(updatedState.loading).toEqual(true);
      expect(updatedState.error).toEqual(null);
    });

    it('getIngredientsThunk.fulfilled', () => {
      const dataFromServer = [
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
          _id: '643d69a5c3f7b9001cfa093e',
          name: 'Филе Люминесцентного тетраодонтимформа',
          type: 'main',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/meat-03.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/meat-03-large.png',
          __v: 0
        }
      ];

      const updatedState = ingredientsSlice(initialState, {
        type: getIngredientsThunk.fulfilled.type,
        payload: dataFromServer
      });

      expect(updatedState.ingredients).toEqual(dataFromServer);
      expect(updatedState.loading).toEqual(false);
      expect(updatedState.error).toEqual(null);
    });

    it('getIngredientsThunk.rejected', () => {
      const updatedState = ingredientsSlice(initialState, {
        type: getIngredientsThunk.rejected.type,
        error: { message: 'error' }
      });
      expect(updatedState.ingredients).toEqual([]);
      expect(updatedState.loading).toEqual(false);
      expect(updatedState.error).toEqual('error');
    });
  });
});
