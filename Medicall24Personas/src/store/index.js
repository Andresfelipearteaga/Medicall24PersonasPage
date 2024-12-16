import { configureStore } from '@reduxjs/toolkit';
import formDataReducer from './slices/formDataSlice';
import localFormDataReducer from './slices/dataAddSlice';
import paidObjectReducer from './slices/paidObject';

const store = configureStore({
  reducer: {
    formData: formDataReducer,
    localFormData: localFormDataReducer,
    paidObject: paidObjectReducer,

  },
});

export default store;
