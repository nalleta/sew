<!DOCTYPE HTML>
<html lang="es"><head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8">
    <title>F1Desktop-Viajes</title>
    <meta name="author" content="Ignacio Llaneza">
    <meta name="description" content="documento para utilizar en otros módulos de la asignatura">
    <meta name="keywords" content="Viajes">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="estilo/estilo.css">
    <link rel="stylesheet" type="text/css" href="estilo/layout.css">
    <link rel="icon" href="multimedia/imagenes/iconoF1.png">
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <script src="js/viajes.js"></script>
<script src="https://maps.googleapis.com/maps-api-v3/api/js/59/3a/intl/es_ALL/main.js"></script><script type="text/javascript" charset="UTF-8" src="https://maps.googleapis.com/maps-api-v3/api/js/59/3a/intl/es_ALL/common.js"></script><script type="text/javascript" charset="UTF-8" src="https://maps.googleapis.com/maps-api-v3/api/js/59/3a/intl/es_ALL/util.js"></script></head>
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
    <script async="" defer="" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU&amp;loading=async"></script>
    <button onclick="viajes.initMaps();">Generar tus mapas estático y dinámico</button>
    <section>
        <h3>Mapa estático</h3>
    </section>
    <section>
        <h3>Mapa Dinámico</h3>
    </section>
    <article>
        <h3>Australia, Camborra</h3>
        <img src="https://live.staticflickr.com/65535/54207996005_ee637d7543_m.jpg" alt="Foggy Morning"><img src="https://live.staticflickr.com/65535/54207462376_bd386b4b4e_m.jpg" alt="VH-SBG QLK DHC-8-300 35 YSCB-4733"><img src="https://live.staticflickr.com/65535/54207702638_5f79cc6088_m.jpg" alt="VH-SBG QLK DHC-8-300 35 YSCB-4778"><img src="https://live.staticflickr.com/65535/54206569112_930745a23b_m.jpg" alt="VH-SBG QLK DHC-8-300 35 YSCB-4785"><img src="https://live.staticflickr.com/65535/54206569127_1e7ea1b9f4_m.jpg" alt="VH-SBG QLK DHC-8-300 35 YSCB-4769"><img src="https://live.staticflickr.com/65535/54207462341_fc08cd73e0_m.jpg" alt="VH-SBG QLK DHC-8-300 35 YSCB-4747"><img src="https://live.staticflickr.com/65535/54205683499_8f8cde1f2a_m.jpg" alt="BMW R1200RS"><img src="https://live.staticflickr.com/65535/54205574004_48a7d4e604_m.jpg" alt="UN International Day of Solidarity with the Palestine People-295273"><img src="https://live.staticflickr.com/65535/54205573969_960e05b811_m.jpg" alt="UN International Day of Solidarity with the Palestine People-295301"><img src="https://live.staticflickr.com/65535/54205573964_e3066e0c74_m.jpg" alt="UN International Day of Solidarity with the Palestine People-295315"><img src="https://live.staticflickr.com/65535/54205573994_f66831ef67_m.jpg" alt="UN International Day of Solidarity with the Palestine People-295283"><img src="https://live.staticflickr.com/65535/54205573899_51f6b015e1_m.jpg" alt="UN International Day of Solidarity with the Palestine People-295339"><img src="https://live.staticflickr.com/65535/54205569523_89d998ee48_m.jpg" alt="UN International Day of Solidarity with the Palestine People-295322"><img src="https://live.staticflickr.com/65535/54205747490_4b45ef1aa7_m.jpg" alt="UN International Day of Solidarity with the Palestine People-295320"><img src="https://live.staticflickr.com/65535/54205569603_fcc2a1e254_m.jpg" alt="UN International Day of Solidarity with the Palestine People-295284"><img src="https://live.staticflickr.com/65535/54205747535_b35390079a_m.jpg" alt="UN International Day of Solidarity with the Palestine People-295277"><img src="https://live.staticflickr.com/65535/54205747460_ab5db030d3_m.jpg" alt="UN International Day of Solidarity with the Palestine People-295327"><img src="https://live.staticflickr.com/65535/54204432837_3a7e0cf88e_m.jpg" alt="UN International Day of Solidarity with the Palestine People-295268"><img src="https://live.staticflickr.com/65535/54204432732_b173d873c8_m.jpg" alt="UN International Day of Solidarity with the Palestine People-295331"><img src="https://live.staticflickr.com/65535/54205747485_51a238780c_m.jpg" alt="UN International Day of Solidarity with the Palestine People-295323"><button> &gt; </button><button> &lt; </button>        <script>var viajes = new Viajes();</script>
   </article>
    <section>
        <h3>Convierte tus dólares australianos</h3>
        <form action="#" method="post" name="conversor">
            <label>Cantidad:
                <input type="text" name="cantidad">
            </label>
            <input type="submit" value="Calcular">
        </form>    
           </section>
    </main>

</body></html>