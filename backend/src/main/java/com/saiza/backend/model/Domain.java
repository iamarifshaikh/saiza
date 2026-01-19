package com.saiza.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "domains")
public class Domain {
    @Id
    private String id; // e.g., "computer", "it"
    private String title;
    private String description;

    // UI Metadata
    private String iconName; // e.g., "Cpu", "Globe"
    private String colorClass; // e.g., "text-blue-400"
    private String bgClass; // e.g., "bg-blue-500/10"
    private String courseType; // 'engineering' or 'diploma'

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getIconName() {
        return iconName;
    }

    public void setIconName(String iconName) {
        this.iconName = iconName;
    }

    public String getColorClass() {
        return colorClass;
    }

    public void setColorClass(String colorClass) {
        this.colorClass = colorClass;
    }

    public String getBgClass() {
        return bgClass;
    }

    public void setBgClass(String bgClass) {
        this.bgClass = bgClass;
    }

    public String getCourseType() {
        return courseType;
    }

    public void setCourseType(String courseType) {
        this.courseType = courseType;
    }
}
