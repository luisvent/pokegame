pipeline {
    agent {
        node {
            label 'agent1'
            }
      }
    triggers {
        pollSCM '*/5 * * * *'
    }
    stages {
        stage('Dependencies') {
            steps {
                echo "Building.."
                bat """
                npm install
                """
            }
        }
        stage('Building') {
            steps {
                echo "Testing.."
                bat """
                npm run build
                """
            }
        }
        stage('Test') {
            steps {
                echo "Testing.."
                bat """
                """
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deliver....'
                bat """
                echo "doing delivery stuff.."
                cd dist
                xcopy *.* "C:\\Sites\\pokegame_web" /s /e /y
                """
            }
        }
        stage('Running') {
            steps {
                echo "running.."
                bat """
                REM cd "C:\\Sites\\PersonalSiteApi"
                REM start node app.js
                REM call run.bat
                REM Exit with success code 0
                REM exit /b 0
                """
            }
        }
    }
    post {
        success {
          echo "running.."
          bat """
          REM cd "C:\\Sites\\PersonalSiteApi"
          REM node app.js
          REM call run.bat
          REM Exit with success code 0
          exit /b 0
          """
        }
      }
}
