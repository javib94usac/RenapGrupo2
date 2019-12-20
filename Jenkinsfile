pipeline {
    agent none 
    stages {
        stage('BUILD & TEST') {
            agent { 
                docker { 
                    image 'node:6.3' 
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
        stage('DEPLOY') {
            agent {
                node {
                    label 'master'
                    customWorkspace '/home/javib94/app/RenapGrupo2/'
                }
            }
            steps {
                sh 'echo Pruebas Aprobadas...'
                sh 'echo Actualizando el servidor...'
                sh 'su javib94'
                sh 'cd /home/javib94/app/RenapGrupo2'
                sh 'docker-compose down'
                //sh 'sudo sed -i \'s+https://github.com+ssh://git@github.com+g\' .git/config'
                //sh 'eval $(ssh-agent -s)'
                //sh 'echo $SSH_AUTH_SOCK'
                //sh 'ssh-add /home/javib94/.ssh/javib94'
                sh 'git checkout cicd'
                sh 'git pull'
                sh 'cd Micro_Servicio_Actas_Nacimiento'
                sh 'docker run -v "$PWD":/usr/src/app -w /usr/src/app node:13.3.0 npm install'
                sh 'cd ..'
                sh 'cd Micro_Servicio_Actas_Matrimonio'
                sh 'docker run -v "$PWD":/usr/src/app -w /usr/src/app node:13.3.0 npm install'
                sh 'cd ..'
                sh 'cd Micro_Servicio_Actas_Divorcio'
                sh 'docker run -v "$PWD":/usr/src/app -w /usr/src/app node:13.3.0 npm install'
                sh 'cd ..'
                sh 'cd Micro_Servicio_Actas_Defuncion'
                sh 'docker run -v "$PWD":/usr/src/app -w /usr/src/app node:13.3.0 npm install'
                sh 'cd ..'
                sh 'cd Micro_Servicio_Almacenamiento'
                sh 'docker run -v "$PWD":/usr/src/app -w /usr/src/app node:13.3.0 npm install'
                sh 'cd ..'
                sh 'cd Micro_Servicio_ESB'
                sh 'docker run -v "$PWD":/usr/src/app -w /usr/src/app node:13.3.0 npm install'
                sh 'cd ..'
                sh 'cd Micro_Servicio_Cliente_Interno'
                sh 'docker run -v "$PWD":/usr/src/app -w /usr/src/app node:13.3.0 npm install'
                sh 'cd..'
                sh 'docker-compose up -d'
            }
        }
    }
}