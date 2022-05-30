package com.example.diplom.repository;

import com.example.diplom.model.LandmarkInList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LandmarkInListRepository extends JpaRepository<LandmarkInList, Long> {
    @Query(nativeQuery = true,
            value = "SELECT * FROM landmarks_in_list WHERE user_id = ?1")
    List<LandmarkInList> getLandmarksInListByUserId(Long id);
}
