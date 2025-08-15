# Step 1: Use an official lightweight Python image as a base
FROM python:3.9-slim

# Step 2: Set the working directory inside the container
WORKDIR /usr/src/app

# Step 3: Define the command to execute when the container runs
# Since Python is an interpreted language, we just need to run the script directly.
CMD ["python", "code.py"]