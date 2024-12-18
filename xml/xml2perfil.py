import xml.etree.ElementTree as ET
from pathlib import Path
XML_FOLDER = Path(__file__).parent

def recorrerXML():
    archivoXML = "circuitoEsquema.xml"
    try:
        arbol = ET.parse(archivoXML)
    except IOError:
        print ('No se encuentra el archivo ', archivoXML)
        exit()
        
    except ET.ParseError:
        print("Error procesando en el archivo XML = ", archivoXML)
        exit()
       
    raiz = arbol.getroot()

    distancia = 0
    tramos = []
    # Recorrido de los elementos del árbol
    for hijo in raiz.findall('./{http://www.uniovi.es}circuito/{http://www.uniovi.es}tramos/*'): # Expresión Path
        tramos.append((distancia ,float(hijo.find("./{http://www.uniovi.es}coordenadas").get("altitud"))))
        distancia+=float(hijo.find("./{http://www.uniovi.es}distancia").text)
    # print(tramos)
    maxAlt = 10
    # tramos = invierteAlturas(tramos, maxAlt)
    # tramos = tramos[1:] 

    puntos = ""
    for tramo in tramos:
        puntos+=str(tramo[0])+" "+str(tramo[1])+", "
    nombreSalida  = "perfil.svg"
    puntos = puntos[:-2]
    nLinea=0
    try:
        salida = open(nombreSalida,'w')
    except IOError:
        print ('No se puede crear el archivo ', nombreSalida)
        exit()


    #EPILOGO
    salida.write('<?xml version="1.0" encoding="UTF-8"?>\n')
    salida.write('<svg xmlns="http://www.w3.org/2000/svg" version="2.0">\n')

    #REPRESENTACIÓN
    salida.write('<polyline points="' + puntos + '" style="fill:white;stroke:red;stroke-width:4" />')

    #PRÓLOGO
    salida.write('</svg>\n')
    
    salida.close()
    
def alturaMaxima(tramos):
    maxAlt = 0
    for tupla in tramos:
        if(tupla[1]>maxAlt):
            maxAlt = tupla[1]
    return maxAlt

def invierteAlturas(tramos, maxAlt):
    nuevasTuplas = [()]
    for tupla in tramos:
        nuevasTuplas.append((tupla[0], maxAlt-tupla[1]))
    return nuevasTuplas

def main():
    recorrerXML()

main()