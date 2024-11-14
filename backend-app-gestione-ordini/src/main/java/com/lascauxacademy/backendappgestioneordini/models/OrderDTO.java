package com.lascauxacademy.backendappgestioneordini.models;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class OrderDTO {
    private String clientId;

    private OrderState orderState;

    private List<OrderProductDTO> orderProductList;

    private double totalPriceWithVat;

    private double totalPriceNoVat;

    private OffsetDateTime
            date;


}
