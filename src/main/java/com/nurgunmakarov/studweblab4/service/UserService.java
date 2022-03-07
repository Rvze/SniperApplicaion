package com.nurgunmakarov.studweblab4.service;

import com.nurgunmakarov.studweblab4.dto.UserDTO;
import com.nurgunmakarov.studweblab4.model.entities.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    UserDTO register(UserDTO userDTO);

    Optional<User> findByUsername(String userName);

    List<User> findAll();

    User findById(Long id);
}
