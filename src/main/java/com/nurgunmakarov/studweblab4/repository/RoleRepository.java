package com.nurgunmakarov.studweblab4.repository;

import com.nurgunmakarov.studweblab4.model.UserRole;
import com.nurgunmakarov.studweblab4.model.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByUserRole(UserRole roleName);
}
