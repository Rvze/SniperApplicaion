package com.nurgunmakarov.studweblab4.service.impl;

import com.nurgunmakarov.studweblab4.dto.PointDTO;
import com.nurgunmakarov.studweblab4.model.entities.Point;
import com.nurgunmakarov.studweblab4.model.entities.User;
import com.nurgunmakarov.studweblab4.repository.PointRepository;
import com.nurgunmakarov.studweblab4.repository.UserRepository;
import com.nurgunmakarov.studweblab4.service.PointService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PointServiceImpl implements PointService {

    private final PointRepository pointRepository;
    private final UserRepository userRepository;

    @Override
    public Optional<PointDTO> save(PointDTO pointDTO) {
        Optional<User> user = userRepository.findById(pointDTO.getUserId());
        if (!user.isPresent())
            return Optional.empty();
        Point point = PointDTO.toEntity(pointDTO, user.get());
        return Optional.of(PointDTO.toDTO(pointRepository.save(point)));
    }

    @Override
    public List<PointDTO> getPointsByUserId(Long userId) {
        return pointRepository.findAllByUserId(userId).stream()
                .map(PointDTO::toDTO).collect(Collectors.toList());
    }

    @Override
    public List<PointDTO> removePointByUserId(Long userId) {
        Collection<Point> points = pointRepository.deleteAllByUserId(userId);
        return points.stream().map(PointDTO::toDTO).collect(Collectors.toList());
    }
}
