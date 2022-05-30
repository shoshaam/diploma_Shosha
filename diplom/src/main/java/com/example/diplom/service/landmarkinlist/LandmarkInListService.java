package com.example.diplom.service.landmarkinlist;

import com.example.diplom.model.LandmarkInList;

import java.util.List;
import java.util.Optional;

public interface LandmarkInListService {
    List<LandmarkInList> getAll();

    Optional<LandmarkInList> getById(Long id);

    List<LandmarkInList> getAllByUserId(Long id);

    LandmarkInList save(LandmarkInList newLandmarkInList);

    void deleteById(Long id);
}
