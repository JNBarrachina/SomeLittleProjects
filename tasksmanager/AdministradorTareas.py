import json
import os
from colorama import Fore, Style, init  #Componentes de la biblioteca colorama, para aplicar colores y estilos al programa.

init(autoreset=True)

"""
Dado que el objetivo de un administrador de tareas es que recuerde las tareas por ti, 
se guarda la lista de tareas en un archivo JSON, sobre el cual se pueden agregar, borrar,
editar y completar tareas.

"""

"""
El primer paso es crear una clase llamada AdministradorTareas. 

"""

class AdministradorTareas:

    """
    Sus dos atributos son tanto una lista vacía (donde se listarán las tareas cada vez que se lea el archivo JSON), 
    como el archivo JSON donde se van a guardar dichas tareas.

    """

    def __init__(self):
        self.tareas= []
        self.filename: str = os.path.dirname(os.path.abspath(__file__)) + '/lista.json'

    """
    Los métodos principales de la clase AdministradorTareas son los siguientes:
        1. inicio_administrador(self): devuelve el menu de inicio del administrador de tareas.
        2. agregar_tarea(self): agrega una nueva tarea.
        3. mostrar_tareas(self): muestra todas las tareas guardadas en el archivo JSON.
        4. borrar_tarea(self): elimina una tarea.
        5. editar_tarea(self): edita el nombre (descripción) de una tarea.
        6. completar_tarea(self): marca una tarea como completada en el caso de que no lo esté.

    Se añaden cuatro métodos auxiliares adicionales, con el objetivo de no hacer uso de código redundante:
        1. mostrar_tareas_simple(self): muestra las tareas guardadas en el archivo JSON para las funciones de borrar, editar y completar, de forma que puedan seguir ejecutándose sin que se tenga que salir al menú de inicio del administrador.
        2. modificar_json_simple(self, tareas): actualiza el archivo JSON con las modificaciones hechas en la lista de tareas.
        3. validar_seleccion_tarea(self, id): La función en la que se desarrollan las excepciones. Trata de verificar que el usuario introduce un valor numérico válido, correspondiente a una tarea existente. Si introduce un valor no numérico o no introduce nada, se muestra un mensaje de error.
        4. comprobar_json(self): crea el archivo JSON si no existe.
    
    """

    def inicio_administrador(self):

        """
        Muestra el menú principal del administrador de tareas.

        """
        # Obtener el ancho del titulo para centrarlo.

        terminal_width = os.get_terminal_size().columns
        title_width = len("BIENVENIDO AL ADMINISTRADOR DE TAREAS (Desarrollado por Juan Narros Barrachina)")
        left_padding = (terminal_width - title_width) // 2

        # Imprimir el título centrado con bordes.
        print("=" * terminal_width)
        print("|" + " " * (terminal_width - 2) + "|")
        print("|" + " " * left_padding + Fore.CYAN + Style.BRIGHT + "BIENVENIDO AL ADMINISTRADOR DE TAREAS (Desarrollado por Juan Narros Barrachina)" + " " * (terminal_width - title_width - left_padding - 2) + "|")
        print("|" + " " * (terminal_width - 2) + "|")
        print("=" * terminal_width + "\n")

        # Mostrar el menú principal.
        print(Fore.YELLOW +"1. Agregar Tarea.")
        print(Fore.YELLOW +"2. Mostrar Tareas.")
        print(Fore.YELLOW +"3. Borrar Tarea.")
        print(Fore.YELLOW +"4. Editar Tarea.")
        print(Fore.YELLOW +"5. Completar Tarea.")
        print(Fore.YELLOW +"6. Salir.")

        try:
            print(Fore.CYAN +"\nElige una opción:")
            numero = int(input())

        except ValueError:
            print(Fore.RED +"\nPor favor, introduce un número valido.\n")

            print(Fore.CYAN +"Pulsa la tecla ENTER para volver al menú:")
            input()
            self.inicio_administrador()
            return
        
        if numero > 6 or numero < 1:
            print(Fore.RED +"\nPor favor, introduce un número entre 1 y 6.\n")

            print(Fore.CYAN +"Pulsa la tecla ENTER para volver al menú:")
            input()
            self.inicio_administrador()
            return

        match numero:
            case 1:
                self.agregar_tarea()
            case 2:
                self.mostrar_tareas()
            case 3:
                self.borrar_tarea()
            case 4:
                self.editar_tarea()
            case 5:
                self.completar_tarea()
            case 6:
                print(Fore.GREEN +"\nHASTA PRONTO :)\n")
                exit()


    def agregar_tarea(self):

        """
        Agrega una nueva tarea a la lista de tareas.

        """

        print(Fore.CYAN +"\nIngresa el nombre de la nueva tarea:")
        nombre = input()

        estado = False

        self.comprobar_json()

        nueva_tarea = {"name": nombre, "completed": estado}
        self.tareas.append(nueva_tarea)

        self.modificar_json_simple(self.tareas)

        print(Fore.GREEN +f"\nTarea '{nombre}' agregada correctamente\n")

        print(Fore.CYAN +"Pulsa la tecla ENTER para volver al menú:")
        input()
        self.inicio_administrador()


    def mostrar_tareas(self):

        """
        Muestra todas las tareas guardadas en el archivo JSON.

        """
        
        self.comprobar_json()
        
        if len(self.tareas) == 0:   # Verificar si la lista de tareas esta vacia
            print(Fore.CYAN +"\nNo se encontraron tareas que mostrar.\n")

            print(Fore.CYAN +"Pulsa la tecla ENTER para volver al menú:")
            input()
            self.inicio_administrador()
            return
        else:
            print(Fore.YELLOW +"\nLISTADO DE TAREAS:")
            i = 0   # Variable para iterar en la lista de tareas
            for tarea in self.tareas:     
                i += 1  #Se asigna el valor de la variable i + 1 a cada elemento de la lista
                estado = Fore.GREEN +'Completada' if tarea['completed'] else Fore.RED +'Pendiente'
                print(f"{Fore.YELLOW}{i}. {Fore.WHITE}{tarea['name']} - {estado}")
        
        print(Fore.CYAN +"\nEstas son todas las tareas de la lista\n")

        print(Fore.CYAN +"Pulsa la tecla ENTER para volver al menú:")
        input()
        self.inicio_administrador()


    def borrar_tarea(self):

        """
        Borra una tarea de la lista de tareas.

        """
        print(Fore.YELLOW +"\nLISTADO DE TAREAS:")
        self.mostrar_tareas_simple()

        print(Fore.CYAN +"\nElige una tarea para borrar:")
        id = input().strip()   # El usuario elige la tarea que desea borrar

        id = self.validar_seleccion_tarea(id)
        if id == None:
            return
        
        self.tareas.pop(id - 1) # self.tareas está organizada a partir del indice 0, de manera que se debe restar 1 al número introducido por el usuario para que coincida con el indice de la lista
        
        self.modificar_json_simple(self.tareas)

        print(Fore.GREEN +"\nTarea borrada correctamente\n")

        print(Fore.CYAN +"Pulsa la tecla ENTER para volver al menú:")
        input()
        self.inicio_administrador()


    def editar_tarea(self):

        """
        Edita el nombre (descripción) de una tarea.

        """
        print(Fore.YELLOW +"\nLISTADO DE TAREAS:")
        self.mostrar_tareas_simple()

        print(Fore.CYAN +"\nElige una tarea para editar:")
        id = input().strip()

        id = self.validar_seleccion_tarea(id)
        if id == None:
            return
        
        print(Fore.CYAN +"\nIngresa el nuevo nombre de la tarea:")
        nombre = input()

        i = 0
        while (i < len(self.tareas)):   #Buscamos la tarea que el usuario elija y actualizamos su nombre (descripción)
            if i == id - 1:
                self.tareas[i].update({'name': nombre})
                self.modificar_json_simple(self.tareas)
            i += 1

        print(Fore.GREEN +"\nTarea actualizada correctamente\n")

        print(Fore.CYAN +"Pulsa la tecla ENTER para volver al menú:")
        input()
        self.inicio_administrador()


    def completar_tarea(self):

        """
        Marca una tarea como completada.

        """

        print(Fore.YELLOW +"\nLISTADO DE TAREAS:")
        self.mostrar_tareas_simple()

        print(Fore.CYAN +"\nElige una tarea para completar:")
        id = input().strip()

        id = self.validar_seleccion_tarea(id)
        if id == None:
            return

        i = 0
        while (i <= len(self.tareas)):   #Buscamos la tarea que el usuario elija y actualizamos su estado (de pendiente a completada)
            if i == (id - 1) and self.tareas[i].get('completed') == False:
                self.tareas[i].update({'completed': True})
                self.modificar_json_simple(self.tareas)
            elif i == (id - 1) and self.tareas[i].get('completed') == True:
                print(Fore.CYAN +"\nEsa tarea ya ha sido completada\n")

                print(Fore.CYAN +"Pulsa la tecla ENTER para volver al menú:")
                input()
                self.inicio_administrador()
            i += 1
        
        print(Fore.GREEN +"\nTarea completada correctamente\n")
        
        print(Fore.CYAN +"Pulsa la tecla ENTER para volver al menú:")
        input()
        self.inicio_administrador()

    def mostrar_tareas_simple(self):

        """
        Muestra las tareas mientras se da la ejecución de otros métodos (borrar, editar, completar).

        """

        self.comprobar_json()

        if len(self.tareas) == 0:
            print(Fore.CYAN +"\nNo se encontraron tareas que mostrar.\n")
            
            print(Fore.CYAN +"Pulsa la tecla ENTER para volver al menú:")
            input()
            self.inicio_administrador()
        
        i = 0
        for tarea in self.tareas:     
            i += 1  #Se asigna el valor de la variable i + 1 a cada elemento de la lista
            estado = Fore.GREEN +'Completada' if tarea['completed'] else Fore.RED +'Pendiente'
            print(f"{Fore.YELLOW}{i}. {Fore.WHITE}{tarea['name']} - {estado}")

    def modificar_json_simple(self, data):
        with open(self.filename, 'w') as file:
            json.dump(data, file, indent=4)

    
    def validar_seleccion_tarea(self, id):

        """
        Verifica que el usuario introduzca un valor numérico válido para la selección de una tarea.

        """

        self.comprobar_json()
        
        if not id.strip():  # Si la cadena está vacía después de eliminar espacios en blanco.
            print(Fore.RED + "\nNo has introducido nada.\n")

            input(Fore.CYAN + "Pulsa la tecla ENTER para volver al menú:")
            self.inicio_administrador()
            return None

        try:
            id = int(id)  # Intenta convertir el input a un número entero.

            if id > len(self.tareas) or id < 1:  # Verifica si el número está fuera del rango. válido
                print(Fore.RED + "\nTarea no encontrada.\n")

                input(Fore.CYAN + "Pulsa la tecla ENTER para volver al menú:")
                self.inicio_administrador()
                return None
            
            return id   # Si el valor introducido es correcto, se retorna el valor.
            
        except ValueError:
            print(Fore.RED + "\nNo has introducido un número.\n")

            input(Fore.CYAN + "Pulsa la tecla ENTER para volver al menú:")
            self.inicio_administrador()
            return None

    def comprobar_json(self):

        """
        Esta función se encarga de comprobar si el archivo JSON que contiene la lista de tareas existe o no.

        """
        try:   
            with open(self.filename, 'r') as file:
                self.tareas = json.load(file)
        except FileNotFoundError:
            self.tareas = []
        except json.decoder.JSONDecodeError:
            self.tareas = []


"""
Por último, el if __name__ == "__main__" es el punto de entrada del programa.

"""
        
if __name__ == "__main__":
    admin = AdministradorTareas()
    admin.inicio_administrador()
    
