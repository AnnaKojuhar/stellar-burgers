import userSlice, {
  getOrdersThunk,
  getUserThunk,
  initialState,
  loginUserThunk,
  logoutThunk,
  registerUserThunk,
  TUserState,
  updateUserThunk
} from '../services/slices/userSlice';

describe('тестирование userSlice', () => {
  const AuthResponse = {
    user: {
      email: 'email@gmail.com',
      name: 'hello world'
    }
  };

  const UpdateUserResponse = {
    user: {
      email: 'emailNew@gmail.com',
      name: 'hello world 11'
    }
  };

  const OrdersResponse = [
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
  ];

  describe('тестирование registerUserThunk', () => {
    it('registerUserThunk.pending', () => {
      const updatedState = userSlice(initialState, {
        type: registerUserThunk.pending.type,
        payload: null
      });
      expect(updatedState.loading).toEqual(true);
      expect(updatedState.error).toEqual(null);
    });

    it('registerUserThunk.fulfilled', () => {
      const updatedState = userSlice(initialState, {
        type: registerUserThunk.fulfilled.type,
        payload: AuthResponse
      });
      expect(updatedState.user).toEqual(AuthResponse.user);
      expect(updatedState.isAuth).toEqual(true);
      expect(updatedState.loading).toEqual(false);
      expect(updatedState.error).toEqual(null);
    });

    it('registerUserThunk.rejected', () => {
      const updatedState = userSlice(initialState, {
        type: registerUserThunk.rejected.type,
        error: {
          message: 'error'
        }
      });
      expect(updatedState.loading).toEqual(false);
      expect(updatedState.error).toEqual('error');
    });
  });

  describe('тестирование loginUserThunk', () => {
    it('loginUserThunk.pending', () => {
      const updatedState = userSlice(initialState, {
        type: loginUserThunk.pending.type,
        payload: null
      });
      expect(updatedState.loading).toEqual(true);
      expect(updatedState.error).toEqual(null);
    });

    it('loginUserThunk.fulfilled', () => {
      const updatedState = userSlice(initialState, {
        type: loginUserThunk.fulfilled.type,
        payload: AuthResponse
      });
      expect(updatedState.user).toEqual(AuthResponse.user);
      expect(updatedState.isAuth).toEqual(true);
      expect(updatedState.loading).toEqual(false);
      expect(updatedState.error).toEqual(null);
    });

    it('loginUserThunk.rejected', () => {
      const updatedState = userSlice(initialState, {
        type: loginUserThunk.rejected.type,
        error: {
          message: 'error'
        }
      });
      expect(updatedState.loading).toEqual(false);
      expect(updatedState.error).toEqual('error');
    });
  });

  describe('тестирование logoutThunk', () => {
    it('logoutThunk.pending', () => {
      const updatedState = userSlice(initialState, {
        type: logoutThunk.pending.type,
        payload: null
      });
      expect(updatedState.loading).toEqual(true);
      expect(updatedState.error).toEqual(null);
    });

    it('logoutThunk.fulfilled', () => {
      const updatedState = userSlice(initialState, {
        type: logoutThunk.fulfilled.type,
        payload: null
      });
      expect(updatedState.user).toEqual(null);
      expect(updatedState.isAuth).toEqual(false);
      expect(updatedState.loading).toEqual(false);
      expect(updatedState.error).toEqual(null);
    });

    it('logoutThunk.rejected', () => {
      const updatedState = userSlice(initialState, {
        type: logoutThunk.rejected.type,
        error: {
          message: 'error'
        }
      });
      expect(updatedState.loading).toEqual(false);
      expect(updatedState.error).toEqual('error');
    });
  });

  describe('тестирование getUserThunk', () => {
    it('getUserThunk.pending', () => {
      const updatedState = userSlice(initialState, {
        type: getUserThunk.pending.type,
        payload: null
      });
      expect(updatedState.loading).toEqual(true);
      expect(updatedState.error).toEqual(null);
    });

    it('getUserThunk.fulfilled', () => {
      const updatedState = userSlice(initialState, {
        type: getUserThunk.fulfilled.type,
        payload: AuthResponse
      });
      expect(updatedState.user).toEqual(AuthResponse.user);
      expect(updatedState.isAuth).toEqual(true);
      expect(updatedState.loading).toEqual(false);
    });

    it('getUserThunk.rejected', () => {
      const updatedState = userSlice(initialState, {
        type: getUserThunk.rejected.type,
        error: {
          message: 'error'
        }
      });
      expect(updatedState.loading).toEqual(false);
      expect(updatedState.error).toEqual('error');
    });
  });

  describe('тестирование updateUserThunk', () => {
    it('updateUserThunk.pending', () => {
      const updatedState = userSlice(initialState, {
        type: updateUserThunk.pending.type,
        payload: null
      });
      expect(updatedState.loading).toEqual(true);
      expect(updatedState.error).toEqual(null);
    });

    it('updateUserThunk.fulfilled', () => {
      const updatedState = userSlice(initialState, {
        type: updateUserThunk.fulfilled.type,
        payload: UpdateUserResponse
      });
      expect(updatedState.user).toEqual(UpdateUserResponse.user);
      expect(updatedState.loading).toEqual(false);
    });

    it('updateUserThunk.rejected', () => {
      const updatedState = userSlice(initialState, {
        type: updateUserThunk.rejected.type,
        error: {
          message: 'error'
        }
      });
      expect(updatedState.loading).toEqual(false);
      expect(updatedState.error).toEqual('error');
    });
  });

  describe('тестирование getOrdersThunk', () => {
    const updatedState = userSlice(initialState, {
      type: getOrdersThunk.pending.type,
      payload: null
    });
    expect(updatedState.error).toEqual(null);
  });

  it('getOrdersThunk.fulfilled', () => {
    const updatedState = userSlice(initialState, {
      type: getOrdersThunk.fulfilled.type,
      payload: OrdersResponse
    });
    expect(updatedState.orders).toEqual(OrdersResponse);
  });

  it('getOrdersThunk.rejected', () => {
    const updatedState = userSlice(initialState, {
      type: getOrdersThunk.rejected.type,
      error: {
        message: 'error'
      }
    });
    expect(updatedState.error).toEqual('error');
  });
});
