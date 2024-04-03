pipeline {
    agent any
    
    tools {
        nodejs "nodejs"
    }

    stages {
        // stage("install pnpm"){
        //     steps {
        //         sh 'npm install -g pnpm'
        //     }
        // }
        stage("install") {
            steps {
                sh 'pnpm install'
            }
        }
        stage("build") {
            steps {
                sh 'pnpm run build'
            }
        }
    } 
    
    post {
        success {
            echo "SUCCESSFUL"
        }
        failure {
            echo "FAILED"
        }
    }
}