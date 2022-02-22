package com.nurgunmakarov.studweblab4.network.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
public class MessageResponse implements Serializable {
    private static final long serialVersionUID = -5352452142657L;
    private String message;
}
