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
        stage('Push') {
            steps {
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
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