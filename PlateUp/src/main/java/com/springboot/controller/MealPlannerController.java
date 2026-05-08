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
@CrossOrigin(origins = "http://localhost:5173") // Vite React default port
public class MealPlannerController {

    @Autowired
    private MealPlannerService mealPlannerService;

    @GetMapping
    public ResponseEntity<List<MealPlanner>> getAllMeals() {
        return ResponseEntity.ok(mealPlannerService.getAllMeals());
    }

    @PostMapping
    public ResponseEntity<MealPlanner> saveMeal(@RequestBody MealPlanner meal) {
        return ResponseEntity.status(HttpStatus.CREATED).body(mealPlannerService.saveMeal(meal));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMeal(@PathVariable Long id) {
        mealPlannerService.deleteMeal(id);
        return ResponseEntity.ok("Meal with id " + id + " deleted successfully.");
    }
}