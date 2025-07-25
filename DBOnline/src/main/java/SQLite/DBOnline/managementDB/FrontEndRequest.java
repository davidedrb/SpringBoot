package SQLite.DBOnline.managementDB;

public class FrontEndRequest {
    private int id;
    private String name;
    private String sourname;
    private String email;
    private int reparto_id;
    private String piano;
    private String room;
    private String orario;


    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getSourname() { return sourname; }
    public void setSourname(String sourname) { this.sourname = sourname; }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getReparto_id() {
        return reparto_id;
    }

    public void setReparto_id(int reparto_id) {
        this.reparto_id = reparto_id;
    }

    public String getPiano() {
        return piano;
    }

    public void setPiano(String piano) {
        this.piano = piano;
    }

    public String getRoom() {
        return room;
    }

    public void setRoom(String room) {
        this.room = room;
    }

    public String getOrario() {
        return orario;
    }

    public void setOrario(String orario) {
        this.orario = orario;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
