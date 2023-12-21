/*
   This script calculates and displays contribution metrics for multiple GitHub repositories.

   It utilizes the Octokit library to interact with the GitHub API.
   The configuration, helper functions, and repository information are imported from external modules.

   The main process involves fetching contributors' commit activity and calculating participation scores.

   Usage:
   - Ensure the configuration file ("config.js") contains the required GitHub API token.
   - Run the script to calculate and display metrics for the specified GitHub repositories.

   Note: This script assumes the existence of external modules ("config.js", "helpers.js", "repositories.js").

   Author: Fidel Gilart Gilart
*/

// Import external modules
import { config } from "./config.js";
import { Octokit } from "octokit";
import {
   calculateMaxParticipationScore,
   calculateParticipationScore,
   extractGitHubInfo,
} from "./helpers.js";
import { githubRepositories } from "./repositories.js";

// Set up Octokit with GitHub API token
const token = config.github.apiToken;
const weights = config.weights;
const octokit = new Octokit({
   auth: token,
});

// Function to fetch contributors' commit activity
const getContributors = async (owner, repo) => {
   try {
      const commitActivityResponse = await octokit.request(
         "GET /repos/{owner}/{repo}/stats/contributors",
         {
            owner,
            repo,
            headers: {
               "X-GitHub-Api-Version": "2022-11-28",
            },
         }
      );

      return commitActivityResponse.data.map((commit) => {
         let additions = 0;
         let deletions = 0;
         const commits = commit.total;
         const author = commit.author.login;

         for (const week of commit.weeks) {
            additions += week.a;
            deletions += week.d;
         }

         return { author, additions, deletions, commits };
      });
   } catch (error) {
      console.log(error.message);
      return [];
   }
};

// Function to calculate and display metrics for a given repository
const calculateMetrics = async (repositoryUrl) => {
   const repositoryInfo = extractGitHubInfo(repositoryUrl);
   const owner = repositoryInfo.username;
   const repo = repositoryInfo.repositoryName;

   const contributors = await getContributors(owner, repo);

   if (contributors.length === 0) {
      console.log(`No contributors found for ${repositoryUrl}`);
      return;
   }

   // Calculate the participationScore for each contributor
   for (const contributor of contributors) {
      contributor.participationScore = calculateParticipationScore(
         contributors,
         contributor,
         weights
      );
   }

   // Calculate the participationPercentage after calculating all participationScores
   const maxParticipationScore = calculateMaxParticipationScore(contributors);
   for (const contributor of contributors) {
      const participationPercentage =
         (contributor.participationScore / maxParticipationScore) * 100;

      // Add new properties to contributors
      contributor.participationPercentage = participationPercentage;
      contributor.isLowParticipation = participationPercentage < 30;
   }

   // Sort contributors based on the participationScore (descending)
   const sortedContributors = contributors
      .slice()
      .sort((a, b) => b.participationScore - a.participationScore);

   // Display sorted contributors using console.table()
   console.log(repositoryUrl);

   const tableData = sortedContributors.map((contributor, index) => ({
      Rank: index + 1,
      Author: contributor.author,
      Additions: contributor.additions,
      Deletions: contributor.deletions,
      Commits: contributor.commits,
      "Participation Score": +contributor.participationScore.toFixed(2),
      "Participation Score(%)": +contributor.participationPercentage.toFixed(2),
      "Participation Level": contributor.isLowParticipation ? "LOW" : "OK",
   }));

   console.table(tableData);

   console.log("");
};

// Function to calculate and display metrics for all repositories
const allMetrics = async () => {
   console.log("-------------------------------------------------");
   console.log("Metrics");
   console.log("-------------------------------------------------\n");

   for (const repo of githubRepositories) {
      await calculateMetrics(repo);
   }
};

// Main function to execute allMetrics
allMetrics();
