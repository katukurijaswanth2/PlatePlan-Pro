package com.springboot.service;

import com.springboot.entity.User;
import com.springboot.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // ─── Signup ─────────────────────────────────────────────────────

    public User signup(String firstName, String lastName, String email, String password) {

        // 1. Check if email is already registered
        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Email already exists: " + email);
        }

        // 2. Build the User object with plain password
        User newUser = new User(firstName, lastName, email, password);

        // 3. Save to DB and return the saved user
        return userRepository.save(newUser);
    }

    // ─── Find by Email (useful for login later) ──────────────────────

    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
    }

    // ─── Find by ID ──────────────────────────────────────────────────

    public User findById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }
}