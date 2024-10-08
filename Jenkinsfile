pipeline {
    agent any
    stages {
        stage('Check Change Log') {
            steps {
                script {
                    // Run the changelog check and capture the output
                    try {
                        def changelogOutput = sh(script: './check-changelog.sh', returnStdout: true).trim()
                        env.CHANGELOG_CHANGES = changelogOutput
                    } catch (Exception e) {
                        env.FAILED_STAGE = 'Check Change Log'
                        env.FAILED_MESSAGE = e.getMessage()
                        error("Stage failed: ${env.FAILED_STAGE}") // Mark the stage as failed
                    }
                }
            }
        }
        stage('Install Dependencies') {
            steps {
                script {
                    try {
                        // Capture output of npm install
                        def installOutput = sh(script: 'npm install', returnStdout: true).trim()
                        echo installOutput
                    } catch (Exception e) {
                        env.FAILED_STAGE = 'Install Dependencies'
                        env.FAILED_MESSAGE = e.getMessage()
                        error("Stage failed: ${env.FAILED_STAGE}") // Mark the stage as failed
                    }
                }
            }
        }
        stage('Test') {
            steps {
                script {
                    try {
                        // Capture output of npm test
                        def testOutput = sh(script: 'npm run test', returnStdout: true).trim()
                        echo testOutput
                    } catch (Exception e) {
                        env.FAILED_STAGE = 'Test'
                        env.FAILED_MESSAGE = e.getMessage()
                        error("Stage failed: ${env.FAILED_STAGE}") // Mark the stage as failed
                    }
                }
            }
        }
        stage('Check Test Coverage') {
            steps {
                script {
                    try {
                        sh './check-coverage.sh'
                    } catch (Exception e) {
                        env.FAILED_STAGE = 'Check Test Coverage'
                        env.FAILED_MESSAGE = e.getMessage()
                        error("Stage failed: ${env.FAILED_STAGE}") // Mark the stage as failed
                    }
                }
            }
        }
        stage('Build') {
            steps {
                script {
                    try {
                        // Capture output of npm run build
                        def buildOutput = sh(script: 'npm run build', returnStdout: true).trim()
                        echo buildOutput
                    } catch (Exception e) {
                        env.FAILED_STAGE = 'Build'
                        env.FAILED_MESSAGE = e.getMessage()
                        error("Stage failed: ${env.FAILED_STAGE}") // Mark the stage as failed
                    }
                }
            }
        }
        stage('Push on private registry') {
            steps {
                withCredentials([string(credentialsId: 'npm-auth-token', variable: 'NPM_TOKEN')]) {
                    script {
                        try {
                            // Capture output of npm publish
                            def publishOutput = sh(script: 'npm publish', returnStdout: true).trim()
                            echo publishOutput
                        } catch (Exception e) {
                            env.FAILED_STAGE = 'Push on private registry'
                            env.FAILED_MESSAGE = e.getMessage()
                            error("Stage failed: ${env.FAILED_STAGE}") // Mark the stage as failed
                        }
                    }
                }
            }
        }
    }
    post {
        success {
            script {
                if (currentBuild.result == 'SUCCESS') {
                    def recipients = findRecipients()

                    if (!env.CHANGELOG_CHANGES) {
                        echo 'No changes found in the changelog.'
                    } else {
                        def htmlChanges = env.CHANGELOG_CHANGES.split('\n').collect { "<li>${it.trim()}</li>" }.join('\n')
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
            }
            echo 'Pipeline executed successfully'
        }
        failure {
            script {
                def failedStage = env.FAILED_STAGE
                def failureReason = env.FAILED_MESSAGE

                emailext(
                    to: 'markyasser2011@gmail.com',
                    subject: "Pipeline Failure - Stage: ${failedStage}",
                    body: """
                        <html>
                            <body>
                                <h2 style="color: #E74C3C;">Pipeline Failed!</h2>
                                <p>Dear Team,</p>
                                <p>The pipeline failed during the <strong>${failedStage}</strong> stage.</p>
                                <h3 style="color: #C0392B;">Failure Details:</h3>
                                <pre>${failureReason}</pre>
                                <p>Please investigate the issue at your earliest convenience.</p>
                                <p>Best regards,<br>Your CI/CD System</p>
                            </body>
                        </html>
                    """
                )
            }
            echo 'Pipeline execution failed'
        }
    }
}
