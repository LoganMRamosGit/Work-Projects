package com.example.realestatecrm;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import org.hibernate.annotations.NotFound;
import org.springframework.data.repository.NoRepositoryBean;

@Entity
@Table(name = "clients")
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank
    private String name;
    @NotBlank
    private String email;
    private String phone;

    @Enumerated(EnumType.STRING)
    private ClientStage stage;

    private String budgetRange;

    @Column(columnDefinition = "TEXT")
    private String notes;

    protected Client(){

    }

    public Client( String name, String email, String phone, ClientStage stage,
                  String budgetRange, String notes){

        this.name=name;
        this.email=email;
        this.phone=phone;
        this.stage=stage;
        this.budgetRange = budgetRange;
        this.notes=notes;
    }
    public Long getId(){
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }

    public String getBudgetRange() {
        return budgetRange;
    }

    public String getNotes() {
        return notes;
    }

    public ClientStage getStage(){
        return stage;
    }
    public void setStage(ClientStage stage){
        this.stage=stage;
    }

    public void setName(String name) {
        this.name = name;
    }
    public void setEmail(String email){
        this.email=email;
    }
    public void setPhone(String phone){
        this.phone=phone;
    }
    public void setBudgetRange(String budgetRange){
        this.budgetRange = budgetRange;
    }
    public void setNotes(String notes){
        this.notes = notes;
    }
}
