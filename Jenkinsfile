pipeline {
    agent any
    stages {
        stage('Check Change Log') {
            steps {
                script {
                    // Run the changelog check and capture the output
                    def changelogOutput = sh(script: './check-changelog.sh', returnStdout: true).trim()
                    echo "Change Log Output: ${changelogOutput}"
                    
                    // Validate the output of the changelog script
                    if (changelogOutput.contains("Error")) { // Adjust this condition based on your script's output
                        error("Changelog check failed. Please review the changelog.")
                    }
                }
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh 'npm run test'
            }
        }
        stage('Check Test Coverage') {
            steps {
                // Check the code coverage if it is above 95% then only proceed
                script {
                    def coverageOutput = sh(script: 'npm run test:coverage', returnStdout: true).trim()
                    echo "Coverage Output: ${coverageOutput}"
                    if (!coverageOutput.contains("Statements: 95%")) {
                        error("Code coverage is below 95%.")
                    }
                }
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Push To Private Registry') {
            steps {
                // Configure npm to use Verdaccio as the private registry
                sh 'npm set registry http://localhost:4873/'

                // Login to the private registry (if needed)
                // sh 'npm login --registry=http://localhost:4873/'

                // Publish the package
                sh 'npm publish --registry http://localhost:4873/'
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
