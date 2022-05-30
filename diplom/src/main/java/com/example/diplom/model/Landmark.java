package com.example.diplom.model;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@Builder(toBuilder = true)
@Table(name = "landmarks")
@NoArgsConstructor
@AllArgsConstructor
public class Landmark {

    @NonNull
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "picture")
    private String picture;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name="category_id")
    private Category category;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name="city_id")
    private City city;

    @Column(name = "map")
    private String map;

    @Column(name = "visiting_time")
    private String visiting_time;

    @JsonGetter("city_name")
    public String getCityName(){
        return city.getName();
    }

    @JsonGetter("category_name")
    public String getCategoryName(){
        return category.getName();
    }

    @OneToMany(mappedBy = "landmark")
    @JsonManagedReference
    List<Picture> pictures;
}
