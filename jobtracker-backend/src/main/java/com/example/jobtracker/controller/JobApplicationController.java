package com.example.jobtracker.controller;

import com.example.jobtracker.model.JobApplication;
import com.example.jobtracker.service.JobApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin  // Allows requests from your frontend (adjust as needed)
public class JobApplicationController {

    @Autowired
    private JobApplicationService service;

    // Get all applications (with optional filters for company and status)
    @GetMapping
    public List<JobApplication> getAllApplications(@RequestParam(required = false) String company,
                                                   @RequestParam(required = false) String status) {
        List<JobApplication> applications = service.getAllApplications();

        if (company != null) {
            applications.removeIf(app -> !app.getCompanyName().equalsIgnoreCase(company));
        }
        if (status != null) {
            applications.removeIf(app -> !app.getStatus().equalsIgnoreCase(status));
        }
        return applications;
    }

    // Get a single application by id
    @GetMapping("/{id}")
    public JobApplication getApplicationById(@PathVariable Long id) {
        return service.getApplicationById(id)
            .orElseThrow(() -> new RuntimeException("Application not found with id " + id));
    }

    // Create a new application
    @PostMapping
    public JobApplication createApplication(@RequestBody JobApplication application) {
        return service.createApplication(application);
    }

    // Update an existing application
    @PutMapping("/{id}")
    public JobApplication updateApplication(@PathVariable Long id, @RequestBody JobApplication applicationDetails) {
        return service.updateApplication(id, applicationDetails);
    }

    // Delete an application
    @DeleteMapping("/{id}")
    public String deleteApplication(@PathVariable Long id) {
        service.deleteApplication(id);
        return "Application with id " + id + " deleted successfully.";
    }
}
