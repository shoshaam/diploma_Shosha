package com.example.diplom.service.city;

import com.example.diplom.model.City;

import java.util.List;
import java.util.Optional;

public interface CityService {
    List<City> getAll();

    Optional<City> getById(Long id);

    City save(City newCity);

    Optional<City> getByName(String name);
}
