package com.nurgunmakarov.studweblab4.repository;

import com.nurgunmakarov.studweblab4.model.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String name);


}
