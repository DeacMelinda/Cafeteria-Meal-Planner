package com.cafeteria.models;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "Menus")
public class Menu {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MenuID")
    private long menuID;

    @Column(name = "MenuTitle")
    private String menuTitle;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JoinTable(
            name = "menuItemsInMenu",
            joinColumns = @JoinColumn(
                    name = "menuID", referencedColumnName = "menuID"
            ),
            inverseJoinColumns = @JoinColumn(
                    name = "menuItemID", referencedColumnName = "menuItemID"
            )
    )
    private List<MenuItem> menuItems = new ArrayList<>();

    public Menu(){}
    public Menu(String menuTitle) {
        this.menuTitle = menuTitle;
    }
    public Menu(String menuTitle, List<MenuItem> menuItems) {this.menuTitle = menuTitle; this.menuItems = menuItems;}

    public long getMenuID() {
        return menuID;
    }

    public String getMenuTitle() {
        return menuTitle;
    }

    public void setMenuTitle(String menuTitle) {
        this.menuTitle = menuTitle;
    }

    public List<MenuItem> getMenuItems() {
        return this.menuItems;
    }

    public void setMenuItems(List<MenuItem> menuItems) {
        this.menuItems = menuItems;
    }

    public void addMenuItem(MenuItem item) {
        this.menuItems.add(item);
    }

    public void removeMenuItem(MenuItem item) {
        this.menuItems.remove(item);
    }

    @Override
    public int hashCode() {
        return Objects.hash(menuID, menuTitle, menuItems);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null || getClass() != obj.getClass())
            return false;
        Menu menu = (Menu) obj;
        return Objects.equals(menuID, menu.getMenuID()) &&
                Objects.equals(menuTitle, menu.getMenuTitle()) &&
                Objects.equals(menuItems, menu.getMenuItems());
    }

//    @Override
//    public String toString() {
//        return "Menu{"+"menuID='"+menuID+"', menuTitle='"+menuTitle+"'}";
//    }
}
