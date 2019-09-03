import axios from "axios";
import { API_URL } from "react-native-dotenv";

export const addNewOrders = (data) => {
  return {
    type: 'ADD_NEW_ORDER',
    payload: data
  }
}

export const updateOrderQty = (data) => {
  return {
    type: 'UPDATE_ORDER_QTY',
    payload: data
  }
}

export const sendOrders = (data, headers) => {
  return {
    type: 'REMOVE_ORDERS',
    payload: axios.post(`${API_URL}/orders`, {orders: data}, headers)
  }
}

export const updateStatusOrders = (header) => {
  return {
    type: 'UPDATE_STATUS_ORDERS',
    payload: axios.patch(`${API_URL}/orders/`, {}, header)
  }
}
