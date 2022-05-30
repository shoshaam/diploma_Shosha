package com.example.diplom.controller;

import com.example.diplom.model.City;
import com.example.diplom.service.city.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.rmi.ServerException;
import java.util.List;

@RestController
@RequestMapping("city")
public class CityController {

    @Autowired
    private CityService cityService;

    @GetMapping()
    @ResponseBody
    List<City> getCities(){
        return cityService.getAll();
    }

    @PostMapping
    public ResponseEntity<City> create(@RequestBody City newCity) throws ServerException {
        City city = cityService.save(newCity);
        if (city == null) {
            throw new ServerException("Cannot save");
        } else {
            return new ResponseEntity<>(city, HttpStatus.CREATED);
        }
    }

    @GetMapping("/{id}")
    @ResponseBody
    City getCityById(@PathVariable Long id) throws ResponseStatusException {
        return cityService.getById(id).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "There is no city with this id"));
    }
}
