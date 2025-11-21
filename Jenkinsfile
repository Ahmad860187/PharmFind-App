pipeline {
    agent any

    environment {
        // Images (always latest)
        BACKEND_IMAGE = 'pharmfind-backend:latest'
        FRONTEND_IMAGE = 'pharmfind-frontend:latest'

        // Frontend -> backend URL INSIDE the cluster
        VITE_API_BASE_URL = 'http://backend-service:3000/api'

        // K8s manifests folder
        K8S_DIR = 'k8s'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build backend image') {
            steps {
                bat """
                echo ---- BUILDING BACKEND IMAGE ----
                cd server
                docker build -f Dockerfile.backend -t %BACKEND_IMAGE% .
                """
            }
        }

        stage('Build frontend image') {
            steps {
                bat """
                echo ---- BUILDING FRONTEND IMAGE ----
                docker build -f Dockerfile.frontend ^
                  --build-arg VITE_API_BASE_URL=%VITE_API_BASE_URL% ^
                  -t %FRONTEND_IMAGE% .
                """
            }
        }

        stage('Load images into Minikube') {
            steps {
                bat """
                echo ---- LOADING IMAGES INTO MINIKUBE ----
                minikube image load %BACKEND_IMAGE%
                minikube image load %FRONTEND_IMAGE%
                """
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                bat """
                echo ---- APPLYING KUBERNETES MANIFESTS ----
                kubectl apply -f %K8S_DIR%\\k8s-backend.yaml
                kubectl apply -f %K8S_DIR%\\k8s-frontend.yaml

                echo ---- WAITING FOR BACKEND ----
                kubectl rollout status deployment/backend-deployment

                echo ---- WAITING FOR FRONTEND ----
                kubectl rollout status deployment/frontend-deployment-v2

                echo ---- CURRENT PODS ----
                kubectl get pods
                """
            }
        }
    }

    post {
        success {
            echo '✅ Deploy successful! You can now run:  minikube service frontend-service'
        }
        failure {
            echo '❌ Deploy failed. Check the console log for errors above.'
        }
    }
}
