<!DOCTYPE HTML>
<?php
    class Carrusel {
        private $pais;
        private $capital;

        public function __construct($pais, $capital){
            $this->pais = $pais;
            $this->capital = $capital;
        }

        public function generaCarrusel(){
            $api_key = '2764a1e3ff08e9112da7499028915f0f';
            $tag = $this->pais . ',' . $this->capital;
            $perPage = 10;
            // Fotos públicas recientes
            $url = 'http://api.flickr.com/services/feeds/photos_public.gne?';
            $url.= '&api_key='.$api_key;
            $url.= '&tags='.$tag;
            $url.= '&per_page='.$perPage;
            $url.= '&format=json';
            $url.= '&nojsoncallback=1';
            $url.= "_m.jpg";
            $result = json_decode(file_get_contents($url));

            if($result===NULL){
                echo "<p>Error al procesar el JSON.</p>";
            }else{
                foreach($result->items as $foto){
                    echo "<img src='".$foto->media->m."' alt='".$foto->title."' />";
                }
                echo "<button> &gt; </button>";
                echo "<button> &lt; </button>";
            }
        }
    }
    
    class Moneda
    {
        private $tipoMoneda;
        private $apiKey;
        private $apiUrl;

        public function __construct($tipoMoneda)
        {
            $this->tipoMoneda = strtoupper($tipoMoneda);
            $this->apiKey = "2764a1e3ff08e9112da7499028915f0f";
            $this->apiUrl = "https://api.exchangerate-api.com/v4/latest/"; // Cambiar según API.
        }

        public function convertToEuros($cantidad)
        {
            if (!is_numeric($cantidad)) {
                echo "<p>La cantidad no es numérica.</p>";
                return;
            }
            $response = file_get_contents($this->apiUrl . $this->tipoMoneda);
            if ($response === false) {
                echo "<p>Imposible procesar los archivos devueltos.</p>";
                return;
            }
            $data = json_decode($response, true);
            $tasaEuro = $data['rates']['EUR'];
            $result = $cantidad * $tasaEuro;
            $result = round($result, 2);
            echo "<p>La tasa de cambio de " . $cantidad . " " . $this->tipoMoneda . " a euros es " . $result . "€.</p>";
        }
    }
    
?>
<html lang="es">
<head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8" />
    <title>F1Desktop-Viajes</title>
    <meta name ="author" content ="Ignacio Llaneza" />
    <meta name ="description" content ="documento para utilizar en otros módulos de la asignatura" />
    <meta name ="keywords" content ="Viajes" />
    <meta name ="viewport" content ="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="estilo/estilo.css" />
    <link rel="stylesheet" type="text/css" href="estilo/layout.css">
    <link rel="icon" href="multimedia/imagenes/iconoF1.png">
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <script src="js/viajes.js" ></script>
</head>
<body>
    <!-- Datos con el contenidos que aparece en el navegador -->
    <header>
    <h1>F1Desktop</h1>
    <nav>
        <a href="index.html">Inicio</a>
        <a href="piloto.html">Piloto</a>
        <a href="noticias.html">Noticias</a>    
        <a href="calendario.html">Calendario</a>
        <a href="meteorologia.html">Meteorología</a>
        <a href="circuito.html">Circuito</a>
        <a class="active" href="viajes.php">Viajes</a>
        <a href="juegos.html">Juegos</a>
    </nav>
    </header>
    <p>Estás en: <a href="index.html">Inicio</a> / <a href="viajes.html">Viajes</a></p>
    <main>
    <h2>Viajes</h2>
    <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU&loading=async"></script>
    <button onclick="viajes.initMaps();">Generar tus mapas estático y dinámico</button>
    <section>
        <h3>Mapa estático</h3>
    </section>
    <section>
        <h3>Mapa Dinámico</h3>
    </section>
    <article>
        <h3>Australia, Camborra</h3>
        <?php
            $carrusel = new Carrusel("Australia", "Canberra");
            $carrusel->generaCarrusel();
        ?>
        <script>var viajes = new Viajes();</script>
   </article>
    <section>
        <h3>Convierte tus dólares australianos</h3>
        <form action="#" method="post" name="conversor">
            <label>Cantidad:
                <input type="text" name="cantidad"/>
            </label>
            <input type="submit" value="Calcular">
        </form>    
        <?php
            if (count($_POST)>0) 
            {   
                $moneda = new Moneda("AUD");
                $moneda->convertToEuros($_POST['cantidad']);
            }
            ?>
   </section>
    </main>
</body>
</html>