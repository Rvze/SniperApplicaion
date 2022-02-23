package com.nurgunmakarov.studweblab4.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class PointDTO {
    private long id;
    private Long userId;
    private double x;
    private double y;
    private double r;
    private boolean hit;
    private LocalDateTime localDateTime;
}
