package com.example.diplom.service.city;

import com.example.diplom.model.City;
import com.example.diplom.repository.CityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CityServiceImpl implements CityService{

    @Autowired
    CityRepository cityRepository;

    @Override
    public List<City> getAll() {
        return cityRepository.findAll();
    }

    @Override
    public Optional<City> getById(Long id) {
        return cityRepository.findById(id);
    }

    @Override
    public City save(City newCity) {
        return cityRepository.save(newCity);
    }

    @Override
    public Optional<City> getByName(String name) {
        return cityRepository.findCityByName(name);
    }
}
