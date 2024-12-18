import xml.etree.ElementTree as ET

class Kml(object):
    def __init__(self):
        self.raiz = ET.Element('kml', xmlns="http://www.opengis.net/kml/2.2")
        self.doc = ET.SubElement(self.raiz,'Document')

    def addPlacemark(self,nombre,descripcion,long,lat,alt, modoAltitud):
        pm = ET.SubElement(self.doc,'Placemark')
        ET.SubElement(pm,'name').text = '\n' + nombre + '\n'
        ET.SubElement(pm,'description').text = '\n' + descripcion + '\n'
        punto = ET.SubElement(pm,'Point')
        ET.SubElement(punto,'coordinates').text = '\n{},{},{}\n'.format(long,lat,alt)
        ET.SubElement(punto,'altitudeMode').text = '\n' + modoAltitud + '\n'

    def addLineString(self,nombre,extrude,tesela, listaCoordenadas, modoAltitud, color, ancho):
        ET.SubElement(self.doc,'name').text = '\n' + nombre + '\n'
        pm = ET.SubElement(self.doc,'Placemark')
        ls = ET.SubElement(pm, 'LineString')
        ET.SubElement(ls,'extrude').text = '\n' + extrude + '\n'
        ET.SubElement(ls,'tessellation').text = '\n' + tesela + '\n'
        ET.SubElement(ls,'coordinates').text = '\n' + listaCoordenadas + '\n'
        ET.SubElement(ls,'altitudeMode').text = '\n' + modoAltitud + '\n' 

        estilo = ET.SubElement(pm, 'Style')
        linea = ET.SubElement(estilo, 'LineStyle')
        ET.SubElement (linea, 'color').text = '\n' + color + '\n'
        ET.SubElement (linea, 'width').text = '\n' + ancho + '\n'

    def escribir(self,nombreArchivoKML):
        arbol = ET.ElementTree(self.raiz)
        arbol.write(nombreArchivoKML, encoding='utf-8', xml_declaration=True)
    
    def ver(self):
        print("\nElemento raiz = ", self.raiz.tag)

        if self.raiz.text != None:
            print("Contenido = "    , self.raiz.text.strip('\n')) #strip() elimina los '\n' del string
        else:
            print("Contenido = "    , self.raiz.text)
        
        print("Atributos = "    , self.raiz.attrib)

        # Recorrido de los elementos del árbol
        for hijo in self.raiz.findall('.//'): # Expresión XPath
            print("\nElemento = " , hijo.tag)
            if hijo.text != None:
                print("Contenido = ", hijo.text.strip('\n')) #strip() elimina los '\n' del string
            else:
                print("Contenido = ", hijo.text)    
            print("Atributos = ", hijo.attrib)

def main():
    
    print(Kml.__doc__)

    nombreKML = "planimetria.kml"

    nuevoKML = Kml()

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
    tramos = ""
    tramos = raiz.find('./{http://www.uniovi.es}circuito/{http://www.uniovi.es}coordenadas').get("longitud") + "," + raiz.find('./{http://www.uniovi.es}circuito/{http://www.uniovi.es}coordenadas').get("latitud") +",0\n"
    # Recorrido de los elementos del árbol
    for hijo in raiz.findall('./{http://www.uniovi.es}circuito/{http://www.uniovi.es}tramos/*'): # Expresión Path
        tramos += hijo.find("./{http://www.uniovi.es}coordenadas").get("longitud") + "," + hijo.find("./{http://www.uniovi.es}coordenadas").get("latitud")  + ",0 "
    tramos = tramos.strip("\n")
    nuevoKML.addLineString("Circuito AlbertPark","1","1",
                           tramos,'relativeToGround',
                           '#ff0000ff',"5")
    
    nuevoKML.ver()
    
    nuevoKML.escribir(nombreKML)
    print("Creado el archivo: ", nombreKML)
    
if __name__ == "__main__":
    main()    