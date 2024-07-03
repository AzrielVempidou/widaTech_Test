// InvoiceReducer.js
import {
  ADD_INVOICE_SUCCESS,
  GET_INVOICES_SUCCESS,
  DELETE_INVOICE_SUCCESS
} from '../action/actionType';

const initialState = {
  invoices: []
};

const InvoiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INVOICE_SUCCESS:
      return {
        ...state,
        invoices: [...state.invoices, action.payload.invoice]
      };
    case GET_INVOICES_SUCCESS:
      return {
        ...state,
        invoices: action.payload.invoices
      };
    case DELETE_INVOICE_SUCCESS:
      return {
        ...state,
        invoices: state.invoices.filter(inv => inv.id !== action.payload.id)
      };
    default:
      return state;
  }
};

export default InvoiceReducer;
