# Use an official lightweight Python image as a base
FROM python:3.9-slim

# Set the working directory inside the container
WORKDIR /usr/src/app

# Define the command to execute when the container runs.
# Since Python is interpreted, we just run the script directly.
CMD ["python", "code.py"]