package com.example.diplom.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {

    private Long id;

    private String login;

    private String password;

    private String fullname;

    private LocalDate birth_date;

    private String city_name;
}