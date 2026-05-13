package com.springboot.controller;
import com.springboot.entity.User;
import com.springboot.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
    @Autowired
    private UserService userService;
    // POST /api/auth/signup  → registers a new user
    // UserService already checks for duplicate emails and throws if found
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody User user) {
        try {
            userService.signup(
                    user.getFirstName(),
                    user.getLastName(),
                    user.getEmail(),
                    user.getPassword()
            );
            return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully!");
        } catch (RuntimeException e) {
            // Email already exists
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }
    // POST /api/auth/login  → returns the full User object (including id) on success
    // React should save the returned id in localStorage as "userId"
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        try {
            User found = userService.findByEmail(user.getEmail());
            if (found.getPassword().equals(user.getPassword())) {
                // Return the user object so React gets the id, name, email etc.
                return ResponseEntity.ok(found);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect password");
            }
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No account found with that email");
        }
    }
    // GET /api/auth/user/1  → fetch a user by their id
    @GetMapping("/user/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.findById(id);
    }
    // GET /api/auth/user?email=jaswanthkatukuri2@gmail.com  → fetch a user by email
    @GetMapping("/user")
    public User getUserByEmail(@RequestParam String email) {
        return userService.findByEmail(email);
    }
}