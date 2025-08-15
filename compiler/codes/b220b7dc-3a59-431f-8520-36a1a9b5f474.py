def main():
    try:
        target = int(input())
        n = int(input())
        nums = []
        for _ in range(n):
            nums.append(int(input()))
        
        num_map = {}
        for i, num in enumerate(nums):
            complement = target - num
            if complement in num_map:
                print(f"{num_map[complement]} {i}")
                return
            num_map[num] = i
    except (IOError, ValueError):
        pass

if __name__ == "__main__":
    main()
