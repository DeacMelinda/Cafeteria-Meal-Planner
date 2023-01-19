package com.cafeteria.services;

import com.cafeteria.models.SimpleUser;
import com.cafeteria.repositories.SimpleUserRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;

@Service
public class SimpleUserService {

    private SimpleUserRepository simpleUserRepository;

    public SimpleUserService(SimpleUserRepository simpleUserItemRepository) {
        this.simpleUserRepository = simpleUserItemRepository;
    }

    public List<SimpleUser> findAll() {
        return this.simpleUserRepository.findAll();
    }

    public void save(SimpleUser simpleUserItem) {
        this.simpleUserRepository.save(simpleUserItem);
    }

    public Optional<SimpleUser> findById(@PathVariable String id) {
        return this.simpleUserRepository.findById(id);
    }

    public void deleteById(@PathVariable String id) {
        Optional<SimpleUser> simpleUser = simpleUserRepository.findById(id);
        if (simpleUser.isPresent()) {
            simpleUserRepository.deleteById(id);
        }
    }

    public SimpleUser update(SimpleUser simpleUser) {
        return simpleUserRepository.save(simpleUser);
    }

    @Scheduled(cron = "0 12 18 * * *")
    public void resetSends() {
        List<SimpleUser> users = findAll();
        for(SimpleUser user : users) {
            user.setSentToday(false);
            update(user);
        }
        System.out.println("Updated the users");
    }
}
