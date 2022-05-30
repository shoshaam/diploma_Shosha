package com.example.diplom.dto;

import com.example.diplom.model.Landmark;
import com.example.diplom.model.User;
import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public class LandmarkInListDTO {

    private Long id;

    private int rating;

    private LocalDate visit_date;

    private Long user_id;

    private Long landmark_id;
}
