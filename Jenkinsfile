pipeline {
    agent {
        kubernetes{
            yaml '''
            apiVersion: v1
            kind: Pod
            metadata:
              name: kaniko
              namespace: cicd
            spec:
              containers:
              - name: kaniko
                image: gcr.io/kaniko-project/executor:latest
                args: ["--dockerfile=/workspace/dockerfile",
                        "--context=dir://workspace",
                        "--destination=synoti21/famstory-backend"]
                volumeMounts:
                  - name: kaniko-secret
                    mountPath: /kaniko/.docker
                  - name: dockerfile-storage
                    mountPath: /workspace
              restartPolicy: Never
              volumes:
                - name: kaniko-secret
                  secret:
                    secretName: regcred
                    items:
                      - key: .dockerconfigjson
                        path: config.json
                - name: dockerfile-storage
                  persistentVolumeClaim:
                    claimName: dockerfile-claim
            '''
        }
        
    }
    

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
