package com.example.diplom.service.category;

import com.example.diplom.model.Category;

import java.util.List;
import java.util.Optional;

public interface CategoryService {
    List<Category> getAll();

    Optional<Category> getById(Long id);

    Category save(Category newCategory);

    Optional<Category> getByName(String name);
}
