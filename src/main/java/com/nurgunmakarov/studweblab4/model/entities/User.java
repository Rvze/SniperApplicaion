package com.nurgunmakarov.studweblab4.model.entities;

import com.nurgunmakarov.studweblab4.model.UserRole;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Collection;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "user", schema = "public")
public class User {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String password;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_roles",
    joinColumns = @JoinColumn(
            name = "user_id",
            referencedColumnName = "id"
    ), inverseJoinColumns = @JoinColumn(
            name = "role_id",
            referencedColumnName = "id"
    ))
    @Column(name = "roles")
    private Collection <Role> roles;

    public User(Long id, String username, String password) {
        this.id = id;
        this.username = username;
        this.password = password;
    }

    public User() {

    }
}
