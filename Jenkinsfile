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
    }
    post {
        success {
            script {
                    def recipients = findRecipients()
                    def changelogContent = readChangelog()
                    
                    if (recipients) {
                        emailext(
                            to: recipients.join(', '),
                            subject: "New Version Available - Build #${env.BUILD_NUMBER}",
                            body: "The build was successful. A new version is now available.\n\n### Change Log:\n${changelogContent}"
                        )
                    }
                }
            echo 'Pipeline executed successfully'
        }
        failure {
            echo 'Pipeline execution failed'
        }
    }
}

// Helper function to find recipients with @siemens.com
def findRecipients() {
    def teamMembers = []
    // List of email addresses with @siemens.com
    teamMembers.addAll(["markyasser2011@gmail.com"]) // Add all relevant email addresses
    return teamMembers
}

// Helper function to read the CHANGELOG.md file
def readChangelog() {
    def changelogFile = 'CHANGELOG.md'
    return readFile(changelogFile).trim()
}
