pipeline {
    agent {
        kubernetes {
          yaml '''
            apiVersion: v1
            kind: Pod
            spec:
              containers:
              - name: docker
                image: docker:latest
                command:
                - cat
                tty: true
                volumeMounts:
                 - mountPath: /var/run/docker.sock
                   name: docker-sock
              volumes:
              - name: docker-sock
                hostPath:
                  path: /var/run/docker.sock    
            '''
        }
  }

    environment {
        DOCKER_IMAGE = "famstory"
        REGISTRY = "synoti21"
        TAG = "latest"
    }

    stages {
        stage('Clone repository') {
            steps {
                git branch: 'develop', credentialsId: 'synoti21-github-token', url: 'https://github.com/Fam-Story/fam-Story_Backend'
            }
        }
        stage('Build and push Docker image') {
            steps {
                script {
                    docker.build("$REGISTRY/$DOCKER_IMAGE:$TAG").push()
                }
            }
        }
        stage('Update Kubernetes manifests') {
            steps {
                script {
                    sh "sed -i 's#image: .*#image: $REGISTRY/$DOCKER_IMAGE:$TAG#' k8s/manifest.yaml"
                }
            }
        }
    }
}
