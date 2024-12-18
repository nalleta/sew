<?php
    class Fichajes
    {
        private $server;
        private $user;
        private $pass;
        private $dbname;

        public function __construct(){
            $this->server = "localhost";
            $this->user = "DBUSER2024";
            $this->pass = "DBPSWD2024";
            $this->dbname = "fichajes";
        }

        public function restart(){
            $conn = new mysqli($this->server, $this->user, $this->pass);

            $sentenciasCreación = file_get_contents("fichajes.sql");
            if ($conn->multi_query($sentenciasCreación)) {
                while ($result = $conn->next_result()) {
                }
            } else {
                echo "Error al ejecutar las sentencias: " . $conn->error;
            }
            $conn->close();
        }

        public function import(){
            $file = fopen($_FILES['cvsfile']['tmp_name'], 'r');

            try{
                $conn = new mysqli($this->server, $this->user, $this->pass, $this->dbname);
            }catch (mysqli_sql_exception $e){
                echo "Porfavor, genere la base de datos";
                return;
            }
            if ($conn->connect_error) {
                echo "Ha ocurrido un error al conectar con la base de datos.";
                return;
            }

            echo "<h4>Resultados de la importación</h4>";
            while (($line = fgetcsv($file, 0, ";")) !== FALSE) {
                $table = $line[0];
                switch ($table) {
                    case 'Coche':
                        $stmt = $conn->prepare("INSERT INTO Coche (nombre_modelo, caballos, pais_fabricacion) VALUES (?, ?, ?)");
                        $stmt->bind_param("sis", $line[1], $line[2], $line[3]);
                        break;
                    case 'Piloto':
                        $stmt = $conn->prepare("INSERT INTO Piloto (nombre_piloto, apellido_piloto, nacionalidad, edad) VALUES (?, ?, ?, ?)");
                        $stmt->bind_param("sssi", $line[1], $line[2], $line[3], $line[4]);
                        break;
                    case 'Escuderia':
                        $stmt = $conn->prepare("INSERT INTO Escuderia (nombre_escuderia, pais_sede) VALUES (?, ?)");
                        $stmt->bind_param("ss", $line[1], $line[2]);
                        break;
                    case 'Prefiere':
                        $stmt = $conn->prepare("INSERT INTO Prefiere (nombre_piloto, apellido_piloto, nombre_escuderia, salario_propuesto) VALUES (?, ?, ?, ?)");
                        $stmt->bind_param("sssd", $line[1], $line[2], $line[3], $line[4]);
                        break;
                    case 'Utiliza':
                        $stmt = $conn->prepare("INSERT INTO Utiliza (nombre_piloto, apellido_piloto, nombre_modelo, mejor_tiempo) VALUES (?, ?, ?, ?)");
                        $stmt->bind_param("ssss", $line[1], $line[2], $line[3], $line[4]);
                        break;
                }
                try{
                $stmt->execute();
                }catch(Exception $e){
                    echo "<p>No se ha podido insertar los datos: " . $line[1] . " " . $line[2] . "</p>";
                }
                $stmt->close();
            }
            echo "<p>Importación finalizada.</p>";
            fclose($file);
            $conn->close();
            
        }

        public function export(){

            try{
                $db = new mysqli($this->server, $this->user, $this->pass, $this->dbname);
            }catch (mysqli_sql_exception $e){
                return;
            }
            if ($db->connect_error) {
                return;
            }
            
            header('Content-Type: text/csv');
            header('Content-Disposition: attachment; filename="fichajes_export.csv"');
            $output = fopen('php://output', 'w');
            $tables = ['Coche', 'Piloto', 'Escuderia', 'Prefiere', 'Utiliza'];
            foreach ($tables as $table) {
                $result = $db->query("SELECT * FROM $table");
                while ($row = $result->fetch_assoc()) {
                    fputcsv($output, array_merge([$table], array_values($row)), ";");
                }
            }

            fclose($output);
            $db->close();
            exit;
        }

        public function searchPilot()
        {   
            $pilot = $_POST["piloto"];
            $apellido = $_POST["apellido"];

            if (empty($pilot) || empty($apellido)) {
                echo "Por favor, introduzca un nombre y un apellido antes de pulsar el botón.";
                return;
            }

            try{
                $db = new mysqli($this->server, $this->user, $this->pass, $this->dbname);
            }catch (mysqli_sql_exception $e){
                echo "Porfavor, genere la base de datos";
                return;
            }
            if ($db->connect_error) {
                echo "Ha ocurrido un error al conectar con la base de datos.";
                return;
            }

            $stmt = $db->prepare("SELECT DISTINCT * FROM Piloto WHERE nombre_piloto like ? AND apellido_piloto like ?");
            $stmt->bind_param("ss", $pilot, $apellido); 
            $stmt->execute();
            $resultado = $stmt->get_result();
            echo "<section>";
            echo "<h4>Resultados de la búsqueda</h4>";
            if ($resultado->num_rows > 0) {
                $fila = $resultado->fetch_assoc();
                echo "<h5>Información del piloto</h5>";
                echo "<p>Nombre completo: " . htmlspecialchars($fila["nombre_piloto"]) . " " . htmlspecialchars($fila["apellido_piloto"]) . "</p>";
                echo "<p>Edad: " . htmlspecialchars($fila["edad"]) . "</p>";
                echo "<p>Nacionalidad: " . htmlspecialchars($fila["nacionalidad"]) . "</p>";

                echo "<h5>Modelos registrados del piloto</h5>";
                $stmt = $db->prepare("SELECT DISTINCT * FROM Utiliza WHERE nombre_piloto LIKE ? AND apellido_piloto LIKE ? ORDER BY mejor_tiempo");
                $stmt->bind_param("ss", $fila["nombre_piloto"], $fila["apellido_piloto"]);
                $stmt->execute();
                $resultado = $stmt->get_result();
                echo "<ol>";
                foreach ($resultado->fetch_all(MYSQLI_ASSOC) as $fila) { // Limitado a 10 resultados
                    echo "<li>" . htmlspecialchars($fila["nombre_modelo"]) . 
                         ", Mejor tiempo: " . htmlspecialchars($fila["mejor_tiempo"]) . "</li>";
                }
                echo "</ol>";

                echo "<h5>Escuderías interesadas</h5>";
                $stmt = $db->prepare("SELECT DISTINCT * FROM Prefiere WHERE nombre_piloto LIKE ? AND apellido_piloto LIKE ? ORDER BY salario_propuesto DESC");
                $stmt->bind_param("ss", $fila["nombre_piloto"], $fila["apellido_piloto"]);
                $stmt->execute();
                $resultado = $stmt->get_result();
                echo "<ol>";
                foreach ($resultado->fetch_all(MYSQLI_ASSOC) as $fila) {
                    echo "<li>Escudería: " . htmlspecialchars($fila["nombre_escuderia"]) . 
                         ", Salario propuesto: " . htmlspecialchars($fila["salario_propuesto"]) . "€</li>";
                }
                echo "</ol>";

            } else {
                echo "<p>No se encontraron pilotos.</p>";
            }

            // Cerrar la declaración y la conexión
            $stmt->close();
            $db->close();
        }

        public function searchTeam(){
            $team = $_POST["teamName"];

            if (empty($team)) {
                echo "Por favor, introduzca un nombre de escudería antes de pulsar el botón.";
                return;
            }

            try{
                $db = new mysqli($this->server, $this->user, $this->pass, $this->dbname);
            }catch (mysqli_sql_exception $e){
                echo "Porfavor, genere la base de datos";
                return;
            }
            if ($db->connect_error) {
                echo "Ha ocurrido un error al conectar con la base de datos.";
                return;
            }

            $stmt = $db->prepare("SELECT DISTINCT * FROM Escuderia WHERE nombre_escuderia LIKE ?");
            $stmt->bind_param("s", $team);
            $stmt->execute();
            $resultado = $stmt->get_result();

            echo "<h4>Resultados de la búsqueda</h4>";
            if ($resultado->num_rows > 0) {
                $fila = $resultado->fetch_assoc();
                echo "<h5>Información de la escudería</h5>";
                echo "<p>Nombre: " . htmlspecialchars($fila["nombre_escuderia"]) . "</p>";
                echo "<p>Localización de su Sede: " . htmlspecialchars($fila["pais_sede"]) . "</p>";

                echo "<h5>Pilotos que prefieren la escudería " . htmlspecialchars($team) . "</h5>";
                $stmt = $db->prepare("SELECT DISTINCT * FROM Prefiere WHERE nombre_escuderia LIKE ? ORDER BY salario_propuesto DESC");
                $stmt->bind_param("s", $team);
                $stmt->execute();
                $resultado = $stmt->get_result();
                echo "<ol>";
                foreach ($resultado->fetch_all(MYSQLI_ASSOC) as $fila) {
                    echo "<li>Piloto: " . htmlspecialchars($fila["nombre_piloto"]) . " " . htmlspecialchars($fila["apellido_piloto"]) . 
                         ", Salario propuesto: " . htmlspecialchars($fila["salario_propuesto"]) . "€</li>";
                }
                echo "</ol>";
            } else {
                echo "<p>No se encontró la escudería.</p>";
            }

            $stmt->close();
            $db->close();
        }

        public function searchModel(){
            $model = $_POST["modelName"];

            if (empty($model)) {
                echo "Por favor, introduzca un nombre de modelo antes de pulsar el botón.";
                return;
            }

            try{
                $db = new mysqli($this->server, $this->user, $this->pass, $this->dbname);
            }catch (mysqli_sql_exception $e){
                echo "Porfavor, genere la base de datos";
                return;
            }
            if ($db->connect_error) {
                echo "Ha ocurrido un error al conectar con la base de datos.";
                return;
            }

            $stmt = $db->prepare("SELECT * FROM Coche WHERE nombre_modelo LIKE ?");
            $stmt->bind_param("s", $model);
            $stmt->execute();
            $resultado = $stmt->get_result();

            echo "<h4>Resultados de la búsqueda</h4>";
            if ($resultado->num_rows > 0) {
                $fila = $resultado->fetch_assoc();
                echo "<h5>Información del modelo</h5>";
                echo "<p>Nombre del modelo: " . htmlspecialchars($fila["nombre_modelo"]) . "</p>";
                echo "<p>Caballos: " . htmlspecialchars($fila["caballos"]) . "</p>";
                echo "<p>País de fabricación: " . htmlspecialchars($fila["pais_fabricacion"]) . "</p>";

                echo "<h5>Pilotos que utilizan el modelo " . htmlspecialchars($model) . "</h5>";
                $stmt = $db->prepare("SELECT * FROM Utiliza WHERE nombre_modelo LIKE ? ORDER BY mejor_tiempo");
                $stmt->bind_param("s", $model);
                $stmt->execute();
                $resultado = $stmt->get_result();
                echo "<ol>";
                foreach ($resultado->fetch_all(MYSQLI_ASSOC) as $fila) {
                    echo "<li>Piloto: " . htmlspecialchars($fila["nombre_piloto"]) . " " . htmlspecialchars($fila["apellido_piloto"]) . 
                         ", Mejor tiempo: " . htmlspecialchars($fila["mejor_tiempo"]) . "</li>";
                }
                echo "</ol>";
            } else {
                echo "<p>No se encontraron datos para el modelo.</p>";
            }

            $stmt->close();
            $db->close();
        }
    }

    if(count($_POST)>0){
        $fichajes = new Fichajes();
        if (isset($_POST['export'])) {
            $fichajes->export();
        }
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8" />
    <title>F1Desktop-APIs</title>
    <meta name ="author" content ="Ignacio Llaneza" />
    <meta name ="description" content ="Herramienta de gestión de futuros fichajes de F1" />
    <meta name ="keywords" content ="Fichajes" />
    <meta name ="viewport" content ="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="../estilo/estilo.css" />
    <link rel="stylesheet" type="text/css" href="../estilo/layout.css" />
    <link rel="icon" href="../multimedia/imagenes/iconoF1.png">
</head>
<body>
    <header>
        <h1>F1Desktop</h1>
        <nav> 
            <a href="../index.html">Inicio</a>
            <a href="../piloto.html">Piloto</a>
            <a href="../noticias.html">Noticias</a>    
            <a href="../calendario.html">Calendario</a>
            <a href="../meteorologia.html">Meteorología</a>
            <a href="../circuito.php">Circuito</a>
            <a href="../viajes.php">Viajes</a>
            <a class="active" href="../juegos.html">Juegos</a>
        </nav>
    </header>
    <p>Estás en: <a href="../index.html">Inicio</a> / <a href="../juegos.html">Juegos</a>/ <a href="fichajes.php">Fichajes</a></p>
    <h2>Juegos</h2>
    <section>
        <h3>Juegos sobre la Fórmula 1</h3>
            <p><a href="../memoria.html">Memoria</a></p>
            <p><a href="../semaforo.php">Semáforo</a></p>
            <p><a href="../api.html">Relaciones</a></p>
            <p><a href="fichajes.php">Fichajes</a></p>
    </section>
<main>
    <h3>Registro de fichajes</h3>
    <h4>Cómo funciona</h4>
    <p>Aquí podras almacenar resultados sobre alguno de los fichajes más prometedores que acechan al mundo de la fórmula uno.</p>
    <section>
        <h4>Búsqueda de resultados</h4>
        <h5>Pilotos</h5>
        <form action="#" method="post" >
            <p><label>Nombre del piloto: <input type="text" name="piloto"></label><p>
            <p><label>Apellido del piloto: <input type="text" name="apellido"></label><p>
            <input type="submit" value="Buscar piloto" name="pilot">
        </form>
        <h5>Escuderías</h5>
        <form action="#" method="post">
            <p><label>Nombre de la escudería: <input type="text" name="teamName"></label><p>
            <input type="submit" value="Buscar escudería"  name="team">
        </form>
        <h5>Modelos</h5>
        <form action="#" method="post">
            <p><label>Nombre del modelo: <input type="text" name="modelName"></label><p>
            <input type="submit" value="Buscar modelo"  name="model">
        </form>
    </section>
    <section>
        <h4>Gestión de datos</h4>
        <h5>Reiniciar los datos</h5>
        <form action="#" method="post">
            <input type="submit" value="Generar" name="restart">
        </form>
        <h5>Importar datos</h5>
        <form action="#" method="post" enctype="multipart/form-data">
            <p><label>Selecciona el archivo: <input type="file" name="cvsfile" accept=".csv" required></label><p>
            <input type="submit" value="Importar" name="import">
        </form>
        <h5>Exportar datos</h5>
        <form action="#" method="post">
            <input type="submit" value="Exportar"  name="export">
        </form>
    </section>
    <?php
        if (count($_POST)>0) {
            $fichajes = new Fichajes();
            if (isset($_POST['pilot'])) {
                $fichajes->searchPilot();
            } elseif (isset($_POST['team'])) {
                $fichajes->searchTeam();
            } elseif (isset($_POST['model'])) {
                $fichajes->searchModel();
            } elseif (isset($_POST['restart'])) {
                $fichajes->restart();
            } elseif (isset($_POST['import'])) {
                $fichajes->import();
            }
        }
    ?>

</main>
</body>
</html>
