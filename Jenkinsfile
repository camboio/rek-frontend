pipeline {
   agent any
   stages {
      stage('yarn') {
         steps {
            sh 'yarn install'
         }
      }
      stage('gulp') {
         steps {
            sh 'yarn gulp build'
         }
      }
   }
   post {
      success {
         sh 'ssh pepperonio@pepperon.io "mkdir -p ~/public_html/rek"'
         sh 'scp -r ./build/* pepperonio@pepperon.io:public_html/rek/'
      }
   }
}
