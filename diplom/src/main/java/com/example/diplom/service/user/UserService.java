package com.example.diplom.service.user;

import com.example.diplom.model.City;
import com.example.diplom.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    List<User> getAll();

    Optional<User> getById(Long id);

    User save(User newUser);

    Optional<User> getByLogin(String login);


}
