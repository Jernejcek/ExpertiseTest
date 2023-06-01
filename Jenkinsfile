pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                git branch: '**', url: 'https://github.com/Jernejcek/ExpertiseTest.git'
                sh 'docker build -t connectivity-test-server .'
            }
        }
        stage('Deploy') {
            steps {
                echo 'deploying'
            }
        }
    }
}