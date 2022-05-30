package com.example.diplom.controller;

        import com.example.diplom.dto.LandmarkDTO;
        import com.example.diplom.model.Landmark;
        import com.example.diplom.service.category.CategoryService;
        import com.example.diplom.service.city.CityService;
        import com.example.diplom.service.landmark.LandmarkService;
        import org.modelmapper.ModelMapper;
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.http.HttpStatus;
        import org.springframework.http.ResponseEntity;
        import org.springframework.web.bind.annotation.*;
        import org.springframework.web.server.ResponseStatusException;

        import java.rmi.ServerException;
        import java.util.List;

@RestController
@RequestMapping("landmark")
public class LandmarkController {

    @Autowired
    private LandmarkService landmarkService;
    @Autowired
    CityService cityService;
    @Autowired
    CategoryService categoryService;
    @Autowired
    private ModelMapper modelMapper;

    @GetMapping()
    @ResponseBody
    List<Landmark> getLandmarks(){
        return landmarkService.getAll();
    }

    @PostMapping
    public ResponseEntity<Landmark> create(@RequestBody LandmarkDTO landmarkDTO) throws ServerException {
        Landmark landmark = landmarkService.save(convertToEntity(landmarkDTO));
        if (landmark == null) {
            throw new ServerException("Cannot save");
        } else {
            return new ResponseEntity<>(landmark, HttpStatus.CREATED);
        }
    }

    @DeleteMapping("/{id}")
    public @ResponseBody ResponseEntity<String> delete(@PathVariable Long id) {
        landmarkService.deleteById(id);
        return new ResponseEntity<String>("DELETED", HttpStatus.OK);
    }

    @PutMapping
    public @ResponseBody ResponseEntity<String> put(@RequestBody LandmarkDTO landmarkDTO) throws ServerException {
        Landmark landmark = landmarkService.save(convertToEntity(landmarkDTO));
        if (landmark == null) {
            throw new ServerException("Cannot update");
        } else {
            return new ResponseEntity<String>("UPDATED", HttpStatus.OK);
        }
    }

    @GetMapping("/{id}")
    @ResponseBody
    Landmark getLandmarkById(@PathVariable Long id) throws ResponseStatusException {
        return landmarkService.getById(id).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "There is no landmark with this id"));
    }

    @GetMapping(params = "category_name")
    public List<Landmark> getLandmarksByCategoryName(@RequestParam("category_name") String category_name) {
        return landmarkService.getAllByCategoryName(category_name);
    }

    @GetMapping(params = "city_name")
    public List<Landmark> getLandmarksByCityName(@RequestParam("city_name") String city_name) {
        return landmarkService.getAllByCityName(city_name);
    }

    private Landmark convertToEntity(LandmarkDTO landmarkDTO){
        Landmark newLandmark = modelMapper.map(landmarkDTO,Landmark.class);
        newLandmark.setCategory(categoryService.getByName(landmarkDTO.getCategory_name()).get());
        newLandmark.setCity(cityService.getByName(landmarkDTO.getCity_name()).get());
        return newLandmark;
    }
}
