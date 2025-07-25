package SQLite.DBOnline.managementDB;

import SQLite.DBOnline.connect.ConnectDB;
import org.springframework.stereotype.Service;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;


@Service
public class QueryDB {

    private ConnectDB db= new ConnectDB();
    private Connection connection = db.getConnection();
    private PreparedStatement preparedStatement;
    private ResultSet resultSet;


    public String[][] UserQuery(String name, String sourname) throws SQLException{
        String query;
        String[][] table;
        List<String[]> righe = new ArrayList<>();
        query = "SELECT u.nome, u.cognome, u.email, r.stanza " +
                "FROM utenti u, reparti r " +
                "WHERE u.reparto_id = r.id " +
                "AND u.nome = ? AND u.cognome = ?";

        preparedStatement = connection.prepareStatement(query);
        preparedStatement.setString(1, name);
        preparedStatement.setString(2, sourname);
        resultSet = preparedStatement.executeQuery();

        while (resultSet.next()) {
            String[] riga = new String[4]; // oppure 5 se aggiungi un campo in più
            riga[0] = resultSet.getString("nome");
            riga[1] = resultSet.getString("cognome");
            riga[2] = resultSet.getString("email");
            riga[3] = resultSet.getString("stanza");
            righe.add(riga);
        }
        // Converti la lista in array bidimensionale
        table = righe.toArray(new String[righe.size()][4]);
        return table;
    } //trova utente con nome e cognome


    public String[][] repartoQuery(String room) throws SQLException{
        String query;
        String[][] table;
        List<String[]> righe = new ArrayList<>();
        query = "SELECT r.stanza, u.nome, u.cognome, u.email FROM reparti r , utenti u WHERE u.reparto_id = r.id AND r.stanza = ?";


            preparedStatement = connection.prepareStatement(query);
            preparedStatement.setString(1, room);
            resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                String[] riga = new String[4]; // oppure 5 se aggiungi un campo in più
                riga[0] = resultSet.getString("stanza");
                riga[1] = resultSet.getString("nome");
                riga[2] = resultSet.getString("cognome");
                riga[3] = resultSet.getString("email");
                righe.add(riga);
            }
            // Converti la lista in array bidimensionale
            table = righe.toArray(new String[righe.size()][4]);
            return table;
    }//trova le persone che lavorano in quel reparto tramite il numero dell'ufficio


}
