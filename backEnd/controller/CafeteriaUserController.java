package com.cafeteria.controller;

import com.cafeteria.models.CafeteriaUser;
import com.cafeteria.models.Menu;
import com.cafeteria.models.SimpleUser;
import com.cafeteria.services.CafeteriaUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/cafeteriausersapi")
public class CafeteriaUserController {

    @Autowired
    private CafeteriaUserService cafeteriaUserService;

    @GetMapping("/cafeteriaUsers")
    public List<CafeteriaUser> getCafeteriaUsers() {
        System.out.println(this.cafeteriaUserService.findAll());
        return this.cafeteriaUserService.findAll();
    }

    @GetMapping("/cafeteriaUsers/cu/{email}")
    public CafeteriaUser getSimpleUserByEmail(@PathVariable String email) {
        ArrayList<CafeteriaUser> list = (ArrayList<CafeteriaUser>) getCafeteriaUsers();
        list = (ArrayList<CafeteriaUser>) list.stream().filter(el -> Objects.equals(el.getEmail(),email)).collect(Collectors.toList());
        return list.get(0);
    }

    @PostMapping("/cafeteriaUser")
    public void createCafeteriaUser(@RequestBody CafeteriaUser cafeteriaUser) {
        cafeteriaUserService.save(cafeteriaUser);
    }

    @GetMapping("/cafeteriaUsers/{id}")
    public CafeteriaUser findById(@PathVariable String id) {
        Optional<CafeteriaUser> cafeteriaUser = cafeteriaUserService.findById(id);
        return cafeteriaUser.orElse(null);
    }

    @DeleteMapping("/cafeteriaUser/{id}")
    public void deleteById(@PathVariable String id) {
        Optional<CafeteriaUser> cafeteriaUser = cafeteriaUserService.findById(id);
        if (cafeteriaUser.isPresent()) {
            cafeteriaUserService.deleteById(id);
        }
    }

    @PutMapping("/cafeteriaUser/tomorrowMenu/{id}")
    public CafeteriaUser updateTomorrow(@RequestBody Menu menu, @PathVariable String id) {
        CafeteriaUser cafeteriaUser = findById(id);
        cafeteriaUser.setTomorrowMenu(menu);
        return cafeteriaUserService.update(cafeteriaUser);
    }

    @PutMapping("/cafeteriaUser/todayMenu/{id}")
    public CafeteriaUser updateToday(@RequestBody Menu menu, @PathVariable String id) {
        CafeteriaUser cafeteriaUser = findById(id);
        cafeteriaUser.setTodayMenu(menu);
        return cafeteriaUserService.update(cafeteriaUser);
    }

    @PutMapping("/cafeteriaUser/settings/{id}")
    public CafeteriaUser updateUser(@RequestBody CafeteriaUser cafeteriaUser, @PathVariable String id) {
        CafeteriaUser cafeteriaUser1 = findById(id);
        cafeteriaUser1.setCafeteriaName(cafeteriaUser.getCafeteriaName().isBlank() ? cafeteriaUser1.getCafeteriaName() : cafeteriaUser.getCafeteriaName());
        cafeteriaUser1.setCity(cafeteriaUser.getCity().isBlank() ? cafeteriaUser1.getCity() : cafeteriaUser.getCity());
        cafeteriaUser1.setAddress(cafeteriaUser.getAddress().isBlank() ? cafeteriaUser1.getAddress() : cafeteriaUser.getAddress());
        cafeteriaUser1.setDescription(cafeteriaUser.getDescription().isBlank() ? cafeteriaUser1.getDescription() : cafeteriaUser.getDescription());
        cafeteriaUser1.setPhoneNumber(cafeteriaUser.getPhoneNumber().isBlank() ? cafeteriaUser1.getPhoneNumber() : cafeteriaUser.getPhoneNumber());
        cafeteriaUser1.setEmail(cafeteriaUser1.getEmail());
        cafeteriaUser1.setPasswordEnc(cafeteriaUser.getPasswordEnc().isBlank() ? cafeteriaUser1.getPasswordEnc() : cafeteriaUser.getPasswordEnc());
        cafeteriaUser1.setprofilePicture(cafeteriaUser.getProfilePicture().isBlank() ? cafeteriaUser1.getProfilePicture() : cafeteriaUser.getProfilePicture());
        return cafeteriaUserService.update(cafeteriaUser1);
    }

}