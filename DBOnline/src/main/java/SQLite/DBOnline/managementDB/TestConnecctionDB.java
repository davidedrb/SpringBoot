package SQLite.DBOnline.managementDB;

import SQLite.DBOnline.connect.ConnectDB;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

public class TestConnecctionDB {

    private ConnectDB db= new ConnectDB();
    private Connection connection = db.getConnection();
    private Statement statement;

    public Statement getConnection() {

        try{
            statement = connection.createStatement();
        }catch (SQLException e) {
            e.printStackTrace();
            System.out.println("connection Failed");
        }
        return statement;
    }
}
