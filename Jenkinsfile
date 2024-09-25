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
        // stage('Push To Private Registry') {
        //     steps {
                
        //     }
        // }
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
