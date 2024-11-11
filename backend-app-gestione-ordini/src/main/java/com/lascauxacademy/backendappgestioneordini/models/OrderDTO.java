package com.lascauxacademy.backendappgestioneordini.models;

import java.util.List;

public class OrderDTO {
    String clientId;

    OrderState orderState;

    List<OrderProductDTO> orderProductList;

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public OrderState getOrderState() {
        return orderState;
    }

    public void setOrderState(OrderState orderState) {
        this.orderState = orderState;
    }

    public List<OrderProductDTO> getOrderProductList() {
        return orderProductList;
    }

    public void setOrderProductList(List<OrderProductDTO> orderProductList) {
        this.orderProductList = orderProductList;
    }
}
