package com.cafeteria.controller;

import com.cafeteria.models.CafeteriaUser;
import com.cafeteria.models.Menu;
import com.cafeteria.models.MenuItem;
import com.cafeteria.models.SimpleUser;
import com.cafeteria.services.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/menuapi")
public class MenuController {

    @Autowired
    private MenuService menuService;

    @GetMapping("/menus")
    public List<Menu> getMenus() {
        return this.menuService.findAll();
    }

    @PostMapping("/menu")
    public Menu createMenu(@RequestBody Menu menu) {
        menuService.save(menu);
        return menu;
    }

    @GetMapping("/menus/{id}")
    public Menu findById(@PathVariable long id) {
        Optional<Menu> menu = menuService.findById(id);
        return menu.orElse(null);
    }

    @DeleteMapping("/menu/{id}")
    public void deleteById(@PathVariable long id) {
        Optional<Menu> menu = menuService.findById(id);
        if (menu.isPresent()) {
            menuService.deleteById(id);
        }
    }

    @PutMapping("/menu/menuItems/{id}")
    public Menu update(@RequestBody List<MenuItem> menuItems, @PathVariable long id) {
        Menu menu = findById(id);
        menu.setMenuItems(menuItems);
        return menuService.update(menu);
    }
}
