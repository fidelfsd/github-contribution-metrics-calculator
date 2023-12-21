export const extractGitHubInfo = (url) => {
   const regex = /^https:\/\/github\.com\/([^\/]+)\/([^\/]+)$/;

   const match = url.match(regex);

   if (match && match.length === 3) {
      const username = match[1];
      const repositoryName = match[2];
      return { username, repositoryName };
   } else {
      console.error("Error: La URL no es válida para GitHub.");
      return null;
   }
};

// Function to calculate the maximum of a specific field in the dataset
export const calculateMax = (data, field) =>
   Math.max(...data.map((contributor) => contributor[field]));

// Function to calculate the normalized metric
export const calculateParticipationScore = (
   contributors,
   contributor,
   weights
) => {
   const maxAdditions = calculateMax(contributors, "additions");
   const maxDeletions = calculateMax(contributors, "deletions");
   const maxCommits = calculateMax(contributors, "commits");

   // Normalización de las métricas (dividir por el máximo valor observado)
   const normalizedCommits = contributor.commits / maxCommits;
   const normalizedAdditions = contributor.additions / maxAdditions;
   const normalizedDeletions = contributor.deletions / maxDeletions;

   // Fórmula de puntuación ponderada
   const participationScore =
      weights.commits * normalizedCommits +
      weights.additions * normalizedAdditions +
      weights.deletions * normalizedDeletions;

   return participationScore;
};

export const calculateMaxParticipationScore = (contributors) => {
   const allParticipationScores = contributors.map((c) => c.participationScore);
   return Math.max(...allParticipationScores);
};
