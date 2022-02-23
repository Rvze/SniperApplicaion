package com.nurgunmakarov.studweblab4.service.impl;

import com.nurgunmakarov.studweblab4.dto.UserDTO;
import com.nurgunmakarov.studweblab4.model.entities.Role;
import com.nurgunmakarov.studweblab4.model.entities.User;
import com.nurgunmakarov.studweblab4.repository.RoleRepository;
import com.nurgunmakarov.studweblab4.repository.UserRepository;
import com.nurgunmakarov.studweblab4.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;


    @Override
    public UserDTO register(UserDTO userDTO) {
        userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        User userEntity = UserDTO.toEntity(userDTO);
        Set<Role> roleSet = userEntity.getRoles().stream()
                .map(role -> roleRepository.findByUserRole(role.getUserRole())).collect(Collectors.toSet());
        userEntity.setRoles(roleSet);
        userEntity.setPassword(userDTO.getPassword());
        userRepository.save(userEntity);
        return UserDTO.toDTO(userEntity);
    }

    @Override
    public User findByUsername(String userName) {
        return userRepository.findByUsername(userName);
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }
}
