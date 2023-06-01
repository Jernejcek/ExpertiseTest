pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                git branch: '**', url: 'https://github.com/Jernejcek/ExpertiseTest.git'
                sh 'npm ci'
                sh 'npm run build'

            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying'
            }
        }
    }
}