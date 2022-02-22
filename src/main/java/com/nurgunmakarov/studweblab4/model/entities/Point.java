package com.nurgunmakarov.studweblab4.model.entities;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;

@Entity
@NoArgsConstructor
@Table(name = "points")
@Getter
@Setter
public class Point {
    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "x")
    private double x;

    @Column(name = "y")
    private double y;

    @Column(name = "r")
    private double r;

    @Column(name = "hit")
    private boolean hit;

    @Column(name = "local_date")
    private LocalDateTime localDateTime;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    public Point(double x, double y, double r, User user) {
        this.x = x;
        this.y = y;
        this.r = r;
        hit = isAreaHit();
        this.user = user;
        localDateTime = ZonedDateTime.now(ZoneOffset.UTC).plusMinutes(180).toLocalDateTime();
    }

    public boolean isAreaHit() {
        return (x >= 0 && y <= 0 && y >= x - r / 2) ||
                (x <= 0 && y >= 0 && x * x + y * y <= r / 2 * r / 2) ||
                (x >= 0 && y >= 0 && y <= r && x <= r);
    }
}
