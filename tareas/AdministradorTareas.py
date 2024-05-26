import json
import os

from Tarea import Tarea

class AdministradorTareas:
    def __init__(self):
        self.tareas: list[Tarea] = []
        self.filename: str = os.path.dirname(os.path.abspath(__file__)) + '/lista.json'

    def agregar_tarea(self):
        print("\nIngresa el nombre de la nueva tarea:")
        nombre = input()
        estado = False

        try:
            # Cargar la lista de tareas existente
            with open(self.filename, 'r') as file:
                self.tareas: list[Tarea] = json.load(file)
        except FileNotFoundError:
            self.tareas: list[Tarea]  = []
        except json.decoder.JSONDecodeError:
            self.tareas: list[Tarea]  = []

        input_data = {"name": nombre, "completed": estado}
        self.tareas.append(input_data)

        # Guardar la lista de tareas actualizada
        with open(self.filename, 'w') as file:
            json.dump(self.tareas, file, indent=4)

        print(f"\nTarea '{nombre}' agregada correctamente\n")
        self.inicio_administrador()

    def mostrar_tareas(self):
        try:
            # Cargar la lista de tareas existente
            with open(self.filename, 'r') as file:
                self.tareas: list[Tarea] = json.load(file)
        except FileNotFoundError:
            self.tareas: list[Tarea] = []
        except json.decoder.JSONDecodeError:
            self.tareas: list[Tarea] = []
        
        if len(self.tareas) == 0:
            print("\nNo se encontraron tareas\n")
            self.inicio_administrador()
            return
        else:
            i = 0
            for tarea in self.tareas:
                i += 1
                print(f"{i}. {tarea['name']} - {'Completada' if tarea['completed'] else 'Pendiente'}")
        
        self.inicio_administrador()

    def borrar_tarea(self):
        self.mostrar_tareas_simple()
        print("\nElige una tarea para borrar:")
        numero = int(input())

        try:
            if numero > len(self.tareas) or numero < 1:
                print("\nTarea no encontrada\n")
                self.borrar_tarea()
                return
        except ValueError:
            print("\nIntroduce un número asociado a la tarea\n")
            self.borrar_tarea()
            return
        
        
        self.tareas.pop(numero - 1)
        with open(self.filename, 'w') as file:
            json.dump(self.tareas, file, indent=4)

        print("\nTarea borrada correctamente\n")

        # Guardar la lista de tareas actualizada
        with open(self.filename, 'w') as file:
            json.dump(self.tareas, file, indent=4)

        self.inicio_administrador()
        

    def editar_nombre_tarea(self):
        self.mostrar_tareas_simple()
        print("\nElige una tarea para editar:")
        id = int(input()) - 1

        try:
            if id > len(self.tareas) or id < 0:
                print("\nTarea no encontrada\n")
                self.editar_nombre_tarea()
                return
        except ValueError:
            print("\nIntroduce un número asociado a la tarea\n")
            self.editar_nombre_tarea()
            return
        
        print("\nIngresa el nuevo nombre de la tarea:")
        nombre = input()

        i = 0
        while (i < len(self.tareas)):
            if i == id:
                self.tareas[i].update({'name': nombre})
                self.modificar_json_simple(self.tareas)
            i += 1

        self.inicio_administrador()

    def completar_tarea(self):
        self.mostrar_tareas_simple()
        print("\nElige una tarea para completar:")
        id = int(input()) - 1

        try:
            if id > len(self.tareas) or id < 0:
                print("\nTarea no encontrada\n")
                self.completar_tarea()
                return
        except ValueError:
            print("\nIntroduce un número asociado a la tarea\n")
            self.completar_tarea()
            return

        i = 0
        while (i <= len(self.tareas)):
            if i == id and self.tareas[i].get('completed') == False:
                self.tareas[i].update({'completed': True})
                self.modificar_json_simple(self.tareas)
            elif i == id and self.tareas[i].get('completed') == True:
                print("\nTarea ya completada\n")
                self.completar_tarea()
            i += 1
        
        print("\nTarea completada correctamente\n")
        self.inicio_administrador()

    def mostrar_tareas_simple(self):
        if len(self.tareas) == 0:
            try:
                # Cargar la lista de tareas existente
                with open(self.filename, 'r') as file:
                    self.tareas: list[Tarea] = json.load(file)
            except FileNotFoundError:
                self.tareas: list[Tarea] = []
            except json.decoder.JSONDecodeError:
                self.tareas: list[Tarea] = []

        if len(self.tareas) == 0:
            print("\nNo se encontraron tareas\n")
            self.inicio_administrador()
        
        i = 0
        for tarea in self.tareas:
            i += 1
            print(f"{i}. {tarea['name']} - {'Completada' if tarea['completed'] else 'Pendiente'}")

    def modificar_json_simple(self, data):
        with open(self.filename, 'w') as file:
            json.dump(data, file, indent=4)

    def inicio_administrador(self):
        print("\nBienvenido al Administrador de Tareas\n")
        print("1. Agregar Tarea")
        print("2. Mostrar Tareas")
        print("3. Borrar Tarea")
        print("4. Editar Tarea")
        print("5. Completar Tarea")
        print("6. Salir")

        print("\nElige una opción:")
        numero = int(input())

        # TODO: Manejar la excepción
        match numero:
            case 1:
                self.agregar_tarea()
            case 2:
                self.mostrar_tareas()
            case 3:
                self.borrar_tarea()
            case 4:
                self.editar_nombre_tarea()
            case 5:
                self.completar_tarea()
            case 6:
                print("\nHasta pronto :)\n")
                exit()
            case _:
                print("\nNo se ha encontrado la función solicitada\n")
        
        
if __name__ == "__main__":
    admin = AdministradorTareas()
    admin.inicio_administrador()
    
