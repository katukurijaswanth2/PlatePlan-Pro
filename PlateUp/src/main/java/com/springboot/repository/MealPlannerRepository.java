package com.springboot.repository;

import com.springboot.entity.MealPlanner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MealPlannerRepository extends JpaRepository<MealPlanner, Long> {
}