package com.cafeteria.services;

import com.cafeteria.models.Menu;
import com.cafeteria.repositories.MenuRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;

@Service
public class MenuService {

    private MenuRepository menuRepository;

    public MenuService(MenuRepository menuItemRepository) {
        this.menuRepository = menuItemRepository;
    }

    public List<Menu> findAll() {
        return this.menuRepository.findAll();
    }

    public void save(Menu menuItem) {
        this.menuRepository.save(menuItem);
    }

    public Optional<Menu> findById(@PathVariable long id) {
        return this.menuRepository.findById(id);
    }

    public void deleteById(@PathVariable long id) {
        Optional<Menu> menu = menuRepository.findById(id);
        if (menu.isPresent()) {
            menuRepository.deleteById(id);
        }
    }

    public Menu update(Menu menu) {
        return menuRepository.save(menu);
    }
}
