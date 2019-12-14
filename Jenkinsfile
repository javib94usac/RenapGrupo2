pipeline {
    agent none 
    stages {
        stage('Build') {
            agent { 
                docker { 
                    image 'node:6.3' 
                    label 'nodejscontainer'
                } 
                
            }
            steps {
                sh 'echo Instalando Dependencias......'
                sh 'npm install jshint -g'
                sh 'cd Micro_Servicio_Actas_Nacimiento && npm install'
                sh 'cd ..'
                sh 'cd Micro_Servicio_Actas_Nacimiento/Test && npm install'
                sh 'cd ../..'
                sh 'ls'
                sh 'cd Micro_Servicio_Actas_Defuncion && npm install'
                sh 'cd ..'
                sh 'cd Micro_Servicio_Actas_Defuncion/Test && npm install'
                sh 'cd ../..'
                sh 'ls'
                sh 'cd Micro_Servicio_Actas_Matrimonio && npm install'
                sh 'cd ..'
                sh 'cd Micro_Servicio_Actas_Matrimonio/Test && npm install'
                sh 'cd ../..'
                sh 'cd Micro_Servicio_Actas_Divorcio && npm install'
                sh 'cd ..'
                sh 'cd Micro_Servicio_Actas_Divorcio/Test && npm install'
                sh 'cd ../..'
        stage('Test') {
            agent { label 'nodejscontainer'  }
            steps {
        
                sh 'echo Corriendo Pruebas......'
                sh 'cd Micro_Servicio_Actas_Nacimiento/Test && npm run test'
                sh 'cd ..'
                sh 'ls'
                //sh 'jshint public/javascripts/Comprobaciones.js'
                //sh 'jshint ./routes/actaNacimiento.js'
                sh 'cd ../..'
                sh 'cd Micro_Servicio_Actas_Defuncion/Test && npm run test'
                sh 'cd ..'
                //sh 'jshint ./public/javascripts/Comprobaciones.js'
                //sh 'jshint ./routes/actaDefincion.js'
                sh 'cd ../..'
                sh 'cd Micro_Servicio_Actas_Matrimonio/Test && npm run test'
                sh 'cd ..'
                //sh 'jshint ./public/javascripts/Comprobaciones.js'
                //sh 'jshint ./routes/matrimonio.js'
                sh 'cd ../..'
                sh 'cd Micro_Servicio_Actas_Divorcio/Test && npm run test'
                sh 'cd ..'
                //sh 'jshint ./public/javascripts/Comprobaciones.js'
                //sh 'jshint ./routes/actaDivorcio.js'
                sh 'cd ../..'
            }
        }
        stage('Deploy') {
            agent {
                node {
                    label 'localserver'
                    customWorkspace '/home/javib94/app/RenapGrupo2/'
                }
            }
            steps {
                sh 'echo Pruebas Aprobadas...'
                sh 'echo Actualizando el servidor...'
                sh 'cd /home/javib94/app/RenapGrupo2/'
                sh 'eval $(ssh-agent -s)'
                sh 'ssh-add ~/.ssh/javib94'
                sh 'git checkout cicd'
                sh 'git pull origin cicd'
                sh 'docker-compose down'
                sh 'docker-compose up -d'
            }
        }
    }
}