pipeline {
 agent any
 stages {
  stage('Build'){steps{sh 'docker build -t quiz-app:v1 .'}}
  stage('Push'){steps{sh 'docker push priyanappu/quiz-app:v1'}}
 }
}