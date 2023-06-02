# ExpertiseTestSimple CTS Backend Application with Node.js Express, Jenkins, and Google Cloud
Welcome to the Simple CTS (Connectivity Test Server) Backend Application repository! This project aims to provide a basic backend server built with Node.js, Express, Jenkins pipeline hosted on Google Cloud.
It includes a Dockerfile for containerization and can be easily run locally for testing purposes.
You can check this CTS Backend Application on (http://34.65.154.30:3000/ping), hosted on Google Cloud.
For Assigment Task 3 solution check folder Assigment - Task 3 - Kubernetes where is configuration file and described why i would use this infrastructure.

Prerequisites
Before running the application, ensure that you have the following dependencies installed on your local machine:

Node.js (version >= 10)
Docker
Jenkins (for automated building, testing, and deployment)

Optionally
Google Cloud Virtual Machine for externally access

# Docker
To use this Docker image, you'll need to have Docker installed on your system. Once you have Docker installed, 
you can build the image using the following command:

`docker build -t connectivity-test-server:latest .`

This command will build the Docker image and tag it with the nameconnectivity-test-server and the tag latest.
Once the image is built, you can push it to a Docker registry using the following command:

`docker run -p 3000:3000 connectivity-test-server:latest`

This assumes that you have the necessary permissions to push images to the registry and that you have authenticated with the registry using docker login or similar.

Now you locally access application: (http://localhost:3000/ping)

# Setting Up Jenkins Pipeline

When you have installed Jenkins you can access it via port 8080, for example locally: (http://localhost:8080) or by server (http://SERVERIP:8080)
If you want to access by GCP, first go to chapter Deploying to Google cloud, and you will need to create new firewall rule which will allow you go through GCP Firewall, not only firewall from VM.

To configure and trigger the Jenkins pipeline for the Simple CTS Backend Application, follow these steps:

1. Create a new Jenkins job: In the Jenkins dashboard, create a new job and choose the "Multibranch Pipeline" option.
2. Configure Branch Sources: In the job configuration, navigate to the "Branch Sources" section. Add a Git source and specify the Project Repository URL.
3. Add Behaviors: In the "Behaviors" section of the Git source configuration, select the "Filter by name (with regular expression)" behavior. Use the regular expression "./" to include all branches in the pipeline.
4. Build Configuration: In the job configuration, go to the "Build Configuration" section. Select the mode "By Jenkinsfile" and set the script path to Jenkinsfile. Make sure you have the Jenkinsfile in the root of your repository.
5. Install and Configure Webhook Trigger: Install the "Scan Multibranch Webhook Trigger" feature in Jenkins. Restart the Jenkins server to apply the changes.
6. Configure Webhook in GitHub: In your GitHub repository settings, navigate to "Webhooks" and add a new webhook. Set the Payload URL to http://serverIP:8080/multibranch-webhook-trigger/invoke?token="mytoken".
Replace serverIP with the IP address of your Jenkins server and <trigger-token> with the token you want to use for triggering the pipeline (e.g., "mytoken").
For example in my case: http://34.65.154.30:3000:8080/multibranch-webhook-trigger/invoke?token=mytoken (I set variable trigger token to mytoken before).
Set the Content type to application/json and trigger the webhook on the push event.
7. Activate the Jenkins Pipeline: Save the Jenkins job configuration, and the pipeline will be activated. It will now trigger whenever new code is pushed to any branch of the repository.

# Jenkins Pipeline

This project includes a Jenkins pipeline (Jenkinsfile) that automates the build, test, and deployment process. Here's an explanation of the Jenkinsfile stages:

**Build:** This stage builds the Docker image for the backend application.

  

**Test:** This stage installs the project dependencies using npm and runs the test suite (I also installed jest to my project, and demonstrate Unit test in file "/tests/resoonse.test.js")

  
  
**Push:** This stage is only triggered when the branch is 'master'. It logs in to Docker Hub using the provided credentials, and then pushes the built Docker image to the Docker Hub registry.

  
  
**Deploy:** This stage is also triggered when the branch is 'master'. I decided to do deployment with docker compose because of simplicity or project,( if you want to know how to do it with kubernetes check folder Assigment - Task 3 - Kubernetes) It performs the following steps:

  
  
1. Prune Docker Resources: It prunes all Docker resources such as containers, images, and volumes to ensure a clean deployment environment. This step helps remove any unused or outdated resources.

  
  
2. Shut Down Existing Containers: It shuts down any existing containers that are defined in the docker-compose-dev.yml file. This ensures that any previous instances of the application are stopped before deploying the updated version.

  
  
3. Pull Latest Images: It pulls the latest images defined in the docker-compose-dev.yml file. This step ensures that the application is deployed with the most up-to-date container images.

  
  
4. Start Containers: It starts the containers in detached mode for deployment. This allows the application to run in the background without blocking the pipeline execution.

  
Post: This section specifies actions to be performed after the pipeline stages have completed. In this case, it ensures that the Docker client is logged out.

  
  
Please note that the Jenkinsfile assumes the existence of a Jenkins credential named 'jernejbelcl-dockerhub', which should store the Docker Hub username and password.
You can simply added adding credentials, but id must be the same as in my case in Jenkinsfile: DOCKERHUB_CREDENTIALS = credentials('jernejbelcl-dockerhub')

Getting Started
To run the application locally, please follow the instructions provided in the original README.md file.

# Deploying to Google Cloud

To deploy the Simple CTS Backend Application to Google Cloud, you can follow these steps:

1. Create a virtual machine (VM) instance on the Google Cloud Platform using Google Compute Engine. Set up the VM with the desired specifications and configurations.
2. Connect to the VM instance via SSH. You can use the SSH client of your choice or the built-in SSH functionality provided by Google Cloud Console.
3. Once connected to the VM, install the necessary software and dependencies:
4. Install needed dependencies
--* Install Docker: Follow the Docker installation instructions specific to your VM's operating system.
--* Install Node.js: You can use a package manager like apt or yum to install Node.js on your VM.
--* Install Jenkins: Download and install Jenkins on your VM following the official Jenkins documentation.
--* Configure Jenkins: Set up Jenkins with the necessary plugins and configurations for your deployment pipeline. Ensure that you have the appropriate credentials configured for accessing your Git repository and Docker Hub.
5. Customize the deployment steps: Open the Jenkinsfile in your repository and navigate to the "Deploy" stage. Modify the deployment steps to match your Google Cloud environment and configuration. This may include additional setup, configuration, or deployment commands specific to your project.
6. Save the changes to the Jenkinsfile and trigger the pipeline: Commit and push the modified Jenkinsfile to your Git repository. This should trigger the Jenkins pipeline, which will execute the build, test, and deployment stages based on the updated configuration.
7. Monitor the deployment: Use the Jenkins console or dashboard to monitor the progress of the deployment pipeline. You should be able to view the logs, check for any errors, and track the success of each stage.
8. Access the deployed application: Once the deployment stage is completed successfully, you can access the deployed Simple CTS Backend Application using the URL provided by your Google Cloud setup.

Please note that the instructions provided here are a high-level overview. It's important to consult the relevant Google Cloud and Jenkins documentation for detailed instructions specific to your setup.

Conclusion
The Simple CTS Backend Application provides a basic starting point for building a backend server with Node.js and Express. The included Jenkinsfile allows for automated building, testing, and deployment of the application. You can customize the Jenkins pipeline stages to fit your specific requirements and deploy the application to Google Cloud or any other hosting environment.

Please note that this repository serves as a demonstration and may require additional modifications and enhancements for production use. If you have any questions or encounter any issues, feel free to open an issue in the repository or reach out for support.

Happy coding!
