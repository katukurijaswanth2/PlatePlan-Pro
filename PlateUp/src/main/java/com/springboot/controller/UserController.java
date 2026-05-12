package com.springboot.controller;

import com.springboot.entity.User;
import com.springboot.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

// @RestController means this class will handle HTTP requests and send back data (JSON)
@RestController

// @RequestMapping means all URLs in this class start with /api/auth
// So signup will be --> http://localhost:8080/api/auth/signup
@RequestMapping("/api/auth")

// @CrossOrigin allows your React app (running on port 3000) to talk to this Spring Boot app (running on port 8080)
// Without this, the browser will block the request due to CORS policy
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    // @Autowired tells Spring Boot to automatically create and inject the UserService for us
    // We don't need to write "new UserService()" manually
    @Autowired
    private UserService userService;

    // ─── Signup ─────────────────────────────────────────────────────

    // @PostMapping means this method runs when a POST request is sent to /api/auth/signup
    // POST is used when we want to SEND data (like a signup form) to the server
    @PostMapping("/signup")
    public String signup(@RequestBody User user) {
        // @RequestBody means Spring Boot will automatically take the JSON sent from React
        // and convert it into a User object for us

        // We call the signup method in UserService and pass the user details
        userService.signup(
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getPassword()
        );

        // After saving, we send a simple success message back to React
        return "User registered successfully!";
    }

    // ─── Get User by ID ─────────────────────────────────────────────

    // @GetMapping means this method runs when a GET request is sent to /api/auth/user/1
    // GET is used when we want to FETCH/READ data from the server
    // {id} is a variable in the URL — it will be replaced by the actual id number
    @GetMapping("/user/{id}")
    public User getUserById(@PathVariable Long id) {
        // @PathVariable takes the {id} from the URL and gives it to this method
        // Example: /api/auth/user/5 --> id = 5

        // We call findById from UserService and return the User object
        // Spring Boot will automatically convert it to JSON and send it back
        return userService.findById(id);
    }

    // ─── Get User by Email ───────────────────────────────────────────

    // @GetMapping for /api/auth/user?email=john@gmail.com
    // The ?email= part is called a Query Parameter
    @GetMapping("/user")
    public User getUserByEmail(@RequestParam String email) {
        // @RequestParam reads the value after ?email= in the URL
        // Example: /api/auth/user?email=john@gmail.com --> email = "john@gmail.com"

        return userService.findByEmail(email);
    }
}