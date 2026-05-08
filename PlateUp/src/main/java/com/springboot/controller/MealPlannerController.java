package com.springboot.controller;

import com.springboot.entity.MealPlanner;
import com.springboot.service.MealPlannerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/meals")
@CrossOrigin(origins = "http://localhost:5173")
public class MealPlannerController {

    @Autowired
    private MealPlannerService mealPlannerService;

    // GET all meals from the database
    @GetMapping
    public ResponseEntity<List<MealPlanner>> getAllMeals() {
        List<MealPlanner> meals = mealPlannerService.getAllMeals();
        return ResponseEntity.ok(meals);
    }

    // POST - save a meal (with duplicate check)
    @PostMapping
    public ResponseEntity<String> saveMeal(@RequestBody MealPlanner meal) {

        // Step 1: Check if a meal with the same name already exists
        boolean alreadyExists = mealPlannerService.existsByName(meal.getItemName());

        // Step 2: If it exists, reject the request
        if (alreadyExists) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Meal already saved in planner!");
        }
else{
        // Step 3: If it doesn't exist, save it
        mealPlannerService.saveMeal(meal);
        return ResponseEntity.status(HttpStatus.CREATED).body("Meal saved successfully!");
    }}

    // DELETE - remove a meal by id
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMeal(@PathVariable Long id) {
        mealPlannerService.deleteMeal(id);
        return ResponseEntity.ok("Meal with id " + id + " deleted successfully.");
    }
}