package com.cafeteria.models;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.*;

@Entity
@Table(name = "SimpleUser")
public class SimpleUser extends User {

    @Column(name = "FirstName")
    private String firstName;

    @Column(name = "LastName")
    private String lastName;

    @Column(name = "DateOfBirth")
    private LocalDate dateOfBirth;

    @Column(name = "SentToday")
    private boolean sentToday = false;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JoinTable(
            name = "SimpleUserCafeteriaSubscriptions",
            joinColumns = @JoinColumn(
                    name = "simpleUserID", referencedColumnName = "username"
            ),
            inverseJoinColumns = @JoinColumn(
                    name = "cafeteriaUserID", referencedColumnName = "username"
            )
    )

    private Set<CafeteriaUser> subscriptions;

    @ManyToMany(cascade = CascadeType.MERGE)
    @JoinTable(
            name = "SimpleUserSelectedItems",
            joinColumns = @JoinColumn(
                    name = "simpleUserID", referencedColumnName = "username"
            ),
            inverseJoinColumns = @JoinColumn(
                    name = "menuItemID", referencedColumnName = "menuItemID"
            )
    )
    private Set<MenuItem> selectedMenuItems;


    public SimpleUser() {
        this.subscriptions = new LinkedHashSet<>();
        this.selectedMenuItems = new LinkedHashSet<>();
    }

    public SimpleUser(String username, String password, String email, String profilePicture, String firstName, String lastName, String dateOfBirth) {
        super(username, password, email, profilePicture);
        this.dateOfBirth = LocalDate.parse(dateOfBirth);
        this.firstName = firstName;
        this.lastName = lastName;
        this.subscriptions = new LinkedHashSet<>();
        this.selectedMenuItems = new LinkedHashSet<>();
    }

    public void addMenuItemToSelection(MenuItem item) {
        this.selectedMenuItems.add(item);
    }

    public Set<MenuItem> getSelectedMenuItems() {
        return this.selectedMenuItems;
    }

    public void addSubscription(CafeteriaUser cafeteriaUser) {
        this.subscriptions.add(cafeteriaUser);
    }

    public void removeSubscription(CafeteriaUser cafeteriaUser) {
        this.subscriptions.remove(cafeteriaUser);
    }

    public Set<CafeteriaUser> getSubscriptions() {
        return this.subscriptions;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public boolean isSentToday() {
        return sentToday;
    }

    public void setSentToday(boolean sentToday) {
        this.sentToday = sentToday;
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.getUsername(), super.getEmail(), super.getPasswordEnc(), super.getProfilePicture(), lastName, firstName, dateOfBirth, subscriptions);
    }

    @Override
    public boolean equals(Object obj) {
        SimpleUser user = (SimpleUser) obj;
        return super.equals(obj) && (
                Objects.equals(firstName, user.getFirstName()) &&
                Objects.equals(lastName, user.getLastName()) &&
                Objects.equals(dateOfBirth, user.getDateOfBirth()) &&
                Objects.equals(subscriptions, user.getSubscriptions()));
    }

    @Override
    public String toString() {
        return "User{"+"username='"+super.getUsername()+"', email='"+super.getEmail()+"', firstName-'"+firstName+"', lastName='"+lastName+"', dateOfBirth="+dateOfBirth+"'}";
    }

}
