# Use an official C++ compiler (GCC) image as a base
# This provides a lightweight Linux environment with g++ pre-installed.
FROM gcc:11.3

# Set the working directory inside the container
WORKDIR /usr/src/app

# Define the command to execute when the container runs.
# It compiles the code file and then runs the resulting executable.
CMD ["bash", "-c", "g++ code.cpp -o a.out && ./a.out"]