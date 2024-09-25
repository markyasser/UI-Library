pipeline {
    agent any
    stages {
        stage('Check Change Log') {
            steps {
                script {
                    // Run the changelog check and capture the output
                    def changelogOutput = sh(script: './check-changelog.sh', returnStdout: true).trim()
                    
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
        stage('Push on private registry') {
            steps {
                withCredentials([string(credentialsId: 'npm-auth-token', variable: 'NPM_TOKEN')]) {
                    sh 'npm publish'
                }
            }
        }
    }
    post {
        success {
            script {
                def recipients = findRecipients()
                def changelogContent = readChangelog()

                // Get the version of the package.json
                def version = sh(script: 'node -p "require(\'./package.json\').version"', returnStdout: true).trim()
                
                if (recipients) {
                    emailext(
                        to: recipients.join(', '),
                        subject: "UI-Library - Version ${version} Available",
                        body: "The build was successful. A new version is now available.\n<h3> Change Log: </h3>\n\n${changelogContent}"
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

// Helper function to read recipients from a text file
def findRecipients() {
    def recipientsFile = 'recipients.txt'  // The file with the emails
    def emails = readFile(recipientsFile).split('\n').collect { it.trim() }
    return emails.findAll { it } // Filter out any empty lines
}

// Helper function to read the CHANGELOG.md file
def readChangelog() {
    def changelogFile = 'CHANGELOG.md'
    return readFile(changelogFile).trim()
}
