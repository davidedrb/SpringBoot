package SQLite.DBOnline.model;

import javax.persistence.*;

@Entity
@Table(name = "reparti")
public class Reparto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private int piano;

    @Column(nullable = false)
    private String stanza;

    @Column(nullable = false)
    private String orario;

    // Getter, Setter, Costruttori


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Integer getPiano() {
        return piano;
    }

    public void setPiano(Integer piano) {
        this.piano = piano;
    }

    public String getStanza() {
        return stanza;
    }

    public void setStanza(String stanza) {
        this.stanza = stanza;
    }

    public String getOrario() {
        return orario;
    }

    public void setOrario(String orario) {
        this.orario = orario;
    }

    @Override
    public String toString() {
        return "Reparto{" +
                "id=" + id +
                ", piano=" + piano +
                ", stanza='" + stanza + '\'' +
                ", orario='" + orario + '\'' +
                '}';
    }
}
