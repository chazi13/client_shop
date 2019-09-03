const initialState = {
  orders: [],
  isLoading: false,
  message: ''
}

const orders = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_NEW_ORDER':
      return {
        ...state,
        orders: [
          ...state.orders,
          action.payload
        ]
      };

    case 'UPDATE_ORDER_QTY': 
      return {
        ...state,
        orders: [
          ...action.payload
        ]
      };

    case 'REMOVE_ORDERS_PENDING':
      return {
        ...state,
        isLoading: true
      };

    case 'REMOVE_ORDERS_FULFILLED':
        return {
          ...state,
          isLoading: false,
          orders: []
        };

    case 'REMOVE_ORDERS_REJECTED':
      return {
        ...state,
        isLoading: false,
        message: 'Unable to send data'
      };
  
    default:
      return state;
  }
}

export default orders;
