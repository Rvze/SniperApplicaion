package com.nurgunmakarov.studweblab4.model.entities;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "tokens")
@Getter
@Setter
@NoArgsConstructor
public class RefreshToken {

    @Id
    @Column(name = "refresh_token", nullable = false, unique = true)
    private String refreshToken;

    @OneToOne
    @JoinColumn(name = "id", referencedColumnName = "id", unique = true)
    private User user;
}
