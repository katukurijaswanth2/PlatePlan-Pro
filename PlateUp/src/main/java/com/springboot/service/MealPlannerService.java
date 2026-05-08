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

    public List<MealPlanner> getAllMeals() {
        return mealPlannerRepository.findAll();
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
}