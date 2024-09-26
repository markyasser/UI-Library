pipeline {
    agent any
    stages {
        stage('Check Change Log') {
            steps {
                script {
                    // Run the changelog check and capture the output
                    def changelogOutput = sh(script: './check-changelog.sh', returnStdout: true).trim()
                    
                    env.CHANGELOG_CHANGES = changelogOutput
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
                    sh './check-coverage.sh '
                }
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        // stage('Push on private registry') {
        //     steps {
        //         withCredentials([string(credentialsId: 'npm-auth-token', variable: 'NPM_TOKEN')]) {
        //             sh 'npm publish'
        //         }
        //     }
        // }
    }
    post {
        success {
            script {
                def recipients = findRecipients()

                // Check if changes were found
                if (!env.CHANGELOG_CHANGES) {
                    echo "No changes found in the changelog."
                } else {
                    // Assuming the changes are comma-separated in the output
                    def htmlChanges = env.CHANGELOG_CHANGES.split('\n').collect { "<li>${it.trim()}</li>" }.join('\n')

                    // Get the version of the package.json
                    def version = sh(script: 'node -p "require(\'./package.json\').version"', returnStdout: true).trim()

                    if (recipients) {
                        emailext(
    to: recipients.join(', '),
    subject: "UI Library - Version ${version} Released",
    body: """
        <html>
            <body>
                <h2 style="color: #2C3E50;">Build Successful!</h2>
                <p>Dear Team,</p>
                <p>We are pleased to announce that a new version of the UI Library has been successfully built and is now available.</p>
                <h3 style="color: #34495E;">Release Notes</h3>
                <ul>
                    ${htmlChanges}
                </ul>
                <p>Thank you for your continued support!</p>
                <p>Best regards,<br>Your CI/CD System</p>
            </body>
        </html>
    """
)

                    }
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

