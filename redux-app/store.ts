import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import loginSlice from '../slices/loginSlice/loginSlice';
import lorbSlice from '../slices/lorbSlice/lorbSlice';
import userSlice from '../slices/userSlice/userSlice';

export const store = configureStore({
  reducer: {
    login:loginSlice,
    lorb:lorbSlice,
    user:userSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
