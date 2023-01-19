package com.cafeteria.repositories;

import com.cafeteria.models.CafeteriaUser;
import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CafeteriaUserRepository extends JpaRepository<CafeteriaUser, String> {
}
