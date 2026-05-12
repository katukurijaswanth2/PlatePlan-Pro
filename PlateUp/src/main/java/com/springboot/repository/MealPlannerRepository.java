package com.springboot.repository;
import java.util.*;
import com.springboot.entity.MealPlanner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MealPlannerRepository extends JpaRepository<MealPlanner, Long> {
    // Checks if a meal with this name already exists (for duplicate check)
    boolean existsByItemName(String itemName);

    //  Fetches only the meals that belong to a specific user
    List<MealPlanner> findByUserId(Long userId);

}