package com.springboot.repository;

import com.springboot.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Checks if an email already exists — used before saving to avoid duplicates
    boolean existsByEmail(String email);

    // Finds a user by email — useful later for login/authentication
    Optional<User> findByEmail(String email);
}