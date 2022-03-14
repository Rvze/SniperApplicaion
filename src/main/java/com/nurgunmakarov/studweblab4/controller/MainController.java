package com.nurgunmakarov.studweblab4.controller;

import lombok.Getter;
import org.springframework.stereotype.Controller;

import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping()
@Getter
public class MainController {

    @RequestMapping(value = "/")
    public String index() {
        return "index";
    }
}
