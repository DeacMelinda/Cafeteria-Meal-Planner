package com.cafeteria.models;

import org.springframework.scheduling.annotation.Scheduled;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "MenuItems")
public class MenuItem {

    @Id
    @Column(name = "MenuItemID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long menuItemID;

    @Column(name = "MenuItem")
    private String menuItem;

    @Column(name = "Ingredients")
    private String ingredients;

    @Column(name = "Calories")
    private double calories;

    @Column(name = "Allergens")
    private String allergens;

    @Column(name = "Price")
    private double price;

    @Column(name = "Quantity")
    private double quantity;

    @Column(name = "Orders")
    private int orders;

    public MenuItem(){}

    public MenuItem(String menuItem, String ingredients, double calories, String allergens, double price, double quantity) {
        this.menuItem = menuItem;
        this.ingredients = ingredients;
        this.calories = calories;
        this.allergens = allergens;
        this.price = price;
        this.quantity = quantity;
        this.orders=0;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public double getQuantity() {
        return quantity;
    }

    public void setQuantity(double quantity) {
        this.quantity = quantity;
    }

    public long getMenuItemID() {
        return menuItemID;
    }

    public String getMenuItem() {
        return menuItem;
    }

    public void setMenuItem(String menuItem) {
        this.menuItem = menuItem;
    }

    public String getIngredients() {
        return ingredients;
    }

    public void setIngredients(String ingredients) {
        this.ingredients = ingredients;
    }

    public double getCalories() {
        return calories;
    }

    public void setCalories(double calories) {
        this.calories = calories;
    }

    public String getAllergens() {
        return allergens;
    }

    public void setAllergens(String allergens) {
        this.allergens = allergens;
    }

    public int getOrders() {
        return this.orders;
    }

    public void setOrders(int orders) {
        this.orders = orders;
    }

    @Override
    public int hashCode() {
        return Objects.hash(menuItemID, menuItem, ingredients, calories, allergens, price, quantity);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null || getClass() != obj.getClass())
            return false;
        MenuItem user = (MenuItem) obj;
        return Objects.equals(menuItemID, user.getMenuItem()) &&
                Objects.equals(menuItem, user.getMenuItem()) &&
                Objects.equals(ingredients, user.getIngredients()) &&
                Objects.equals(calories, user.getCalories()) &&
                Objects.equals(allergens, user.getAllergens()) &&
                Objects.equals(price, user.getPrice()) &&
                Objects.equals(quantity, user.getQuantity()) &&
                Objects.equals(orders, user.getOrders());

    }

    @Override
    public String toString() {
        return "MenuItem{"+"menuItemID='"+menuItemID+"', menuItem='"+menuItem+"', ingredients='"+ingredients+"', calories='"+calories+"', allergens='"+allergens+"', price='"+price+"', quantity='"+quantity+"'}";
    }


}
