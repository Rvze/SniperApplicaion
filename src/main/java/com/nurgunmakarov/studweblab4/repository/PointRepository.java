package com.nurgunmakarov.studweblab4.repository;

import com.nurgunmakarov.studweblab4.model.entities.Point;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;
import java.util.Collection;

public interface PointRepository extends JpaRepository<Point, Long> {
    Collection<Point> findAllByUserId(Long userId);

    @Transactional
    Collection<Point> deleteAllByUserId(Long userId);
}
