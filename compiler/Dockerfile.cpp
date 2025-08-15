# Step 1: Use an official C++ compiler (GCC) image as a base
# This gives us a lightweight Linux environment with g++ pre-installed.
FROM gcc:11.3

# Step 2: Set the working directory inside the container
# All subsequent commands will run from this path.
WORKDIR /usr/src/app

# Step 3: Define the command to execute when the container runs
# This command first compiles the source code file (code.cpp) into an executable (a.out),
# and then, if compilation is successful (&&), it runs the executable.
CMD ["bash", "-c", "g++ code.cpp -o a.out && ./a.out"]