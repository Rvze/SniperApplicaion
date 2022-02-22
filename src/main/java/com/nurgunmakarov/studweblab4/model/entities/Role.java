package com.nurgunmakarov.studweblab4.model.entities;

import com.nurgunmakarov.studweblab4.model.UserRole;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "roles")
@Getter
@Setter
@NoArgsConstructor
public class Role {
    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long roleId;
    @Column(name = "userRole")
    @Enumerated(EnumType.STRING)
    private UserRole userRole;

    public Role(UserRole userRole) {
        this.userRole = userRole;
    }
}
