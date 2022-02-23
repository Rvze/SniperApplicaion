package com.nurgunmakarov.studweblab4.validation;

import com.nurgunmakarov.studweblab4.network.request.PointRequest;

import java.util.Optional;

public interface PointValidator {
    Optional<String> check(PointRequest request);

    Optional<String> checkX(Double x);

    Optional<String> checkY(Double y);

    Optional<String> checkR(Double r);
}
