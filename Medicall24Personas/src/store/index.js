import { configureStore } from '@reduxjs/toolkit';
import formDataReducer from './slices/formDataSlice';
import localFormDataReducer from './slices/dataAddSlice';

const store = configureStore({
  reducer: {
    formData: formDataReducer,
    localFormData: localFormDataReducer,

  },
});

export default store;
