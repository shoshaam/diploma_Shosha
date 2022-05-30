package com.example.diplom.model;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@Builder(toBuilder = true)
@Table(name = "landmarks_in_list")
@NoArgsConstructor
@AllArgsConstructor
public class LandmarkInList {

    @NonNull
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "rating")
    private int rating;

    @Column(name = "visit_date")
    private LocalDate visit_date;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    @ManyToOne
    @JoinColumn(name = "landmark_id")
    @JsonIgnore
    private Landmark landmark;

    @JsonGetter("landmark_id")
    public Long getLandmarkId(){
        return landmark.getId();
    }

    @JsonGetter("name")
    public String getName(){
        return landmark.getName();
    }

    @JsonGetter("picture")
    public String getPicture(){
        return landmark.getPicture();
    }
}
