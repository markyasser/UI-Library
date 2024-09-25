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
                    if (changelogOutput.contains("Error")) {
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
                script {
                    // Run the tests and capture the output
                    def testOutput = sh(script: 'npm run test', returnStdout: true).trim()
                    echo "Test Output: ${testOutput}"

                    // Check if coverage is above 95%
                    def coveragePattern = /(?<=All files\s+\|.+?\|)[\d]+/
                    def coverageMatch = (testOutput =~ coveragePattern)

                    if (coverageMatch && coverageMatch[0].toInteger() < 95) {
                        error("Code coverage is below 95%. Actual coverage: ${coverageMatch[0]}%.")
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
                script {
                    // Configure npm to use Verdaccio as the private registry
                    sh 'npm set registry http://localhost:4873/'

                    // Login to the private registry using credentials stored in Jenkins
                    withCredentials([usernamePassword(credentialsId: '1234', passwordVariable: 'NPM_PASSWORD', usernameVariable: 'NPM_USERNAME')]) {
                        sh 'echo "${NPM_PASSWORD}" | npm login --registry=http://localhost:4873/ --scope=@ui-library --username "${NPM_USERNAME}" --password-stdin'
                    }

                    // Publish the package
                    sh 'npm publish --registry http://localhost:4873/'
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
