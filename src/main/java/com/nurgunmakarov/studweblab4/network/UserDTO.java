package com.nurgunmakarov.studweblab4.pojo;

import com.nurgunmakarov.studweblab4.model.UserRole;
import com.nurgunmakarov.studweblab4.model.entities.Role;
import com.nurgunmakarov.studweblab4.model.entities.User;
import lombok.*;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private Long id;
    private String username;
    private String password;
    public Set<UserRole> roleSet;

    public UserDTO(String username, String password) {
        this.username = username;
        this.password = password;
        this.roleSet = new HashSet<>();
    }

    public static User toEntity(UserDTO userDTO) {
        User user = new User();
        user.setId(userDTO.id);
        user.setUsername(userDTO.username);
        user.setPassword(userDTO.password);
        Set<Role> roles = userDTO.getRoleSet().stream().map(Role::new).collect(Collectors.toSet());
        user.setRoles(roles);
        return user;
    }

    public static UserDTO toDTO(User userEntity) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(userEntity.getId());
        userDTO.setUsername(userEntity.getUsername());
        userDTO.setPassword(userEntity.getPassword());
        userDTO.setRoleSet(userEntity.getRoles().stream().map(Role::getUserRole).collect(Collectors.toSet()));
        return userDTO;
    }

}
