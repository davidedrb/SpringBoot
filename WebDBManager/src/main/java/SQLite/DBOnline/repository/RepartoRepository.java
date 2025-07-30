package SQLite.DBOnline.repository;


import SQLite.DBOnline.dto.RepartoUtenteView;
import SQLite.DBOnline.model.Reparto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RepartoRepository extends JpaRepository<Reparto, Long> {
    List<Reparto> findByStanza(String stanza);

    @Query(value = """
        SELECT r.stanza AS stanza, u.nome AS nome, u.cognome AS cognome, u.email AS email
        FROM reparti r, utenti u
        WHERE u.reparto_id = r.id AND r.stanza = :stanza
        """, nativeQuery = true)
    List<RepartoUtenteView> findUtentiPerStanza(@Param("stanza") String stanza);





}

