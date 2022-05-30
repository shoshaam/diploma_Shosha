package com.example.diplom.service.landmark;

import com.example.diplom.model.Landmark;

import java.util.List;
import java.util.Optional;

public interface LandmarkService {
    List<Landmark> getAll();

    Optional<Landmark> getById(Long id);

    List<Landmark> getAllByCategoryName(String category);

    List<Landmark> getAllByCityName(String city);

    Landmark save(Landmark newLandmark);

    void deleteById(Long id);
}
