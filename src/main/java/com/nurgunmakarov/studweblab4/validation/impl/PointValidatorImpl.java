package com.nurgunmakarov.studweblab4.validation.impl;

import com.nurgunmakarov.studweblab4.network.request.PointRequest;
import com.nurgunmakarov.studweblab4.validation.PointValidator;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PointValidatorImpl implements PointValidator {
    @Override
    public Optional<String> check(PointRequest request) {
        if (checkX(request.getX()).isPresent())
            return checkX(request.getX());
        if (checkY(request.getY()).isPresent())
            return checkY(request.getY());
        if (checkR(request.getR()).isPresent())
            return checkR(request.getR());
        return Optional.empty();
    }

    @Override
    public Optional<String> checkX(Double x) {
        if (x < -5 || x > 5 || x.isNaN())
            Optional.of("'X' must be number on range[-5;5]");
        return Optional.empty();
    }

    @Override
    public Optional<String> checkY(Double y) {
        if (y < -3 || y > 5 || y.isNaN())
            Optional.of("'Y' must be a number on range [-3;5]");
        return Optional.empty();
    }

    @Override
    public Optional<String> checkR(Double r) {
        if (r < 1 || r > 5 || r.isNaN())
            Optional.of("'R' must be a number on range [1;5]");
        return Optional.empty();
    }
}
