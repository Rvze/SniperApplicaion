package com.nurgunmakarov.studweblab4.controller;

import com.nurgunmakarov.studweblab4.dto.PointDTO;
import com.nurgunmakarov.studweblab4.exception.ValidationException;
import com.nurgunmakarov.studweblab4.model.entities.Point;
import com.nurgunmakarov.studweblab4.model.entities.User;
import com.nurgunmakarov.studweblab4.network.request.PointRequest;
import com.nurgunmakarov.studweblab4.security.userDetails.JwtUserDetails;
import com.nurgunmakarov.studweblab4.service.PointService;
import com.nurgunmakarov.studweblab4.service.UserService;
import com.nurgunmakarov.studweblab4.validation.PointValidator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/weblab4/points")
@CrossOrigin
@Slf4j
public class TestPointController {
    private final PointService pointService;
    private final PointValidator pointValidator;
    private final UserService userService;

    @Autowired
    public TestPointController(PointService pointService, PointValidator pointValidator,
                               UserService userService) {
        this.pointService = pointService;
        this.pointValidator = pointValidator;
        this.userService = userService;
    }

    @PostMapping("/check")
    public ResponseEntity<?> check(@RequestBody PointRequest pointRequest) {
        Point point = new Point(pointRequest.getX(), pointRequest.getY(), pointRequest.getR());
        log.warn(String.valueOf(point.getId()));
        try {
            Long userId = ((JwtUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
            User user = userService.findById(userId);
            point.setUser(user);
            pointValidator.check(pointRequest);
            point.setHit(point.isAreaHit());
            return ResponseEntity.ok(pointService.save(PointDTO.toDTO(point)));
        } catch (ValidationException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @GetMapping("/clear")
    public ResponseEntity<?> clear() {
        try {
            Long userId = ((JwtUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
            return ResponseEntity.ok().body(pointService.removePointByUserId(userId));
        } catch (ClassCastException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied!");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    @GetMapping("/getAll")
    public ResponseEntity<?> getAll() {
        try {
            Long userId = ((JwtUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
            Collection<PointDTO> points = pointService.getPointsByUserId(userId);
            return ResponseEntity.ok().body(points);
        } catch (ClassCastException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }
}
