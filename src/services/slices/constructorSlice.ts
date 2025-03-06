import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction
} from '@reduxjs/toolkit';
import { orderBurgerApi } from '../../utils/burger-api';

export interface TConstructorState {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  error: null | undefined | string;
  orderRequest: boolean;
  orderModalData: TOrder | null;
}
const initialState: TConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  error: null,
  orderRequest: false,
  orderModalData: null
};

export const orderBurgerThunk = createAsyncThunk(
  'constructor/order',
  async (ingredientsIds: string[]) => orderBurgerApi(ingredientsIds)
);

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        const newIngredient = action.payload;
        if (newIngredient.type === 'bun') {
          state.constructorItems.bun = newIngredient;
        } else {
          state.constructorItems.ingredients.push(newIngredient);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: {
          ...ingredient,
          id: nanoid()
        }
      })
    },
    removeIngredient(state, action: PayloadAction<string>) {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (el) => el.id !== action.payload
        );
    },
    moveIngredientUp(state, action: PayloadAction<number>) {
      const idx = action.payload;
      const prev = state.constructorItems.ingredients[idx - 1];
      const curr = state.constructorItems.ingredients[idx];
      state.constructorItems.ingredients[idx - 1] = curr;
      state.constructorItems.ingredients[idx] = prev;
    },
    moveIngredientDown(state, action: PayloadAction<number>) {
      const idx = action.payload;
      const next = state.constructorItems.ingredients[idx + 1];
      const curr = state.constructorItems.ingredients[idx];
      state.constructorItems.ingredients[idx + 1] = curr;
      state.constructorItems.ingredients[idx] = next;
    },
    clearModalData(state) {
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurgerThunk.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(orderBurgerThunk.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
        state.constructorItems.bun = null;
        state.constructorItems.ingredients = [];
      })
      .addCase(orderBurgerThunk.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message;
      });
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearModalData
} = constructorSlice.actions;
export default constructorSlice.reducer;
