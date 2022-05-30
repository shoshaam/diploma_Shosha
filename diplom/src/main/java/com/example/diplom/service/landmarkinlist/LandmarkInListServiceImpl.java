package com.example.diplom.service.landmarkinlist;

import com.example.diplom.model.LandmarkInList;
import com.example.diplom.repository.LandmarkInListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LandmarkInListServiceImpl implements LandmarkInListService {

    @Autowired
    private LandmarkInListRepository landmarkInListRepository;

    @Override
    public List<LandmarkInList> getAll() {
        return landmarkInListRepository.findAll();
    }

    @Override
    public Optional<LandmarkInList> getById(Long id) {
        return landmarkInListRepository.findById(id);
    }

    @Override
    public List<LandmarkInList> getAllByUserId(Long id) {
        return landmarkInListRepository.getLandmarksInListByUserId(id);
    }

    @Override
    public LandmarkInList save(LandmarkInList newLandmarkInList) {
        return landmarkInListRepository.save(newLandmarkInList);
    }

    @Override
    public void deleteById(Long id) {
        landmarkInListRepository.deleteById(id);
    }
}
