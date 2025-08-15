#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> mp; // value -> index
    for (int i = 0; i < nums.size(); ++i) {
        int complement = target - nums[i];
        if (mp.find(complement) != mp.end()) {
            return {mp[complement], i};
        }
        mp[nums[i]] = i;
    }
    return {};
}

int main() {
    vector<int> nums;
    int num, target;

    // Read the array
    while (cin.peek() != '\n') {
        cin >> num;
        nums.push_back(num);
    }

    // Read the target
    cin >> target;

    vector<int> result = twoSum(nums, target);
    if (!result.empty()) {
        cout << result[0] << " " << result[1] << endl;
    }

    return 0;
}
