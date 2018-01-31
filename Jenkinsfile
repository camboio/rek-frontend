pipeline {
   agent any
   stages {
      stage('yarn') {
         steps {
            sh 'npm install'
         }
      }
      stage('gulp') {
         steps {
            sh 'npx gulp build'
         }
      }
   }
   post {
      success {
         sh 'ssh pepperonio@pepperon.io "mkdir -p ~/public_html/rek"'
         sh 'scp -r ./build/* pepperonio@pepperon.io:rek/'
      }
   }
}
