package com.cafeteria.controller;

import com.cafeteria.models.CafeteriaUser;
import com.cafeteria.models.SimpleUser;
import com.cafeteria.services.SimpleUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/simpleusersapi")
public class SimpleUserController {

    @Autowired
    private SimpleUserService simpleUserService;

    @GetMapping("/simpleUsers")
    public List<SimpleUser> getSimpleUsers() {
        return this.simpleUserService.findAll();
    }

    @GetMapping("/simpleUsers/su/{email}")
    public SimpleUser getSimpleUserByEmail(@PathVariable String email) {
        ArrayList<SimpleUser> list = (ArrayList<SimpleUser>) getSimpleUsers();
        list = (ArrayList<SimpleUser>) list.stream().filter(el -> Objects.equals(el.getEmail(),email)).collect(Collectors.toList());
        return list.get(0);
    }

    @PostMapping("/simpleUser")
    public void createSimpleUser(@RequestBody SimpleUser simpleUser) {
        simpleUserService.save(simpleUser);
    }

    @GetMapping("/simpleUsers/{id}")
    public SimpleUser findById(@PathVariable String id) {
        Optional<SimpleUser> simpleUser = simpleUserService.findById(id);
        return simpleUser.orElse(null);
    }

    @DeleteMapping("/simpleUser/{id}")
    public void deleteById(@PathVariable String id) {
        Optional<SimpleUser> simpleUser = simpleUserService.findById(id);
        if (simpleUser.isPresent()) {
            simpleUserService.deleteById(id);
        }
    }

    @PutMapping("/simpleUser/subs/{id}")
    public SimpleUser update(@RequestBody CafeteriaUser cafeteriaUser, @PathVariable String id) {
        SimpleUser simpleUser = findById(id);
        simpleUser.addSubscription(cafeteriaUser);
        return simpleUserService.update(simpleUser);
    }

    @PutMapping("/simpleUser/subsrem/{id}")
    public SimpleUser updateRem(@RequestBody CafeteriaUser cafeteriaUser, @PathVariable String id) {
        SimpleUser simpleUser = findById(id);
        simpleUser.removeSubscription(cafeteriaUser);
        return simpleUserService.update(simpleUser);
    }

    @PutMapping("/simpleUser/hasSent/{id}")
    public SimpleUser updateSent(@PathVariable String id) {
        SimpleUser simpleUser = findById(id);
        simpleUser.setSentToday(true);
        return simpleUserService.update(simpleUser);
    }

    @PutMapping("/simpleUser/settings/{id}")
    public SimpleUser updateUser(@PathVariable String id, @RequestBody SimpleUser simpleUser) {
        SimpleUser simpleUser1 = findById(id);
        simpleUser1.setFirstName(simpleUser.getFirstName().isBlank() ? simpleUser1.getFirstName() : simpleUser.getFirstName());
        simpleUser1.setDateOfBirth(simpleUser1.getDateOfBirth());
        simpleUser1.setLastName(simpleUser.getLastName().isBlank() ? simpleUser1.getLastName() : simpleUser.getLastName());
        simpleUser1.setEmail(simpleUser1.getEmail());
        simpleUser1.setprofilePicture(simpleUser.getProfilePicture().isBlank() ? simpleUser1.getProfilePicture() : simpleUser.getProfilePicture());
        return simpleUserService.update(simpleUser1);
    }

}
