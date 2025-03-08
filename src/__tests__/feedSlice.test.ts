import feedSlice, {
  getFeedsThunk,
  getOrderByNumberThunk,
  IFeedState,
  initialState
} from '../services/slices/feedSlice';

describe('тестирование feedSlice', () => {
  const ordersResponse = {
    orders: [
      {
        _id: '67c9e584133acd001be55d8b',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa0940'
        ],
        status: 'done',
        name: 'Флюоресцентный био-марсианский метеоритный бургер',
        createdAt: '2025-03-06T18:12:20.643Z',
        updatedAt: '2025-03-06T18:12:21.324Z',
        number: 70205
      },
      {
        _id: '67c9e53a133acd001be55d89',
        ingredients: [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa0941'
        ],
        status: 'done',
        name: 'Краторный био-марсианский люминесцентный бургер',
        createdAt: '2025-03-06T18:11:06.639Z',
        updatedAt: '2025-03-06T18:11:07.299Z',
        number: 70204
      }
    ],
    total: 100,
    totalToday: 15
  };

  const orderByNumberResponse = {
    orders: [
      {
        _id: '67c9e584133acd001be55d8b',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa0940'
        ],
        status: 'done',
        name: 'Флюоресцентный био-марсианский метеоритный бургер',
        createdAt: '2025-03-06T18:12:20.643Z',
        updatedAt: '2025-03-06T18:12:21.324Z',
        number: 70205
      }
    ]
  };
  describe('тестирование getFeedsThunk', () => {
    it('getFeedsThunk.pending', () => {
      const updatedState = feedSlice(initialState, {
        type: getFeedsThunk.pending.type,
        payload: null
      });

      expect(updatedState.loading).toEqual(true);
      expect(updatedState.error).toEqual(null);
    });

    it('getFeedsThunk.fulfilled', () => {
      const updatedState = feedSlice(initialState, {
        type: getFeedsThunk.fulfilled.type,
        payload: ordersResponse
      });
      expect(updatedState.loading).toEqual(false);
      expect(updatedState.error).toEqual(null);
      expect(updatedState.orders).toEqual(ordersResponse.orders);
      expect(updatedState.total).toEqual(ordersResponse.total);
      expect(updatedState.totalToday).toEqual(ordersResponse.totalToday);
    });

    it('getFeedsThunk.rejected', () => {
      const updatedState = feedSlice(initialState, {
        type: getFeedsThunk.rejected.type,
        error: {
          message: 'error'
        }
      });
      expect(updatedState.loading).toEqual(false);
      expect(updatedState.error).toEqual('error');
      expect(updatedState.orders).toEqual([]);
      expect(updatedState.total).toEqual(0);
      expect(updatedState.totalToday).toEqual(0);
    });
  });

  describe('тестирование getOrderByNumberThunk', () => {
    it('getOrderByNumberThunk.pending', () => {
      const updatedState = feedSlice(initialState, {
        type: getOrderByNumberThunk.pending.type,
        payload: null
      });

      expect(updatedState.loading).toEqual(true);
      expect(updatedState.error).toEqual(null);
    });

    it('getOrderByNumberThunk.fulfilled', () => {
      const updatedState = feedSlice(initialState, {
        type: getOrderByNumberThunk.fulfilled.type,
        payload: orderByNumberResponse
      });
      expect(updatedState.loading).toEqual(false);
      expect(updatedState.error).toEqual(null);
      expect(updatedState.orderSelected).toEqual(
        orderByNumberResponse.orders[0]
      );
    });

    it('getOrderByNumberThunk.rejected', () => {
      const updatedState = feedSlice(initialState, {
        type: getOrderByNumberThunk.rejected.type,
        error: {
          message: 'error'
        }
      });
      expect(updatedState.loading).toEqual(false);
      expect(updatedState.error).toEqual('error');
      expect(updatedState.orders).toEqual([]);
      expect(updatedState.total).toEqual(0);
      expect(updatedState.totalToday).toEqual(0);
    });
  });
});
