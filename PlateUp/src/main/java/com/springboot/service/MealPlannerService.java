package com.springboot.service;

import com.springboot.entity.MealPlanner;
import com.springboot.repository.MealPlannerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MealPlannerService {

    @Autowired
    private MealPlannerRepository mealPlannerRepository;
//returns all the records in the database which we dont want.
//    public List<MealPlanner> getAllMeals() {
//        return mealPlannerRepository.findAll();
//    }
//   only return meals for the requesting user:
public List<MealPlanner> getMealsByUser(Long userId) {
    return mealPlannerRepository.findByUserId(userId);
}
    public MealPlanner saveMeal(MealPlanner meal) {
        return mealPlannerRepository.save(meal);
    }

    public void deleteMeal(Long id) {
        if (!mealPlannerRepository.existsById(id)) {
            throw new RuntimeException("Meal not found with id: " + id);
        }
        mealPlannerRepository.deleteById(id);
    }

    public boolean existsByName(String name) {
        return mealPlannerRepository.existsByItemName(name);
    }
}