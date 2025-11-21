pipeline {
    agent any

    environment {
        // This is what the frontend uses to call the backend INSIDE the cluster
        VITE_API_BASE_URL = 'http://backend-service:3000/api'
        BACKEND_IMAGE = 'pharmfind-backend:latest'
        FRONTEND_IMAGE = 'pharmfind-frontend:latest'
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
                sh '''
                echo "Building backend image..."
                docker build -f server/Dockerfile.backend \
                    -t ${BACKEND_IMAGE} \
                    server
                '''
            }
        }

        stage('Build frontend image') {
            steps {
                sh '''
                echo "Building frontend image..."
                docker build -f Dockerfile.frontend \
                    --build-arg VITE_API_BASE_URL=${VITE_API_BASE_URL} \
                    -t ${FRONTEND_IMAGE} \
                    .
                '''
            }
        }

        stage('Load images into Minikube') {
            steps {
                sh '''
                echo "Loading images into Minikube..."
                minikube image load ${BACKEND_IMAGE}
                minikube image load ${FRONTEND_IMAGE}
                '''
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh '''
                echo "Applying Kubernetes manifests..."
                kubectl apply -f ${K8S_DIR}/k8s-backend.yaml
                kubectl apply -f ${K8S_DIR}/k8s-frontend.yaml

                echo "Waiting for backend deployment..."
                kubectl rollout status deployment/backend-deployment

                echo "Waiting for frontend deployment..."
                kubectl rollout status deployment/frontend-deployment-v2

                echo "Current pods:"
                kubectl get pods
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Deploy successful! Open the app with:  minikube service frontend-service'
        }
        failure {
            echo '❌ Deploy failed. Check the console log for errors.'
        }
    }
}
