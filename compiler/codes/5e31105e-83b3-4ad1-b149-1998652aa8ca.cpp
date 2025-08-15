#include <iostream>
#include <vector>
#include <unordered_map>

int main() {
    int target, n;
    std::cin >> target;
    std::cin >> n;
    std::vector<int> nums(n);
    std::unordered_map<int, int> map;

    for (int i = 0; i < n; ++i) {
        std::cin >> nums[i];
    }

    for (int i = 0; i < n; ++i) {
        int complement = target - nums[i];
        if (map.count(complement)) {
            std::cout << map[complement] << " " << i << std::endl;
            return 0;
        }
        map[nums[i]] = i;
    }

    return 0;
}
