package com.example.diplom.controller;

import com.example.diplom.dto.LandmarkDTO;
import com.example.diplom.dto.LandmarkInListDTO;
import com.example.diplom.model.Landmark;
import com.example.diplom.model.LandmarkInList;
import com.example.diplom.service.landmark.LandmarkService;
import com.example.diplom.service.landmarkinlist.LandmarkInListService;
import com.example.diplom.service.user.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.rmi.ServerException;
import java.util.List;

@RestController
@RequestMapping("landmark_in_list")
public class LandmarkInListController {

    @Autowired
    private LandmarkInListService landmarkInListService;
    @Autowired
    private LandmarkService landmarkService;
    @Autowired
    private UserService userService;

    @Autowired
    ModelMapper modelMapper;

    @GetMapping()
    @ResponseBody
    List<LandmarkInList> getLandmarksList(){
        return landmarkInListService.getAll();
    }

    @PostMapping
    public ResponseEntity<LandmarkInList> create(@RequestBody LandmarkInListDTO landmarkInListDTO) throws ServerException {
        LandmarkInList landmarkInList = landmarkInListService.save(convertToEntity(landmarkInListDTO));
        if (landmarkInList == null) {
            throw new ServerException("Cannot save");
        } else {
            return new ResponseEntity<>(landmarkInList, HttpStatus.CREATED);
        }
    }

    @DeleteMapping("/{id}")
    public @ResponseBody ResponseEntity<String> delete(@PathVariable Long id) {
        landmarkInListService.deleteById(id);
        return new ResponseEntity<String>("DELETE Response", HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @ResponseBody
    LandmarkInList getLandmarksListById(@PathVariable Long id) throws ResponseStatusException {
        return landmarkInListService.getById(id).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "There is no landmark list with this id"));
    }

    private LandmarkInList convertToEntity(LandmarkInListDTO landmarkInListDTO){
        LandmarkInList newLandmarkInList = modelMapper.map(landmarkInListDTO,LandmarkInList.class);
        newLandmarkInList.setLandmark(landmarkService.getById(landmarkInListDTO.getLandmark_id()).get());
        newLandmarkInList.setUser(userService.getById(landmarkInListDTO.getUser_id()).get());
        return newLandmarkInList;
    }
}
