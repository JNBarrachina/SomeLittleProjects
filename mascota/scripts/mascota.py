import sys
from PyQt5.QtCore import Qt, QTimer
from PyQt5.QtGui import QMovie
from PyQt5.QtWidgets import QApplication, QLabel, QMainWindow

class MascotaWindow(QMainWindow):
    def __init__(self):
        super().__init__()

        # Configuración inicial de la ventana
        self.setWindowTitle("Mascota en el escritorio")
        self.setGeometry(100, 100, 200, 200)  # Tamaño y posición de la ventana
        # self.setAttribute(Qt.WA_TranslucentBackground)  # Hacer la ventana transparente

        # Etiqueta donde se mostrará el GIF
        self.label = QLabel(self)
        self.movie = QMovie("/home/nbjuan/Mascota/imagenes/right.gif")  # Ruta del GIF de la mascota
        self.label.setMovie(self.movie)
        self.movie.start()  # Iniciar la animación del GIF
        
        # Establecer el tamaño de la etiqueta al tamaño del GIF
        self.label.resize(self.movie.currentImage().size())

        # Hacer que la ventana no tenga bordes
        self.setWindowFlags(Qt.FramelessWindowHint)

        # Posicionar la ventana inicialmente
        self.x_pos = 0
        self.y_pos = 0

        # Timer para mover la mascota
        self.timer = QTimer(self)
        self.timer.timeout.connect(self.mover_mascota)
        self.timer.start(50)  # Actualiza la posición cada 50ms

    def mover_mascota(self):
        # Lógica para mover la mascota
        self.x_pos += 5  # Mueve la mascota hacia la derecha
        if self.x_pos > self.screen().size().width():  # Si llega al borde derecho, reinicia
            self.x_pos = 0
        self.move(self.x_pos, self.y_pos)  # Actualiza la posición de la ventana


if __name__ == '__main__':
    app = QApplication(sys.argv)
    window = MascotaWindow()
    window.show()
    sys.exit(app.exec_())
