pipeline {
    agent any

    environment {
        DOCKER_REGISTRY = 'docker.io'
        DOCKER_USERNAME = 'synoti21'
        DOCKER_IMAGE = 'famstory-backend'
        TAG = 'latest'
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }
        
        stage('Build and Push Docker Image') {
            steps {
                container('kaniko') {
                    sh """
                    /kaniko/executor --context ${WORKSPACE} \
                                     --dockerfile ${WORKSPACE}/Dockerfile \
                                     --destination ${DOCKER_REGISTRY}/${DOCKER_USERNAME}/${DOCKER_IMAGE}:${TAG}
                    """
                }
            }
        }
    }

    post {
        success {
            echo 'Build and push succeeded'
        }
        failure {
            echo 'Build and push failed'
        }
    }
}
