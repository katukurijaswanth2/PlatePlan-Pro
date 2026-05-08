package com.springboot.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

@Entity
@Table(name = "meal_planner")
public class MealPlanner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "item_name", nullable = false)
//    in the last project i use the same column name and the key name. but here i want to use the different names so i use this method
    @JsonProperty("name")
    private String itemName;
//By default, when you declare a String field in JPA, Hibernate maps it to VARCHAR(255) in the database —
// meaning it can only hold up to 255 characters.
//    But a YouTube link or Image URL can sometimes be longer than 255 characters,
//    so you use columnDefinition = "TEXT" to override that:
// Now it can hold very long strings (65,535 characters)
    @Column(name = "youtube_link", columnDefinition = "TEXT")
    @JsonProperty("youtube")
    private String youtubeLink;

    @Column(name = "image_url", columnDefinition = "TEXT")
    @JsonProperty("image")
    private String imageUrl;

    // ─── Constructors ───────────────────────────────────────────────

    public MealPlanner() {}

    public MealPlanner(String itemName, String youtubeLink, String imageUrl) {
        this.itemName = itemName;
        this.youtubeLink = youtubeLink;
        this.imageUrl = imageUrl;
    }

    // ─── Getters & Setters ──────────────────────────────────────────

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getItemName() { return itemName; }
    public void setItemName(String itemName) { this.itemName = itemName; }

    public String getYoutubeLink() { return youtubeLink; }
    public void setYoutubeLink(String youtubeLink) { this.youtubeLink = youtubeLink; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    @Override
    public String toString() {
        return "MealPlanner{" +
                "id=" + id +
                ", itemName='" + itemName + '\'' +
                ", youtubeLink='" + youtubeLink + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                '}';
    }
}