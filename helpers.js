// Function to extract GitHub username and repository name from a GitHub URL
export const extractGitHubInfo = (url) => {
   // Regular expression to match GitHub repository URL
   const regex = /^https:\/\/github\.com\/([^\/]+)\/([^\/]+)$/;

   // Attempt to match the URL using the regular expression
   const match = url.match(regex);

   // Check if the match was successful and contains the expected elements
   if (match && match.length === 3) {
      const username = match[1];
      const repositoryName = match[2];

      return { username, repositoryName };
   } else {
      console.error("Error: The URL is not valid for GitHub.");
      return null;
   }
};

// Function to calculate the maximum value of a specific field in the dataset
export const calculateMax = (data, field) =>
   Math.max(...data.map((contributor) => contributor[field]));

// Function to calculate the normalized participation score for a contributor
export const calculateParticipationScore = (
   contributors,
   contributor,
   weights
) => {
   // Calculate the maximum values for additions, deletions, and commits in the dataset
   const maxAdditions = calculateMax(contributors, "additions");
   const maxDeletions = calculateMax(contributors, "deletions");
   const maxCommits = calculateMax(contributors, "commits");

   // Normalize the metrics by dividing each contributor's value by the maximum observed value
   const normalizedCommits = contributor.commits / maxCommits;
   const normalizedAdditions = contributor.additions / maxAdditions;
   const normalizedDeletions = contributor.deletions / maxDeletions;

   // Calculate the participation score using the weighted sum of normalized metrics
   const participationScore =
      weights.commits * normalizedCommits +
      weights.additions * normalizedAdditions +
      weights.deletions * normalizedDeletions;

   // Return the calculated participation score
   return participationScore;
};

// Function to calculate the maximum participation score in the dataset
export const calculateMaxParticipationScore = (contributors) => {
   const allParticipationScores = contributors.map((c) => c.participationScore);
   return Math.max(...allParticipationScores);
};
