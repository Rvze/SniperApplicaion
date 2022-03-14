package com.nurgunmakarov.studweblab4.dto;

import com.nurgunmakarov.studweblab4.model.entities.Point;
import com.nurgunmakarov.studweblab4.model.entities.User;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class PointDTO {
    private Long id;
    private Long userId;
    private double x;
    private double y;
    private double r;
    private boolean hit;
    private LocalDateTime localDateTime;

    public static Point toEntity(PointDTO pointDTO, User user) {
        Point point = new Point();
        point.setX(pointDTO.x);
        point.setY(pointDTO.getY());
        point.setR(pointDTO.getR());
        point.setHit(pointDTO.isHit());
        point.setLocalDateTime(pointDTO.getLocalDateTime());
        point.setUser(user);
        return point;
    }

    public static PointDTO toDTO(Point point) {
        PointDTO pointDTO = new PointDTO();
        pointDTO.setX(point.getX());
        pointDTO.setY(point.getY());
        pointDTO.setR(point.getR());
        pointDTO.setHit(point.isHit());
        pointDTO.setLocalDateTime(point.getLocalDateTime());
        pointDTO.setUserId(point.getUser().getId());
        pointDTO.setId(point.getId());
        return pointDTO;

    }


}
