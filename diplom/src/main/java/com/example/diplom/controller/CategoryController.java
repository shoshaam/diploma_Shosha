package com.example.diplom.controller;

import com.example.diplom.model.Category;
import com.example.diplom.service.category.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.rmi.ServerException;
import java.util.List;

@RestController
@RequestMapping("category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping()
    @ResponseBody
    List<Category> getCategories(){
        return categoryService.getAll();
    }

    @PostMapping
    public ResponseEntity<Category> create(@RequestBody Category newCategory) throws ServerException {
        Category category = categoryService.save(newCategory);
        if (category == null) {
            throw new ServerException("Cannot save");
        } else {
            return new ResponseEntity<>(category, HttpStatus.CREATED);
        }
    }

    @GetMapping("/{id}")
    @ResponseBody
    Category getCategoryById(@PathVariable Long id) throws ResponseStatusException {
        return categoryService.getById(id).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "There is no category with this id"));
    }
}
