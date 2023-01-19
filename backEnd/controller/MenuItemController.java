package com.cafeteria.controller;

import com.cafeteria.models.MenuItem;
import com.cafeteria.services.MenuItemService;
import com.fasterxml.jackson.databind.node.TextNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/menuitemsapi")
@CrossOrigin(origins = "http://localhost:3000")
public class MenuItemController {

    @Autowired
    private MenuItemService menuItemService;

    @GetMapping("/menuItems")
    public List<MenuItem> getMenuItems() {
        return this.menuItemService.findAll();
    }

    @PostMapping("/menuItem")
    public void createMenuItem(@RequestBody MenuItem menuItem) {
        menuItemService.save(menuItem);
    }

    @PutMapping("/menuItems/whole/{id}")
    public MenuItem updateWhole(@PathVariable long id, @RequestBody MenuItem menuItem1){
        MenuItem menuItem = findById(id);
        menuItem.setMenuItem(menuItem1.getMenuItem());
        menuItem.setQuantity(menuItem1.getQuantity());
        menuItem.setIngredients(menuItem1.getIngredients());
        menuItem.setAllergens(menuItem1.getAllergens());
        menuItem.setPrice(menuItem1.getPrice());
        menuItem.setCalories(menuItem1.getCalories());
        return menuItemService.update(menuItem);
    }


    @GetMapping("/menuItems/{id}")
    public MenuItem findById(@PathVariable long id) {
        Optional<MenuItem> menuItem = menuItemService.findById(id);
        return menuItem.orElse(null);
    }

    @DeleteMapping("/menuItem/{id}")
    public void deleteById(@PathVariable long id) {
        Optional<MenuItem> menuItem = menuItemService.findById(id);
        if (menuItem.isPresent()) {
            menuItemService.deleteById(id);
            //Map<String, Boolean> response = new HashMap<>();
            //response.put("deleted", Boolean.TRUE);
        }
    }

    @PutMapping("/menuItem/order/{id}/")
    public MenuItem updateOrders(@PathVariable long id) {
        MenuItem menuItem1 = findById(id);
        menuItem1.setOrders(menuItem1.getOrders()+1);
        return menuItemService.update(menuItem1);
    }

    @PutMapping("/menuItem/editMenuItem/{id}")
    public MenuItem updateMenuItem(@PathVariable long id, @RequestBody TextNode menuItem1){
        MenuItem menuItem = findById(id);
        menuItem.setMenuItem(menuItem1.asText());
        return menuItemService.update(menuItem);
    }

    @PutMapping("/menuItem/editIngredients/{id}")
    public MenuItem updateIngredients(@PathVariable long id, @RequestBody String ingredients) {
        MenuItem menuItem = findById(id);
        menuItem.setIngredients(ingredients);
        return menuItemService.update(menuItem);
    }

    @PutMapping("/menuItem/editAllergens/{id}")
    public MenuItem updateAllergens(@PathVariable long id, @RequestBody String allergens){
        MenuItem menuItem = findById(id);
        menuItem.setAllergens(allergens);
        return menuItemService.update(menuItem);
    }

    @PutMapping("/menuItem/editCalories/{id}")
    public MenuItem updateCalories(@PathVariable long id, @RequestBody double calories){
        MenuItem menuItem = findById(id);
        menuItem.setCalories(calories);
        return menuItemService.update(menuItem);
    }

    @PutMapping("/menuItem/editQuantity/{id}")
    public MenuItem updateQuantity(@PathVariable long id, @RequestBody double quantity) {
        MenuItem menuItem = findById(id);
        menuItem.setQuantity(quantity);
        return menuItemService.update(menuItem);
    }

    @PutMapping("/menuItem/editPrice/{id}")
    public MenuItem updatePrice(@PathVariable long id, @RequestBody double price) {
        MenuItem menuItem = findById(id);
        menuItem.setPrice(price);
        return menuItemService.update(menuItem);
    }
}
