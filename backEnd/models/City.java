package com.cafeteria.models;

public enum City {
    Cluj("CLUJ_NAPOCA");

    String cityName;
    City(String cityName) {
        cityName = cityName;
    }

    String showCityName() {
        return cityName;
    }
}
