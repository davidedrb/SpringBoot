package SQLite.DBOnline;



import SQLite.DBOnline.service.RepartoService;
import SQLite.DBOnline.service.UtenteService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class DbOnlineApplication {
	public static void main(String[] args) {
		SpringApplication.run(DbOnlineApplication.class, args);



	}

}
/*TestDB testDB = new TestDB();
		System.out.println(testDB.printAll());

		QueryDB queryDB = new QueryDB();
		try {
			String[][] table = queryDB.UserQuery("Luca", "Rossi");

			for (int i = 0; i < table.length; i++) {
				for (int j = 0; j < table[i].length; j++) {
					System.out.print(table[i][j] + "\t");
				}
				System.out.println();
			}
		}catch (Exception e){
			e.printStackTrace();
		}

		ModifyDB modifyDB = new ModifyDB();
		try {
			System.out.println(modifyDB.alterUser("email", "davi@berna-ti.org", 4));
		}catch (Exception e) {
		e.printStackTrace();}*/