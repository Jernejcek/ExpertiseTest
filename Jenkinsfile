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
        stage('Test') {
            steps {
                sh 'npm ci'
                sh 'npm test'
            }
        }

        stage('Push') {
            when {
                branch 'master'
            }
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
                sh 'docker system prune -a -f --volumes'
                sh 'docker compose -f docker-compose-dev.yml down'
                sh 'docker compose -f docker-compose-dev.yml pull'
                sh 'docker compose -f docker-compose-dev.yml up -d'
            }
        }
    }
    post 
    {
        always
        {
                sh 'docker logout'
        }
    }
}