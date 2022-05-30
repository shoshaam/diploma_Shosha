package com.example.diplom.repository;

import com.example.diplom.model.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CityRepository extends JpaRepository<City, Long> {
    @Query(nativeQuery = true, value = "SELECT * FROM cities WHERE name = ?1")
    Optional<City> findCityByName(String name);
}
