package com.example.diplom.repository;

import com.example.diplom.model.Landmark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LandmarkRepository extends JpaRepository<Landmark, Long> {
    @Query(nativeQuery = true, value = "SELECT * FROM landmarks, categories WHERE category_id = categories.id AND categories.name = ?1")
    public List<Landmark> getLandmarksByCategoryName(String name);

    @Query(nativeQuery = true, value = "SELECT * FROM landmarks, cities WHERE city_id = cities.id AND cities.name = ?1")
    public List<Landmark> getLandmarksByCityName(String name);
}
