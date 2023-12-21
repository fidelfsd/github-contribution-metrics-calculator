# GitHub Contribution Metrics Calculator

## Overview

This project is a GitHub contribution metrics calculator that analyzes the commit activity of contributors in multiple GitHub repositories. The script utilizes the [Octokit](https://github.com/octokit/rest.js/) library for interaction with the GitHub API. The primary goal is to calculate and display participation scores and related metrics for each contributor.

## Description
Analyze and visualize contribution metrics in your GitHub repositories with this powerful calculator. Gain insights into commit activity, participation scores, and more. Support for multiple repositories and easy-to-use metrics generation.

🚀 Features:
- Calculate participation scores based on commits, additions, and deletions.
- Visualize contributors' rankings and metrics.
- Support for multiple GitHub repositories.

🔧 Usage:
1. Configure your GitHub API token in `config.js`.
2. Install dependencies: `npm install`.
3. Run the script: `npm start`.

📄 License:
This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).


## Participation Score Calculation

The participation score is calculated using the following formula:

![Participation Score Formula](score.svg)

Where:
- \( w<sub>c</sub> \), \( w<sub>a</sub> \), \( w<sub>d</sub> \) are weights for commits, additions, and deletions, respectively.
- \(Commits\), \(Additions\), \(Deletions\) represent the respective contributions of a contributor.
- \(MaxCommits\), \(MaxAdditions\), \(MaxDeletions\) represent the maximum values for commits, additions, and deletions in the repository.


## Participation Percentage Calculation

The participation percentage is calculated as follows:

![Participation Percentage Formula](pscore.svg)

Here,
- \(Max Participation Score\) represents the highest \(Participation Score\) observed in your dataset. This approach normalizes the score as a percentage of the maximum observed, making it useful for comparing relative participation in terms of percentage.

## Setup

1. Ensure that the configuration file (`config.js`) contains the required GitHub API token.

    ```javascript
    // config.js
    export const config = {
       github: {
          apiToken: "YOUR_GITHUB_API_TOKEN_HERE",
       },
       // ... other configuration options ...
    };
    ```

2. Install dependencies by running:

    ```bash
    npm install
    ```

## Project Structure

- **config.js**: Configuration file containing GitHub API token and other settings.
- **helpers.js**: Helper functions for calculating participation scores and extracting GitHub repository information.
- **index.js**: Main script for fetching contributors' commit activity, calculating metrics, and displaying results.
- **repositories.js**: List of GitHub repositories to analyze.

## External Dependencies

- **Octokit**: A JavaScript toolkit for interacting with the GitHub API.

## Contributing

Feel free to contribute to the project by opening issues or submitting pull requests. Your feedback and contributions are welcome!

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

