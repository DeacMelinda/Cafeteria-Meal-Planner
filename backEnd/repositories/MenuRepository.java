package com.cafeteria.repositories;

import com.cafeteria.models.Menu;
import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.repository.CrudRepository;

public interface MenuRepository extends JpaRepository<Menu, Long> {
}
