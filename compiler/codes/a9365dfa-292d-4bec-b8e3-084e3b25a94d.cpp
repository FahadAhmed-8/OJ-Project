#include <iostream>
#include <vector>
#include <unordered_map>
#include <sstream>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> mp;
    for (int i = 0; i < nums.size(); ++i) {
        int rem = target - nums[i];
        if (mp.count(rem)) {
            return {mp[rem], i};
        }
        mp[nums[i]] = i;
    }
    return {};
}

int main() {
    string input;
    getline(cin, input); // Read line like [2, 3, 4]

    // Remove brackets
    input.erase(remove(input.begin(), input.end(), '['), input.end());
    input.erase(remove(input.begin(), input.end(), ']'), input.end());

    // Parse the numbers
    stringstream ss(input);
    string token;
    vector<int> nums;
    while (getline(ss, token, ',')) {
        nums.push_back(stoi(token));
    }

    int target;
    cin >> target; // Read the target value on the next line

    vector<int> res = twoSum(nums, target);
    if (!res.empty()) {
        cout << res[0] << " " << res[1] << endl;
    }
}
