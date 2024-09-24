pipeline {
    agent any
    environment {
        NODE_HOME = tool name: 'Node 18.6.0', type: 'NodeJSInstallation'
        PATH = "${NODE_HOME}/bin:${env.PATH}"
    }
    stages {
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t react-ui-library .'
            }
        }
        stage('Run Tests Inside Docker') {
            steps {
                sh 'docker run --rm react-ui-library npm run test'
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
            echo 'Pipeline executed successfully.'
        }
        failure {
            echo 'Pipeline execution failed.'
        }
    }
}
