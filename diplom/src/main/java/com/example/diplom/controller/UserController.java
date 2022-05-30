package com.example.diplom.controller;

import com.example.diplom.model.LandmarkInList;
import com.example.diplom.model.User;
import com.example.diplom.service.city.CityService;
import com.example.diplom.service.landmarkinlist.LandmarkInListService;
import com.example.diplom.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.rmi.ServerException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("user")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    CityService cityService;
    @Autowired
    private LandmarkInListService landmarkInListService;

    @GetMapping()
    @ResponseBody
    List<User> getUsers(){
        return userService.getAll();
    }

    @PostMapping
    public ResponseEntity<User> create(@RequestBody User newUser) throws ServerException {
        User user = userService.save(newUser);
        if (user == null) {
            throw new ServerException("Cannot save");
        } else {
            return new ResponseEntity<>(user, HttpStatus.CREATED);
        }
    }

    @GetMapping("/{id}")
    @ResponseBody
    User getUserById(@PathVariable Long id) throws ResponseStatusException {
        return userService.getById(id).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "There is no user with this id"));
    }

    @GetMapping("/{id}/landmarks")
    @ResponseBody
    List<LandmarkInList> getUserLandmarksById(@PathVariable Long id) {
        return  landmarkInListService.getAllByUserId(id);
    }

    @GetMapping(params = "login")
    public Optional<User> getUserByLogin(@RequestParam("login") String login) {
        return userService.getByLogin(login);
    }
}
