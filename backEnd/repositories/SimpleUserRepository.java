package com.cafeteria.repositories;

import com.cafeteria.models.SimpleUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SimpleUserRepository extends JpaRepository<SimpleUser, String> {
}
