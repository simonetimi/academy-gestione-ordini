package com.lascauxacademy.backendappgestioneordini.entities;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "clients")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "company_name")
    private String companyName;

    @Column(name = "street_name")
    private String streetName;

    @Column
    private String city;

    @Column
    private String province;

    @Column
    private String nation;

    @OneToMany(mappedBy = "client")
    private List<Order> orders;

}
