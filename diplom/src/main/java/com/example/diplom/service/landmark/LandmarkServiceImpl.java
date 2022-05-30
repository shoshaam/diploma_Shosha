package com.example.diplom.service.landmark;

import com.example.diplom.model.Landmark;
import com.example.diplom.repository.LandmarkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.val;

import java.util.List;
import java.util.Optional;

@Service
public class LandmarkServiceImpl implements LandmarkService{

    @Autowired
    LandmarkRepository landmarkRepository;

    @Override
    public List<Landmark> getAll() {
        return landmarkRepository.findAll();
    }

    @Override
    public Optional<Landmark> getById(Long id) {
        return landmarkRepository.findById(id);
    }

    @Override
    public List<Landmark> getAllByCategoryName(String category) {
        return landmarkRepository.getLandmarksByCategoryName(category);
    }

    @Override
    public List<Landmark> getAllByCityName(String city) {
        return landmarkRepository.getLandmarksByCityName(city);
    }

    @Override
    public Landmark save(Landmark newLandmark) {
        return landmarkRepository.save(newLandmark);
    }

    @Override
    public void deleteById(Long id) {
        landmarkRepository.deleteById(id);
    }

}
