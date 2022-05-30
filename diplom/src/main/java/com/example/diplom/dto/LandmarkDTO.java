package com.example.diplom.dto;

import lombok.*;

@Getter
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public class LandmarkDTO {

    private Long id;

    private String name;

    private String description;

    private String picture;

    private String category_name;

    private String city_name;

    private String map;

    private String picture_path;
}

