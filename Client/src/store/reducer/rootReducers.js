import { combineReducers } from "redux";
import UserReducer  from "./UserReducer";
import InvoiceReducer  from "./InvoiceReducer";
import ProductReducer  from "./ProductReducer";
export const rootReducers = combineReducers({
  UserReducer,
  InvoiceReducer,
  ProductReducer
})


