pipeline {
    agent { docker { image 'node:6.3' } }
    stages {
        stage('build') {
            steps {
                sh 'echo Instalando Dependencias......'
                sh 'cd Micro_Servicio_Actas_Nacimiento && npm install'
                sh 'cd ..'
                sh 'cd Micro_Servicio_Actas_Nacimiento/Test && npm install'
                sh 'cd ../..'
                /*
                sh 'ls'
                sh 'cd Micro_Servicio_Actas_Defuncion && npm install'
                sh 'cd ..'
                sh 'cd Micro_Servicio_Actas_Defuncion/Test && npm install'
                sh 'cd ../..'
                sh 'ls'
                */
            }   
        }
        stage('test') {
            steps {
                sh 'echo Corriendo Pruebas......'
                sh 'cd Micro_Servicio_Actas_Nacimiento/Test && npm run test'
                sh 'cd ../..'
                sh 'cd Micro_Servicio_Actas_Defuncion/Test && npm run test'
            }
        }
        stage('deploy') {
            steps {
                sh 'echo Actualizando el servidor...'
                sh 'npm --version'

            }
        }
    }
}