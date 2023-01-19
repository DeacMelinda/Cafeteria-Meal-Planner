package com.cafeteria.models;

import org.springframework.scheduling.annotation.Scheduled;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "CafeteriaUser")
public class CafeteriaUser extends User{

    @Column(name = "CafeteriaName")
    private String cafeteriaName;

    @Column(name = "City")
    @Enumerated(EnumType.STRING)
    private City city;

    @Column(name = "Address")
    private String address;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "todayMenu_id", referencedColumnName = "menuID")
    private Menu todayMenu;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "tomorrowMenu_id", referencedColumnName = "menuID")
    private Menu tomorrowMenu;

    @Column(name = "PhoneNumber")
    private String phoneNumber;

    @Column(name = "Program")
    private String program;

    @Column(name = "Description")
    private String description;

    public CafeteriaUser(String username, String password, String email, String cafeteriaName, String city, String address, Menu todayMenu, Menu tomorrowMenu, String phoneNumber, String program, String description) {
        super(username, password, email);
        this.cafeteriaName = cafeteriaName;
        this.city = City.valueOf(city);
        this.address = address;
        this.todayMenu = todayMenu;
        this.tomorrowMenu = tomorrowMenu;
        this.phoneNumber = phoneNumber;
        this.program = program;
        this.description = description;
    }

    public String getProgram() {
        return program;
    }

    public void setProgram(String program) {
        this.program = program;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCafeteriaName() {
        return cafeteriaName;
    }

    public void setCafeteriaName(String cafeteriaName) {
        this.cafeteriaName = cafeteriaName;
    }

    public void setCity(String city) {
        this.city = City.valueOf(city);
    }

    public String getCity() {
        return String.valueOf(this.city);
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Menu getTodayMenu() {
        return this.todayMenu;
    }

    public void setTodayMenu(Menu todayMenu) {
        this.todayMenu = todayMenu;
    }

    public Menu getTomorrowMenu() {
        return this.tomorrowMenu;
    }

    public void setTomorrowMenu(Menu tomorrowMenu) {
        this.tomorrowMenu = tomorrowMenu;
    }

    public void addTomorrowMenuItem(MenuItem menuItem) {
        this.tomorrowMenu.addMenuItem(menuItem);
    }

    public void removeTomorrowMenuItem(MenuItem menuItem) {
        this.tomorrowMenu.removeMenuItem(menuItem);
    }

    public CafeteriaUser(){}

    public CafeteriaUser(String username, String password, String email, String profilePicture, String cafeteriaName, String city, String address, Menu todayMenu, Menu tomorrowMenu, String phoneNumber) {
        super(username, password, email, profilePicture);
        this.cafeteriaName = cafeteriaName;
        this.city = City.valueOf(city);
        this.address = address;
        this.todayMenu = todayMenu;
        this.tomorrowMenu = tomorrowMenu;
        this.phoneNumber = phoneNumber;
        this.description = "";
        this.program = "";
    }

    public CafeteriaUser(String username, String password, String email, String profilePicture, String cafeteriaName, String city, String address, String phoneNumber) {
        super(username, password, email, profilePicture);
        this.cafeteriaName = cafeteriaName;
        this.city = City.valueOf(city);
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.todayMenu = null;
        this.tomorrowMenu = null;
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.getUsername(), super.getEmail(), super.getPasswordEnc(), getProfilePicture(), cafeteriaName, city, address, todayMenu, tomorrowMenu, phoneNumber);
    }

    @Override
    public boolean equals(Object obj) {
        CafeteriaUser user = (CafeteriaUser) obj;
        return super.equals(obj) && (
                Objects.equals(cafeteriaName, user.getCafeteriaName()) &&
                        Objects.equals(city, user.getCity()) &&
                        Objects.equals(address, user.getAddress()) &&
                        Objects.equals(program, user.getProgram()) &&
                        Objects.equals(description, user.getDescription()) &&
                        Objects.equals(phoneNumber, user.getPhoneNumber()));
    }

    @Override
    public String toString() {
        return "User{"+"username='"+super.getUsername()+"', email='"+super.getEmail()+"', cafeteriaName-'"+cafeteriaName+"', city='"+city+"', address="+address+"', phoneNumber='"+phoneNumber+"', program='"+program+"', description='"+description+"'}";
    }


}
