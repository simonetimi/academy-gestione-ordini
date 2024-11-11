package com.lascauxacademy.backendappgestioneordini.controllers;

import com.lascauxacademy.backendappgestioneordini.entities.Product;
import com.lascauxacademy.backendappgestioneordini.services.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("")
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productService.getAllProducts();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<Product> addProduct(Product p) {
        Product product = productService.addProduct(p);
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable("id") long productId) {
        try {
            productService.deleteProduct(productId);
            return new ResponseEntity<>("Product with id " + productId + " delete successfully.", HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }


    @PutMapping
    public ResponseEntity<?> updateProduct(Product p) {
        try {
            Product product = productService.updateProduct(p);
            return new ResponseEntity<>(product, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }


}
