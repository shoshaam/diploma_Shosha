package com.example.diplom.service.category;

import com.example.diplom.model.Category;
import com.example.diplom.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService{

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<Category> getAll() {
        return categoryRepository.findAll();
    }

    @Override
    public Optional<Category> getById(Long id) {
        return categoryRepository.findById(id);
    }

    @Override
    public Category save(Category newCategory) {
        return categoryRepository.save(newCategory);
    }

    @Override
    public Optional<Category> getByName(String name) {
        return categoryRepository.findCategoryByName(name);
    }
}
