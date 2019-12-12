pipeline {
    agent { docker { image 'node:6.3' } }
    stages {
        stage('build') {
            steps {
                sh 'npm --version'
                sh 'ls -a'
            }
        }
        stage('test') {
            steps {
                sh 'npm --version'
            }
        }
        stage('deploy') {
            steps {
                sh 'npm --version'
            }
        }
    }
}