package com.nurgunmakarov.studweblab4.network.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;

@Getter
@Setter
@ToString
public class PointRequest implements Serializable {
    private static final long serialVersionUID = -3247329898L;

    private Double x;
    private Double y;
    private Double r;
}
