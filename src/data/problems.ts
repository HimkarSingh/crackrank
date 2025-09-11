
export interface Problem {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  companies: string[];
  topics: string[];
  description: string;
  examples: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
  constraints: string[];
  acceptance_rate: number;
  solved?: boolean;
  testCases: Array<{
    input: string;
    expectedOutput: string;
    isHidden?: boolean;
  }>;
  starterCode: {
    python: string;
    javascript: string;
    java: string;
    cpp: string;
  };
}

export const sampleProblems: Problem[] = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    companies: ["Google", "Amazon", "Microsoft"],
    topics: ["Array", "Hash Table"],
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]"
      }
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists."
    ],
    acceptance_rate: 72,
    testCases: [
      { input: "nums = [2,7,11,15], target = 9", expectedOutput: "[0,1]" },
      { input: "nums = [3,2,4], target = 6", expectedOutput: "[1,2]" },
      { input: "nums = [3,3], target = 6", expectedOutput: "[0,1]" },
      { input: "nums = [1,2,3,4,5], target = 8", expectedOutput: "[2,4]", isHidden: true },
      { input: "nums = [-1,-2,-3,-4,-5], target = -8", expectedOutput: "[2,4]", isHidden: true }
    ],
    starterCode: {
      python: `import sys
import json

def two_sum(nums, target):
    # Write your solution here
    hash_map = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in hash_map:
            return [hash_map[complement], i]
        hash_map[num] = i
    return []

# Auto-generated input handling
if __name__ == "__main__":
    lines = sys.stdin.read().strip().split('\\n')
    nums = json.loads(lines[0])
    target = int(lines[1])
    result = two_sum(nums, target)
    print(json.dumps(result))`,
      javascript: `function twoSum(nums, target) {
    // Write your solution here
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
}

// Auto-generated input handling
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let lines = [];
rl.on('line', (line) => {
    lines.push(line);
});

rl.on('close', () => {
    const nums = JSON.parse(lines[0]);
    const target = parseInt(lines[1]);
    const result = twoSum(nums, target);
    console.log(JSON.stringify(result));
});`,
      java: `import java.util.*;
import java.io.*;

public class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your solution here
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[]{map.get(complement), i};
            }
            map.put(nums[i], i);
        }
        return new int[0];
    }
    
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String[] numsStr = br.readLine().replace("[", "").replace("]", "").split(",");
        int[] nums = Arrays.stream(numsStr).mapToInt(Integer::parseInt).toArray();
        int target = Integer.parseInt(br.readLine());
        
        Solution solution = new Solution();
        int[] result = solution.twoSum(nums, target);
        System.out.println(Arrays.toString(result));
    }
}`,
      cpp: `#include <vector>
#include <unordered_map>
#include <iostream>
#include <sstream>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your solution here
        unordered_map<int, int> map;
        for (int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];
            if (map.find(complement) != map.end()) {
                return {map[complement], i};
            }
            map[nums[i]] = i;
        }
        return {};
    }
};

int main() {
    string line;
    getline(cin, line);
    
    // Parse array
    vector<int> nums;
    line = line.substr(1, line.length() - 2); // remove [ ]
    stringstream ss(line);
    string num;
    while (getline(ss, num, ',')) {
        nums.push_back(stoi(num));
    }
    
    int target;
    cin >> target;
    
    Solution solution;
    vector<int> result = solution.twoSum(nums, target);
    cout << "[" << result[0] << "," << result[1] << "]" << endl;
    
    return 0;
}`
    }
  },
  {
    id: 2,
    title: "Reverse Linked List",
    difficulty: "Easy",
    companies: ["Meta", "Apple", "Amazon"],
    topics: ["Linked List", "Recursion"],
    description: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
    examples: [
      {
        input: "head = [1,2,3,4,5]",
        output: "[5,4,3,2,1]"
      },
      {
        input: "head = [1,2]",
        output: "[2,1]"
      },
      {
        input: "head = []",
        output: "[]"
      }
    ],
    constraints: [
      "The number of nodes in the list is the range [0, 5000].",
      "-5000 <= Node.val <= 5000"
    ],
    acceptance_rate: 68,
    testCases: [
      { input: "head = [1,2,3,4,5]", expectedOutput: "[5,4,3,2,1]" },
      { input: "head = [1,2]", expectedOutput: "[2,1]" },
      { input: "head = []", expectedOutput: "[]" }
    ],
    starterCode: {
      python: "# Definition for singly-linked list.\nclass ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef reverse_list(head):\n    # Write your solution here\n    pass",
      javascript: "// Definition for singly-linked list.\nfunction ListNode(val, next) {\n    this.val = (val===undefined ? 0 : val)\n    this.next = (next===undefined ? null : next)\n}\n\nfunction reverseList(head) {\n    // Write your solution here\n    return null;\n}",
      java: "// Definition for singly-linked list.\npublic class ListNode {\n    int val;\n    ListNode next;\n    ListNode() {}\n    ListNode(int val) { this.val = val; }\n    ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n}\n\npublic class Solution {\n    public ListNode reverseList(ListNode head) {\n        // Write your solution here\n        return null;\n    }\n}",
      cpp: "// Definition for singly-linked list.\nstruct ListNode {\n    int val;\n    ListNode *next;\n    ListNode() : val(0), next(nullptr) {}\n    ListNode(int x) : val(x), next(nullptr) {}\n    ListNode(int x, ListNode *next) : val(x), next(next) {}\n};\n\nclass Solution {\npublic:\n    ListNode* reverseList(ListNode* head) {\n        // Write your solution here\n        return nullptr;\n    }\n};"
    }
  },
  // Add basic test cases and starter code for remaining problems
  ...Array.from({length: 6}, (_, i) => {
    const baseProblems = [
      {
        id: 3,
        title: "Valid Parentheses",
        difficulty: "Easy" as const,
        companies: ["Google", "Microsoft", "Amazon"],
        topics: ["String", "Stack"],
        description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.",
        examples: [
          { input: 's = "()"', output: "true" },
          { input: 's = "()[]{}"', output: "true" },
          { input: 's = "(]"', output: "false" }
        ],
        constraints: [
          "1 <= s.length <= 10^4",
          "s consists of parentheses only '()[]{}'."
        ],
        acceptance_rate: 73,
        testCases: [
          { input: 's = "()"', expectedOutput: "true" },
          { input: 's = "()[]{}"', expectedOutput: "true" },
          { input: 's = "(]"', expectedOutput: "false" }
        ],
        starterCode: {
          python: `import sys

def is_valid(s):
    # Write your solution here
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    
    for char in s:
        if char in mapping:
            top = stack.pop() if stack else '#'
            if mapping[char] != top:
                return False
        else:
            stack.append(char)
    
    return not stack

# Auto-generated input handling
if __name__ == "__main__":
    s = sys.stdin.read().strip().replace('"', '')
    result = is_valid(s)
    print(str(result).lower())`,
          javascript: `function isValid(s) {
    // Write your solution here
    const stack = [];
    const mapping = { ')': '(', '}': '{', ']': '[' };
    
    for (let char of s) {
        if (char in mapping) {
            const top = stack.length ? stack.pop() : '#';
            if (mapping[char] !== top) {
                return false;
            }
        } else {
            stack.push(char);
        }
    }
    
    return stack.length === 0;
}

// Auto-generated input handling
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (line) => {
    const s = line.replace(/"/g, '');
    const result = isValid(s);
    console.log(result);
    rl.close();
});`,
          java: `import java.util.*;
import java.io.*;

public class Solution {
    public boolean isValid(String s) {
        // Write your solution here
        Stack<Character> stack = new Stack<>();
        Map<Character, Character> mapping = Map.of(')', '(', '}', '{', ']', '[');
        
        for (char c : s.toCharArray()) {
            if (mapping.containsKey(c)) {
                char top = stack.isEmpty() ? '#' : stack.pop();
                if (mapping.get(c) != top) {
                    return false;
                }
            } else {
                stack.push(c);
            }
        }
        
        return stack.isEmpty();
    }
    
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String s = br.readLine().replace("\"", "");
        
        Solution solution = new Solution();
        boolean result = solution.isValid(s);
        System.out.println(result);
    }
}`,
          cpp: `#include <string>
#include <stack>
#include <unordered_map>
#include <iostream>
using namespace std;

class Solution {
public:
    bool isValid(string s) {
        // Write your solution here
        stack<char> stk;
        unordered_map<char, char> mapping = {{')', '('}, {'}', '{'}, {']', '['}};
        
        for (char c : s) {
            if (mapping.count(c)) {
                char top = stk.empty() ? '#' : stk.top();
                stk.pop();
                if (mapping[c] != top) {
                    return false;
                }
            } else {
                stk.push(c);
            }
        }
        
        return stk.empty();
    }
};

int main() {
    string s;
    getline(cin, s);
    s.erase(remove(s.begin(), s.end(), '"'), s.end());
    
    Solution solution;
    bool result = solution.isValid(s);
    cout << (result ? "true" : "false") << endl;
    
    return 0;
}`
        }
      },
      {
        id: 4,
        title: "Maximum Subarray",
        difficulty: "Medium" as const,
        companies: ["Amazon", "Google", "Apple"],
        topics: ["Array", "Dynamic Programming"],
        description: "Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.\n\nA subarray is a contiguous part of an array.",
        examples: [
          { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6", explanation: "[4,-1,2,1] has the largest sum = 6." },
          { input: "nums = [1]", output: "1" },
          { input: "nums = [5,4,-1,7,8]", output: "23" }
        ],
        constraints: [
          "1 <= nums.length <= 10^5",
          "-10^4 <= nums[i] <= 10^4"
        ],
        acceptance_rate: 54,
        testCases: [
          { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", expectedOutput: "6" },
          { input: "nums = [1]", expectedOutput: "1" },
          { input: "nums = [5,4,-1,7,8]", expectedOutput: "23" }
        ],
        starterCode: {
          python: "def max_subarray(nums):\n    # Write your solution here\n    pass",
          javascript: "function maxSubArray(nums) {\n    // Write your solution here\n    return 0;\n}",
          java: "public class Solution {\n    public int maxSubArray(int[] nums) {\n        // Write your solution here\n        return 0;\n    }\n}",
          cpp: "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxSubArray(vector<int>& nums) {\n        // Write your solution here\n        return 0;\n    }\n};"
        }
      },
      {
        id: 5,
        title: "Climbing Stairs",
        difficulty: "Easy" as const,
        companies: ["Amazon", "Google", "Apple"],
        topics: ["Math", "Dynamic Programming", "Memoization"],
        description: "You are climbing a staircase. It takes n steps to reach the top.\n\nEach time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
        examples: [
          { input: "n = 2", output: "2", explanation: "There are two ways to climb to the top.\n1. 1 step + 1 step\n2. 2 steps" },
          { input: "n = 3", output: "3", explanation: "There are three ways to climb to the top.\n1. 1 step + 1 step + 1 step\n2. 1 step + 2 steps\n3. 2 steps + 1 step" }
        ],
        constraints: ["1 <= n <= 45"],
        acceptance_rate: 71,
        testCases: [
          { input: "n = 2", expectedOutput: "2" },
          { input: "n = 3", expectedOutput: "3" },
          { input: "n = 4", expectedOutput: "5" }
        ],
        starterCode: {
          python: "def climb_stairs(n):\n    # Write your solution here\n    pass",
          javascript: "function climbStairs(n) {\n    // Write your solution here\n    return 0;\n}",
          java: "public class Solution {\n    public int climbStairs(int n) {\n        // Write your solution here\n        return 0;\n    }\n}",
          cpp: "class Solution {\npublic:\n    int climbStairs(int n) {\n        // Write your solution here\n        return 0;\n    }\n};"
        }
      },
      {
        id: 6,
        title: "Binary Tree Inorder Traversal",
        difficulty: "Easy" as const,
        companies: ["Microsoft", "Amazon", "Google"],
        topics: ["Stack", "Tree", "Depth-First Search"],
        description: "Given the root of a binary tree, return the inorder traversal of its nodes' values.",
        examples: [
          { input: "root = [1,null,2,3]", output: "[1,3,2]" },
          { input: "root = []", output: "[]" },
          { input: "root = [1]", output: "[1]" }
        ],
        constraints: [
          "The number of nodes in the tree is in the range [0, 100].",
          "-100 <= Node.val <= 100"
        ],
        acceptance_rate: 75,
        testCases: [
          { input: "root = [1,null,2,3]", expectedOutput: "[1,3,2]" },
          { input: "root = []", expectedOutput: "[]" },
          { input: "root = [1]", expectedOutput: "[1]" }
        ],
        starterCode: {
          python: "# Definition for a binary tree node.\nclass TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef inorder_traversal(root):\n    # Write your solution here\n    pass",
          javascript: "// Definition for a binary tree node.\nfunction TreeNode(val, left, right) {\n    this.val = (val===undefined ? 0 : val)\n    this.left = (left===undefined ? null : left)\n    this.right = (right===undefined ? null : right)\n}\n\nfunction inorderTraversal(root) {\n    // Write your solution here\n    return [];\n}",
          java: "// Definition for a binary tree node.\npublic class TreeNode {\n    int val;\n    TreeNode left;\n    TreeNode right;\n    TreeNode() {}\n    TreeNode(int val) { this.val = val; }\n    TreeNode(int val, TreeNode left, TreeNode right) {\n        this.val = val;\n        this.left = left;\n        this.right = right;\n    }\n}\n\npublic class Solution {\n    public List<Integer> inorderTraversal(TreeNode root) {\n        // Write your solution here\n        return new ArrayList<>();\n    }\n}",
          cpp: "// Definition for a binary tree node.\nstruct TreeNode {\n    int val;\n    TreeNode *left;\n    TreeNode *right;\n    TreeNode() : val(0), left(nullptr), right(nullptr) {}\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}\n};\n\nclass Solution {\npublic:\n    vector<int> inorderTraversal(TreeNode* root) {\n        // Write your solution here\n        return {};\n    }\n};"
        }
      },
      {
        id: 7,
        title: "3Sum",
        difficulty: "Medium" as const,
        companies: ["Amazon", "Meta", "Apple"],
        topics: ["Array", "Two Pointers", "Sorting"],
        description: "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.\n\nNotice that the solution set must not contain duplicate triplets.",
        examples: [
          { input: "nums = [-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]", explanation: "nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.\nnums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.\nnums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.\nThe distinct triplets are [-1,0,1] and [-1,-1,2]." },
          { input: "nums = [0,1,1]", output: "[]", explanation: "The only possible triplet does not sum up to 0." },
          { input: "nums = [0,0,0]", output: "[[0,0,0]]", explanation: "The only possible triplet sums up to 0." }
        ],
        constraints: [
          "3 <= nums.length <= 3000",
          "-10^5 <= nums[i] <= 10^5"
        ],
        acceptance_rate: 35,
        testCases: [
          { input: "nums = [-1,0,1,2,-1,-4]", expectedOutput: "[[-1,-1,2],[-1,0,1]]" },
          { input: "nums = [0,1,1]", expectedOutput: "[]" },
          { input: "nums = [0,0,0]", expectedOutput: "[[0,0,0]]" }
        ],
        starterCode: {
          python: "def three_sum(nums):\n    # Write your solution here\n    pass",
          javascript: "function threeSum(nums) {\n    // Write your solution here\n    return [];\n}",
          java: "import java.util.*;\n\npublic class Solution {\n    public List<List<Integer>> threeSum(int[] nums) {\n        // Write your solution here\n        return new ArrayList<>();\n    }\n}",
          cpp: "#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> threeSum(vector<int>& nums) {\n        // Write your solution here\n        return {};\n    }\n};"
        }
      },
      {
        id: 8,
        title: "Longest Palindromic Substring",
        difficulty: "Medium" as const,
        companies: ["Amazon", "Microsoft", "Google"],
        topics: ["String", "Dynamic Programming"],
        description: "Given a string s, return the longest palindromic substring in s.",
        examples: [
          { input: 's = "babad"', output: '"bab"', explanation: '"aba" is also a valid answer.' },
          { input: 's = "cbbd"', output: '"bb"' }
        ],
        constraints: [
          "1 <= s.length <= 1000",
          "s consist of only digits and English letters."
        ],
        acceptance_rate: 42,
        testCases: [
          { input: 's = "babad"', expectedOutput: '"bab"' },
          { input: 's = "cbbd"', expectedOutput: '"bb"' },
          { input: 's = "a"', expectedOutput: '"a"' }
        ],
        starterCode: {
          python: "def longest_palindrome(s):\n    # Write your solution here\n    pass",
          javascript: "function longestPalindrome(s) {\n    // Write your solution here\n    return '';\n}",
          java: "public class Solution {\n    public String longestPalindrome(String s) {\n        // Write your solution here\n        return '';\n    }\n}",
          cpp: "#include <string>\nusing namespace std;\n\nclass Solution {\npublic:\n    string longestPalindrome(string s) {\n        // Write your solution here\n        return '';\n    }\n};"
        }
      }
    ];
    return baseProblems[i];
  }),
];

export const companies = ["Amazon", "Google", "Microsoft", "Meta", "Apple", "Netflix", "Uber", "Tesla"];
export const topics = ["Array", "String", "Hash Table", "Dynamic Programming", "Math", "Sorting", "Greedy", "Tree", "Depth-First Search", "Binary Search", "Breadth-First Search", "Two Pointers", "Stack", "Linked List", "Recursion", "Memoization"];
