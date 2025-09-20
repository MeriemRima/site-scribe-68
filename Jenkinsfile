pipeline {
    agent {
        docker { image 'node:20' } // Node.js 20 image from Docker Hub
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
    }

    post {
        always {
            junit '**/test-results/*.xml' // Make sure your tests generate XML reports
        }
    }
}
