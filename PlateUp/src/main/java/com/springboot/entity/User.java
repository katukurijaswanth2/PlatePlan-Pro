package com.springboot.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name", nullable = false, length = 100)
    @JsonProperty("firstName")  // React sends "firstName" → maps to this field
    private String firstName;

    @Column(name = "last_name", nullable = false, length = 100)
    @JsonProperty("lastName")   // React sends "lastName" → maps to this field
    private String lastName;

    @Column(name = "email", nullable = false, unique = true, length = 255)
    @JsonProperty("email")      // React sends "email" → maps to this field
    private String email;

    @Column(name = "password", nullable = false, length = 255)
    @JsonProperty("password")   // ✅ FIXED — React sends "password" → now maps correctly
    // Without this, password was arriving as null
    // null + nullable=false = 500 Internal Server Error
    private String password;

    // ─── Constructors ───────────────────────────────────────────────

    public User() {}

    public User(String firstName, String lastName, String email, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }

    // ─── Getters & Setters ──────────────────────────────────────────

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    // ─── toString ───────────────────────────────────────────────────

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}