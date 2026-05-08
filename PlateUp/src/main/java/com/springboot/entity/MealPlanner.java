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
    @JsonProperty("name")
    private String itemName;

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