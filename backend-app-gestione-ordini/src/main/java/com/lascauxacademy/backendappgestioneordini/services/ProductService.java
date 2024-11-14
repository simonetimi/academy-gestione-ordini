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

	@Transactional(readOnly = true)
	public List<Product> getAllProducts() {
		return productRepository.findAll();
	}

	@Transactional(readOnly = true)
	public List<Product> getAllCurrentProducts() {
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

	@Transactional
	public Product updateProduct(Product p) throws EntityNotFoundException {
		String productId = p.getId();
		Optional<Product> product = productRepository.findById(productId);
		if (!productRepository.existsById(productId)) {
			throw new EntityNotFoundException("Id " + productId + " not found!");
		}
		p.setCurrent(false);
		productRepository.save(p);

		Product newProduct = p;
		newProduct.setId(null);
		newProduct.setCurrent(true);

		return productRepository.save(newProduct);

	}
}
