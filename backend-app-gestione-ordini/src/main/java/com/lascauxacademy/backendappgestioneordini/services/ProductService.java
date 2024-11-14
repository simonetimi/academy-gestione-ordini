package com.lascauxacademy.backendappgestioneordini.services;

import com.lascauxacademy.backendappgestioneordini.entities.Product;
import com.lascauxacademy.backendappgestioneordini.repositories.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // ritorna solo i prodotti che sono current
    @Transactional(readOnly = true)
    public List<Product> getAllProducts() {
        return productRepository.findByIsCurrent(true);
    }

    @Transactional
    public Product addProduct(Product p) {
        return productRepository.save(p);
    }

    @Transactional
    public void deleteProduct(String productId) throws EntityNotFoundException {
        Optional<Product> product = productRepository.findById(productId);
        if (product.isEmpty())
            throw new EntityNotFoundException("Id " + productId + " not found!");
        productRepository.deleteById(productId);
    }

    // setta il vecchio prodotto come current = false e crea un nuovo prodotto con i dati modificati dall'admin
    // questo mantiene traccia del costo degli ordini passati in caso sia cambiato
    @Transactional
    public Product updateProduct(Product p) throws EntityNotFoundException {
        String productId = p.getId();
        Optional<Product> productOptional = productRepository.findById(productId);
        if (productOptional.isEmpty()) {
            throw new EntityNotFoundException("Id " + productId + " not found!");
        }
        Product oldProduct = productOptional.get();
        oldProduct.setCurrent(false);
        productRepository.save(oldProduct);

        p.setId(null);
        p.setCurrent(true);

        return productRepository.save(p);
    }
}
