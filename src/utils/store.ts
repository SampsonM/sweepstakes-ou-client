import { configureStore, combineReducers } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import appReducer from '../slices/app.slice'
import { userApi } from '../slices/user.slice'

const rootReducer = combineReducers({
  app: appReducer,
  [userApi.reducerPath]: userApi.reducer,
})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    const defaultMiddleware = getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    })

    defaultMiddleware.concat(userApi.middleware)

    return __DEV__ ? defaultMiddleware.concat(logger) : defaultMiddleware
  },
})

export type RootState = ReturnType<typeof rootReducer>

export default store
