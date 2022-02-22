package com.nurgunmakarov.studweblab4.controller;

import com.nurgunmakarov.studweblab4.model.entities.User;
import com.nurgunmakarov.studweblab4.repository.UserRepository;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping()
@Getter
public class MainController {
    private static final Logger logger = LogManager.getLogger(MainController.class);

    UserRepository userRepository;

    @Autowired
    public MainController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @RequestMapping(value = {"/", "/greeting"}, method = RequestMethod.GET)
    public String greeting() {
        logger.info("/");
        return "greeting";
    }

    @PostMapping("/register")
    public String register(@RequestParam String username,
                           @RequestParam String password,
                           @RequestParam Long id,
                           @ModelAttribute("user") User user,
                           Model model) {
        logger.info("/register");
        user = new User(id, username, password);
        userRepository.save(user);
        return "register";
    }

    @GetMapping("register")
    public String register(Model model) {
        User user = new User();
        model.addAttribute(user);
        return "register";
    }

    @GetMapping("/main")
    public String account() {
        return "userList";
    }

    @RequestMapping(value = "/redirect", method = RequestMethod.GET)
    public String redirect() {
        logger.info("redirect");
        return "register";
    }
}
