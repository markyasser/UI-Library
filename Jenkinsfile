pipeline {
    agent any
    stages {
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t react-ui-library .'
            }
        }
        stage('Push Docker Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    sh 'echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin'
                    sh 'docker tag react-ui-library your-docker-registry/react-ui-library:latest'
                    sh 'docker push your-docker-registry/react-ui-library:latest'
                }
            }
        }
    }
    post {
        success {
            echo 'Pipeline executed successfully'
        }
        failure {
            echo 'Pipeline execution failed'
        }
    }
}
