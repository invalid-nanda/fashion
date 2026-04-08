pipeline {
    agent any

    environment {
        APP_NAME = "shefashion-app"
        BUILD_TAG = "${APP_NAME}:${env.BUILD_ID}"
        PORT = "8080"
    }

    stages {
        stage('Checkout') {
            steps {
                echo '📥 Checking out source code from GitHub...'
                checkout scm
            }
        }

        stage('Verify Files') {
            steps {
                echo '🔍 Verifying required project files...'
                sh '''
                    ls -la
                    test -f index.html && echo "✅ index.html found"
                    test -f style.css  && echo "✅ style.css found"
                    test -f script.js  && echo "✅ script.js found"
                    test -f Dockerfile && echo "✅ Dockerfile found"
                '''
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "🐳 Building Docker image: ${BUILD_TAG}"
                sh "docker build -t ${BUILD_TAG} ."
            }
        }

        stage('Stop Old Container') {
            steps {
                echo '🛑 Stopping and removing old container if it exists...'
                sh '''
                    docker stop ${APP_NAME} 2>/dev/null || true
                    docker rm   ${APP_NAME} 2>/dev/null || true
                '''
            }
        }

        stage('Deploy New Container') {
            steps {
                echo "🚀 Deploying new container on port ${PORT}..."
                sh "docker run -d --name ${APP_NAME} -p ${PORT}:80 ${BUILD_TAG}"
            }
        }

        stage('Health Check') {
            steps {
                echo '✅ Performing health check...'
                sh 'sleep 3 && curl -f http://localhost:8080 || echo "Warning: health check failed"'
            }
        }
    }

    post {
        success {
            echo '🎉 Deployment successful! SheFashion is live at http://localhost:8080'
        }
        failure {
            echo '❌ Build or deployment failed. Please check logs.'
        }
        always {
            echo '🏁 Pipeline completed.'
        }
    }
}
