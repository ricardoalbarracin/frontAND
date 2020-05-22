pipeline {
    agent none
    stages {
        stage('Fetch Dependencies') {
            agent {
                docker {
                    image 'node:10.9.0'
                    args '-u 0:0'
                }
            }
            steps {
                dir("src"){
                    sh 'npm install'
                    sh 'npm i -D puppeteer karma-chrome-launcher'
                    sh 'npm install -g @angular/cli@8.1.3'
                    stash includes: 'node_modules/**/*', name: 'node_modules'
                }
            }
        }
        stage('Unit Test') {
            agent {
                docker {
                    image 'node:10.9.0'
                    args '-u 0:0'
                }
            }
            steps {
                dir("src"){
                    sh '''
                        apt-get update && apt-get install -y \
                        wget unzip fontconfig locales gconf-service \
                        libasound2 libatk1.0-0 libc6 libcairo2 libcups2 \
                        libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 \
                        libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 \
                        libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 \
                        libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 \
                        libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates \
                        fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils \
                        wget
                    '''
                    sh 'node_modules/.bin/ng test --watch=false'
                }
            }
        }
        stage('Scanner SonarQube') {
            agent any
            environment {
                scannerHome = tool 'SonarQubeScanner'
            }
            tools {nodejs "NodeV10.9.0"}
            steps {
                withSonarQubeEnv('sonarqube') {
                    sh "${scannerHome}/bin/sonar-scanner -X"
                }
            }
        }
        stage('Build App Angular') {
            agent {
                docker {
                    image 'node:10.9.0'
                    args '-u 0:0'
                }
            }
           environment {
               PATH = "/src/node_modules/.bin/:$PATH"
           }
            steps {
                unstash 'node_modules'
                dir("src"){
                    sh 'npm run-script build'
                    stash includes: 'dist/**/*', name: 'dist'
                }
            }
        }
        stage('Push Imagen') {
            agent any
            when {
                anyOf {
                    branch 'dev';
                    branch 'test';
                    branch 'master'
                }
            }
            steps {
                script{
                    app = docker.build("tramites-servicios/tramites-servicios-spa")
                    docker.withRegistry('http://registry.and.local:5000') {
                        app.push(env.BRANCH_NAME)
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploy'
            }
        }

    }
}