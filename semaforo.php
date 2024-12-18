<!DOCTYPE HTML>
<?php
    class Record {
        private $server;
        private $user;
        private $pass;
        private $dbname;

        public function __construct(){
            $this->server = "localhost";
            $this->user = "DBUSER2024";
            $this->pass = "DBPSWD2024";
            $this->dbname = "records";
        }

        public function handleRecord()
        {   
            $nombre = $_POST["nombre"];
            $apellidos = $_POST["apellidos"];
            $dificultad = $_POST["dificultad"];
            $tiempo = $_POST["tiempo"];
            $consulta = "INSERT INTO registro (nombre, apellidos, dificultad, tiempo) VALUES (?, ?, ?, ?)";
            $db = new mysqli($this->server, $this->user, $this->pass, $this->dbname);

            if($db->connect_errno){
                echo "<p>Error de conexión a la base de datos " . $db->connect_error . "</p>";
            }else{
                $query = $db->prepare($consulta);
                $query->bind_param("ssdd", $nombre, $apellidos, $dificultad, $tiempo);
                $query->execute();
                $query->close();
                $db->close();
            }
        }

        public function findBestRecords()
        {   
            $dificultad = $_POST["dificultad"];
            $consulta = "Select distinct * from registro where dificultad = " . $dificultad . " order by tiempo";
            $db = new mysqli($this->server, $this->user, $this->pass, $this->dbname);
            $resultado = $db->query($consulta);
            $db->close();
            echo "<section>";
            echo "<h4>Mejores resultados</h4>";
            echo "<ol>";
            foreach (array_slice($resultado->fetch_all(MYSQLI_ASSOC), 0, 10) as $fila) {
                echo "<li>" . htmlspecialchars($fila["nombre"]) . " " . htmlspecialchars($fila["apellidos"]) . 
                     ", Tiempo: " . htmlspecialchars($fila["tiempo"]) . 
                     ", Dificultad: " . htmlspecialchars($fila["dificultad"]) . "</li>";
            }
            echo "</ol>";
            echo "</section>";
        }
    }
?>

<html lang="es">
<head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8" />
    <title>F1Desktop-Semáforo</title>
    <meta name ="author" content ="Ignacio Llaneza" />
    <meta name ="description" content ="Juego del semáforo" />
    <meta name ="keywords" content ="semáforo" />
    <meta name ="viewport" content ="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="estilo/estilo.css" />
    <link rel="stylesheet" type="text/css" href="estilo/layout.css">
    <link rel="stylesheet" type="text/css" href="estilo/semaforo.css">
    <link rel="icon" href="multimedia/imagenes/iconoF1.png">    
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <script src="js/semaforo.js"></script>
</head>
<body>
    <header>
        <h1>F1Desktop</h1>
        <nav>
            <a href="index.html">Inicio</a>
            <a href="piloto.html">Piloto</a>
            <a href="noticias.html">Noticias</a>    
            <a href="calendario.html">Calendario</a>
            <a href="meteorologia.html">Meteorología</a>
            <a href="circuito.html">Circuito</a>
            <a href="viajes.php">Viajes</a>
            <a class="active" href="juegos.html">Juegos</a>
        </nav>
    </header>
    <p>Estás en: <a href="index.html">Inicio</a> / <a href="juegos.html">Juegos</a> / <a href="semaforo.html">Semáforo</a></p>
    <h2>Juegos</h2>
    <section>
        <h3>Juegos sobre la Fórmula 1</h3>
            <p><a href="memoria.html">Memoria</a></p>
            <p><a href="semaforo.php">Semáforo</a></p>
            <p><a href="api.html">Relaciones</a></p>
            <p><a href="php/fichajes.php">Fichajes</a></p>
    </section>
    <main>
        <script>new Semaforo()</script>
        <?php
            if (count($_POST)>0) 
            {   
                $record = new Record();
                $record->handleRecord();
                $record->findBestRecords();
            }
        ?>
    </main> 
</body>
</html>