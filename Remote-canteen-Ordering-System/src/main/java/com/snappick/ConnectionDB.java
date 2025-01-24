package com.snappick;
import java.sql.Connection;
import java.sql.DriverManager;

    public class ConnectionDB {
        public static void main(String[] args) {
            String url = "jdbc:postgresql://localhost:5432/SnapPick";
            String user = "postgres";
            String password = "4163@2606";

            try (Connection connection = DriverManager.getConnection(url, user, password)) {
                System.out.println("Connected to the PostgreSQL database!");
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }


