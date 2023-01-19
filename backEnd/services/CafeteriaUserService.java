package com.cafeteria.services;

import com.cafeteria.models.CafeteriaUser;
import com.cafeteria.models.SimpleUser;
import com.cafeteria.repositories.CafeteriaUserRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;

@Service
public class CafeteriaUserService {

    private CafeteriaUserRepository cafeteriaUserRepository;

    public CafeteriaUserService(CafeteriaUserRepository cafeteriaUserItemRepository) {
        this.cafeteriaUserRepository = cafeteriaUserItemRepository;
    }

    public List<CafeteriaUser> findAll() {
        return this.cafeteriaUserRepository.findAll();
    }

    public void save(CafeteriaUser cafeteriaUserItem) {
        this.cafeteriaUserRepository.save(cafeteriaUserItem);
    }

    public Optional<CafeteriaUser> findById(@PathVariable String id) {
        return this.cafeteriaUserRepository.findById(id);
    }

    public void deleteById(@PathVariable String id) {
        Optional<CafeteriaUser> cafeteriaUser = cafeteriaUserRepository.findById(id);
        if (cafeteriaUser.isPresent()) {
            cafeteriaUserRepository.deleteById(id);
        }
    }

    public CafeteriaUser update(CafeteriaUser cafeteriaUser) {
        return cafeteriaUserRepository.save(cafeteriaUser);
    }

    @Scheduled(cron = "0 12 18 * * *")
    void swapMenus() {
        List<CafeteriaUser> cafeteriaUsers = findAll();
        for(CafeteriaUser cafeteriaUser : cafeteriaUsers) {
            cafeteriaUser.setTodayMenu(cafeteriaUser.getTomorrowMenu());
            cafeteriaUser.setTomorrowMenu(null);
            update(cafeteriaUser);
        }
        System.out.println("updated cafeterias");
    }
}
