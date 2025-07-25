package SQLite.DBOnline.managementDB;


import SQLite.DBOnline.connect.ConnectDB;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

public class ManageDBDaSmantellare {

    private ConnectDB db= new ConnectDB();
    private Connection connection = db.getConnection();

    private TestConnecctionDB testConnecctionDB = new TestConnecctionDB();

    private Statement statement = testConnecctionDB.getConnection();


    private void createConnection() {
        try{
            statement = connection.createStatement();
        }catch (SQLException e) {
            e.printStackTrace();
            System.out.println("connection Failed");
        }
    }
    public void createTable() {
        if(connection != null) {

            try {

                statement = connection.createStatement();

                String createTable = "CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY, name TEXT)";

                // Create table if not exists

                statement.executeUpdate(createTable);

            }catch (SQLException e) {
            e.printStackTrace();}
        }
        else {
            System.out.println("Connection failed.");
        }

    }

    /*public String displayData() {//da capire come usare
    public void delateData() {
        try {
            statement.executeUpdate("DELETE FROM students WHERE id = 2");


        }catch (SQLException e) {
            e.printStackTrace();
        }
    }
    public void closeResources() {

        try {
            resultSet.close();
            statement.close();
            System.out.println("Connection Closed");
        }catch (SQLException e) {
            e.printStackTrace();
        }

    }*/

}


