package com.lascauxacademy.backendappgestioneordini.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class OrderProductDTO {
    String productId;
    
    int quantity;
    
}
