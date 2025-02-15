package com.example.jobtracker.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class JobApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String companyName;
    private String role;
    private LocalDate appliedDate;
    private String status; // e.g., "Pending", "Interview Scheduled", "Rejected", "Hired"

    // Optional fields:
    private LocalDate interviewDate;
    private String notes;

    public JobApplication() {
    }

    public JobApplication(String companyName, String role, LocalDate appliedDate, String status, LocalDate interviewDate, String notes) {
        this.companyName = companyName;
        this.role = role;
        this.appliedDate = appliedDate;
        this.status = status;
        this.interviewDate = interviewDate;
        this.notes = notes;
    }

    // Getters and setters

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getCompanyName() {
        return companyName;
    }
    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getRole() {
        return role;
    }
    public void setRole(String role) {
        this.role = role;
    }

    public LocalDate getAppliedDate() {
        return appliedDate;
    }
    public void setAppliedDate(LocalDate appliedDate) {
        this.appliedDate = appliedDate;
    }

    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDate getInterviewDate() {
        return interviewDate;
    }
    public void setInterviewDate(LocalDate interviewDate) {
        this.interviewDate = interviewDate;
    }

    public String getNotes() {
        return notes;
    }
    public void setNotes(String notes) {
        this.notes = notes;
    }
}
