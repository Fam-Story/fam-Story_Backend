podTemplate(yaml: '''
              apiVersion: v1
              kind: Pod
              metadata:
                generateName: kaniko-
              spec:
                containers:
                - name: kaniko
                  image: gcr.io/kaniko-project/executor:latest
                  imagePullPolicy: IfNotPresent
                  args: ["--dockerfile=$(WORKSPACE)/Dockerfile",
                         "--context=$(WORKSPACE)",
                         "--destination=synoti21/famstory-backend:latest"]
                  volumeMounts:
                    - name: docker-config
                      mountPath: /kaniko/.docker
                volumes:
                - name: docker-config
                  secret:
                    secretName: regcred
''') {

  node(POD_LABEL) {
    stage('Checkout Code') {
      checkout([
        $class: 'GitSCM',
        branches: [[name: '*/main']],
        userRemoteConfigs: [[
          url: 'https://github.com/Fam-Story/fam-Story_Backend',
          credentialsId: 'jenkins-github'
        ]]
      ])
    }
    
    stage('Build and Push Docker Image') {
      container('kaniko') {
        sh """
        /kaniko/executor \
        --dockerfile=${WORKSPACE}/Dockerfile \
        --context=${WORKSPACE} \
        --destination=synoti21/famstory-backend:latest
        """
      }
    }
  }
}
