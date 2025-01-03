package com.lascauxacademy.backendappgestioneordini.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.lascauxacademy.backendappgestioneordini.models.OrderState;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Entity
@Table(name = "orders")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    @Column
    @Enumerated(EnumType.STRING)
    private OrderState state = OrderState.IN_PROGRESS;

    @OneToMany(mappedBy = "order")
    @JsonManagedReference
    @Column(name = "products_list")
    private List<OrderProduct> orderProducts;

    @Column(name = "total_price_with_vat", nullable = false)
    private double totalPriceWithVat;

    @Column(name = "total_price_no_vat", nullable = false)
    private double totalPriceNoVat;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;

    @Column
    private OffsetDateTime date;

    public String getDate() {
        return date.format(DateTimeFormatter.ISO_OFFSET_DATE_TIME);
    }
}
