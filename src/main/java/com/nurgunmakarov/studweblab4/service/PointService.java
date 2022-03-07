package com.nurgunmakarov.studweblab4.service;

import com.nurgunmakarov.studweblab4.dto.PointDTO;

import java.util.List;
import java.util.Optional;

public interface PointService {
    Optional<PointDTO> save(PointDTO pointDTO);

    List<PointDTO> getPointsByUserId(Long userId);

    List<PointDTO> removePointByUserId(Long userId);
}
