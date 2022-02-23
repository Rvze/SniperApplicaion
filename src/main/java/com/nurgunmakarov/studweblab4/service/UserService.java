package com.nurgunmakarov.studweblab4.service;

import com.nurgunmakarov.studweblab4.dto.UserDTO;
import com.nurgunmakarov.studweblab4.model.entities.User;

import java.util.List;

public interface UserService {
    UserDTO register(UserDTO userDTO);

    User findByUsername(String userName);

    List<User> findAll();
}
