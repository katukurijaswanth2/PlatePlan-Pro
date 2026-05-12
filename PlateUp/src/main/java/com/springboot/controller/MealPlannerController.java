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

    //    getMealsByUser(userId) instead of getAllMeals()
    // GET /api/meals?userId=1 → returns only that user's meals
    // CHANGED: added @RequestParam Long userId so each user sees only their own meals

// About GetMapping public List<MealPlanner> getAllMeals()
//                  {
//    return mealPlannerRepository.findAll();
//                 }
//Here you are only returning the data.
// Spring Boot will automatically attach a 200 OK status code every time — even if the list is empty,
// even if the user is not logged in, even if something went wrong.
// React has no way to tell the difference between a successful response and a failed one,
// because the status code is always the same.
    // POST - save a meal (with duplicate check)
    // No change here — userId comes inside the request body from React
    @GetMapping
    public ResponseEntity<List<MealPlanner>> getAllMeals(@RequestParam Long userId) {
        List<MealPlanner> meals = mealPlannerService.getMealsByUser(userId);
        return ResponseEntity.ok(meals);
    }
//    Here you are returning the data wrapped inside a ResponseEntity.
//    Now you are in full control. You can send 200 OK when everything works,
//    404 Not Found when a meal doesn't exist, 409 Conflict when a duplicate is detected, and
//    401 Unauthorized when the user is not logged in.
//    React reads that status code and knows exactly what happened on the server — success, error, or conflict —
//    and can show the right message to the user accordingly.


    @PostMapping
    public ResponseEntity<String> saveMeal(@RequestBody MealPlanner meal) {

        // Step 1: Check if a meal with the same name already exists
        boolean alreadyExists = mealPlannerService.existsByName(meal.getItemName());

        // Step 2: If it exists, reject the request
        if (alreadyExists) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Meal already saved in planner!");
        }

        // Step 3: If it doesn't exist, save it
        // meal.getUserId() is automatically set from the JSON body sent by React
        mealPlannerService.saveMeal(meal);
        return ResponseEntity.status(HttpStatus.CREATED).body("Meal saved successfully!");
    }

    // DELETE - remove a meal by id
    // No change here
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMeal(@PathVariable Long id) {
        mealPlannerService.deleteMeal(id);
        return ResponseEntity.ok("Meal with id " + id + " deleted successfully.");
    }
}