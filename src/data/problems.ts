
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
    acceptance_rate: 72
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
    acceptance_rate: 68
  },
  {
    id: 3,
    title: "Valid Parentheses",
    difficulty: "Easy",
    companies: ["Google", "Microsoft", "Amazon"],
    topics: ["String", "Stack"],
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.",
    examples: [
      {
        input: 's = "()"',
        output: "true"
      },
      {
        input: 's = "()[]{}"',
        output: "true"
      },
      {
        input: 's = "(]"',
        output: "false"
      }
    ],
    constraints: [
      "1 <= s.length <= 10^4",
      "s consists of parentheses only '()[]{}'."
    ],
    acceptance_rate: 73
  },
  {
    id: 4,
    title: "Maximum Subarray",
    difficulty: "Medium",
    companies: ["Amazon", "Google", "Apple"],
    topics: ["Array", "Dynamic Programming"],
    description: "Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.\n\nA subarray is a contiguous part of an array.",
    examples: [
      {
        input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
        explanation: "[4,-1,2,1] has the largest sum = 6."
      },
      {
        input: "nums = [1]",
        output: "1"
      },
      {
        input: "nums = [5,4,-1,7,8]",
        output: "23"
      }
    ],
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4"
    ],
    acceptance_rate: 54
  },
  {
    id: 5,
    title: "Climbing Stairs",
    difficulty: "Easy",
    companies: ["Amazon", "Google", "Apple"],
    topics: ["Math", "Dynamic Programming", "Memoization"],
    description: "You are climbing a staircase. It takes n steps to reach the top.\n\nEach time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    examples: [
      {
        input: "n = 2",
        output: "2",
        explanation: "There are two ways to climb to the top.\n1. 1 step + 1 step\n2. 2 steps"
      },
      {
        input: "n = 3",
        output: "3",
        explanation: "There are three ways to climb to the top.\n1. 1 step + 1 step + 1 step\n2. 1 step + 2 steps\n3. 2 steps + 1 step"
      }
    ],
    constraints: [
      "1 <= n <= 45"
    ],
    acceptance_rate: 71
  },
  {
    id: 6,
    title: "Binary Tree Inorder Traversal",
    difficulty: "Easy",
    companies: ["Microsoft", "Amazon", "Google"],
    topics: ["Stack", "Tree", "Depth-First Search"],
    description: "Given the root of a binary tree, return the inorder traversal of its nodes' values.",
    examples: [
      {
        input: "root = [1,null,2,3]",
        output: "[1,3,2]"
      },
      {
        input: "root = []",
        output: "[]"
      },
      {
        input: "root = [1]",
        output: "[1]"
      }
    ],
    constraints: [
      "The number of nodes in the tree is in the range [0, 100].",
      "-100 <= Node.val <= 100"
    ],
    acceptance_rate: 75
  },
  {
    id: 7,
    title: "3Sum",
    difficulty: "Medium",
    companies: ["Amazon", "Meta", "Apple"],
    topics: ["Array", "Two Pointers", "Sorting"],
    description: "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.\n\nNotice that the solution set must not contain duplicate triplets.",
    examples: [
      {
        input: "nums = [-1,0,1,2,-1,-4]",
        output: "[[-1,-1,2],[-1,0,1]]",
        explanation: "nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.\nnums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.\nnums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.\nThe distinct triplets are [-1,0,1] and [-1,-1,2]."
      },
      {
        input: "nums = [0,1,1]",
        output: "[]",
        explanation: "The only possible triplet does not sum up to 0."
      },
      {
        input: "nums = [0,0,0]",
        output: "[[0,0,0]]",
        explanation: "The only possible triplet sums up to 0."
      }
    ],
    constraints: [
      "3 <= nums.length <= 3000",
      "-10^5 <= nums[i] <= 10^5"
    ],
    acceptance_rate: 35
  },
  {
    id: 8,
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    companies: ["Amazon", "Microsoft", "Google"],
    topics: ["String", "Dynamic Programming"],
    description: "Given a string s, return the longest palindromic substring in s.",
    examples: [
      {
        input: 's = "babad"',
        output: '"bab"',
        explanation: '"aba" is also a valid answer.'
      },
      {
        input: 's = "cbbd"',
        output: '"bb"'
      }
    ],
    constraints: [
      "1 <= s.length <= 1000",
      "s consist of only digits and English letters."
    ],
    acceptance_rate: 42
  }
];

export const companies = ["Amazon", "Google", "Microsoft", "Meta", "Apple", "Netflix", "Uber", "Tesla"];
export const topics = ["Array", "String", "Hash Table", "Dynamic Programming", "Math", "Sorting", "Greedy", "Tree", "Depth-First Search", "Binary Search", "Breadth-First Search", "Two Pointers", "Stack", "Linked List", "Recursion", "Memoization"];
