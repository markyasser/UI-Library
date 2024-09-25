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
                def changelogContent = convertMarkdownToHtml('CHANGELOG.md')

                if (recipients) {
                    emailext(
                        to: recipients.join(', '),
                        subject: "New Version Available - Build #${env.BUILD_NUMBER}",
                        body: """<html>
                            <body>
                                <p>The build was successful. A new version is now available.</p>
                                <h3>Change Log:</h3>
                                ${changelogContent}
                            </body>
                        </html>""",
                        mimeType: 'text/html'
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

// Helper function to read and convert the CHANGELOG.md file from markdown to HTML
def convertMarkdownToHtml(markdownFile) {
    def markdownContent = readFile(markdownFile).trim()
    // Convert the markdown content to HTML (you can use an external command or library)
    def htmlContent = sh(script: "echo \"${markdownContent}\" | markdown", returnStdout: true).trim()
    return htmlContent
}
