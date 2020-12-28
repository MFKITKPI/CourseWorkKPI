package com.example.searchservice.domain;

public enum Role {
    USER, ADMIN;

    public String getAuthority() {
        return name();
    }
}
