package SQLite.DBOnline.managementDB;

import SQLite.DBOnline.connect.ConnectDB;
import org.springframework.stereotype.Service;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Service
public class ModifyDB {

    private ConnectDB connectDB = new ConnectDB();
    private Connection connection = connectDB.getConnection();
    private PreparedStatement preparedStatement;
    private QueryDB queryDB = new QueryDB();
    private ResultSet resultSet;


    public String insertData(String name, String sourname, String email, int reparto_id)throws SQLException {
        String checkQuery = "SELECT COUNT(*) FROM reparti WHERE id = ?";
        String insertQuery = "INSERT INTO UTENTI (nome, cognome, email, reparto_id) VALUES (?, ?, ?, ?)";


            // Controllo esistenza reparto
            PreparedStatement checkStmt = connection.prepareStatement(checkQuery);
            checkStmt.setInt(1, reparto_id);
            ResultSet rs = checkStmt.executeQuery();

            if (rs.next() && rs.getInt(1) > 0) {
                // Se il reparto esiste, esegui l'inserimento
                preparedStatement = connection.prepareStatement(insertQuery);
                preparedStatement.setString(1, name);
                preparedStatement.setString(2, sourname);
                preparedStatement.setString(3, email);
                preparedStatement.setInt(4, reparto_id);

                preparedStatement.executeUpdate();
                System.out.println(name + " inserted into UTENTI");
                return "Utente inserito correttamente";
            } else {
                System.out.println("Reparto inesistente: inserimento annullato.");
                return "Reparto inesistente, utente non inserito";
            }

    } //creazione nuovo utente


    public String[][] foundUserToUpdate(String name, String sourname) throws SQLException {
        String query;
        String[][] table;
        List<String[]> righe = new ArrayList<>();
        query = "SELECT u.id, u.nome, u.cognome, u.email, r.stanza " +
                "FROM utenti u, reparti r " +
                "WHERE u.reparto_id = r.id " +
                "AND u.nome = ? AND u.cognome = ?";
        preparedStatement = connection.prepareStatement(query);
        preparedStatement.setString(1, name);
        preparedStatement.setString(2, sourname);
        resultSet = preparedStatement.executeQuery();
        while (resultSet.next()) {
            String[] riga = new String[5]; // oppure 5 se aggiungi un campo in più
            riga[0] = resultSet.getString("id");
            riga[1] = resultSet.getString("nome");
            riga[2] = resultSet.getString("cognome");
            riga[3] = resultSet.getString("email");
            riga[4] = resultSet.getString("stanza");
            righe.add(riga);
        }
        // Converti la lista in array bidimensionale
        table = righe.toArray(new String[righe.size()][5]);
        return table;
    }

    public String removeUser(int id) throws SQLException {
        String query = "DELETE FROM utenti WHERE id = ?";
        preparedStatement = connection.prepareStatement(query);
        preparedStatement.setInt(1, id);
        int rowsAffected = preparedStatement.executeUpdate();

        if (rowsAffected > 0) {
            return "Utente rimosso correttamente";
        } else {
            return "Nessun utente trovato con quell'ID";
        }
    }







}
