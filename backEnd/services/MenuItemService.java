package com.cafeteria.services;

import com.cafeteria.models.CafeteriaUser;
import com.cafeteria.models.MenuItem;
import com.cafeteria.repositories.MenuItemRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;

@Service
public class MenuItemService {

    private MenuItemRepository menuItemRepository;
    private CafeteriaUserService cafeteriaUserService;

    public MenuItemService(MenuItemRepository menuItemRepository) {
        this.menuItemRepository = menuItemRepository;
    }

    public List<MenuItem> findAll() {
        return this.menuItemRepository.findAll();
    }

    public void save(MenuItem menuItem) {
        this.menuItemRepository.save(menuItem);
    }

    public Optional<MenuItem> findById(@PathVariable long id) {
        return this.menuItemRepository.findById(id);
    }

    public void deleteById(@PathVariable long id) {
        Optional<MenuItem> menuItem = menuItemRepository.findById(id);
        if (menuItem.isPresent()) {
            menuItemRepository.deleteById(id);
        }
    }

    public MenuItem update(MenuItem menuItem) { return menuItemRepository.save(menuItem); }

    @Scheduled(cron = "0 13 18 * * *")
    void resetOrders() {
        List<CafeteriaUser> cafeterias = cafeteriaUserService.findAll();
        List<MenuItem> menuItems = findAll();
        for(MenuItem menuItem : menuItems) {
            boolean contained = false;
            for(CafeteriaUser cafeteriaUser : cafeterias) {
                if(cafeteriaUser.getTodayMenu().getMenuItems().contains(menuItem)) {
                    menuItem.setOrders(menuItem.getOrders());
                    contained = true;
                    break;
                }
            }
            if(!contained) {
                menuItem.setOrders(0);
            }
            update(menuItem);
        }
        System.out.println("Updated menuItems");
    }
}
