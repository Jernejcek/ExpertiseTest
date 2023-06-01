pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('jernejbelcl-dockerhub')
    }
    stages {
        stage('Build') {
            steps {
                sh 'docker build -t jernejcek10/connectivity-test-server:latest .'
            }
        }
        stage('Login') {
            steps {
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
            }
        }
        stage('Push') {
            steps {
                sh 'docker push jernejcek10/connectivity-test-server:latest'
            }
        }
        stage('Deploy') {
            when {
                branch 'master'
            }
            steps {
                echo 'deploying'
            }
        }
    }
    post {
        always {
                sh 'docker logout'
            }
        }
}