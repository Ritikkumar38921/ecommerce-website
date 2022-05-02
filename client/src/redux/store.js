// import {configureStore,combineReducers} from "@reduxjs/toolkit";
import { configureStore , combineReducers} from "@reduxjs/toolkit";
import cartReducer from "./cartRedux";
import userReducer from "./userRedux";
import ordersReducer from "./ordersRedux";


import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist';
  import storage from 'redux-persist/lib/storage';

  const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  };


  const rootReducer = combineReducers({user:userReducer,cart:cartReducer,orders:ordersReducer});
  const persistedReducer = persistReducer(persistConfig, rootReducer)


 export let store = configureStore({
    reducer: persistedReducer,
    middleware:(getDefaultMiddleware)=>
      getDefaultMiddleware({
        serializableCheck:{
          ignoredActions:[FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER],
        },
      }),
});
 
// const store = configureStore({
//   reducer:{
//     cart:cartReducer,
//     user:userReducer,
//   }
// });


export let persistor = persistStore(store)

// export {store};


