# yle-ttv-slack-app

# This Yle TTV Slack App is Based on "Getting Started ⚡️ Bolt for JavaScript tutorial.
# This is a private project that has no ties with Yleisradio Oy with the
# exception that is uses Yle's public API to fetch Yle Teksti-TV pages.
# Tha Yle in the project name simply implies that instead of being a generic
# Teletext app this can only be used to view comtent from Yle.
> Slack app example from 📚 [Getting started with Bolt for JavaScript tutorial][1]

## Overview

This is a Slack app built with the [Bolt for JavaScript framework][2].

## Running locally

### 1. Setup environment variables

```zsh
# Replace with your signing secret and token
export SLACK_BOT_TOKEN=<your-bot-token>
export SLACK_SIGNING_SECRET=<your-signing-secret>
export TTV_API_KEY=<your Yle API keys>
```

### 2. Setup your local project

```zsh
# Clone this project onto your machine
git clone <urli tänne>.git

# Change into the project
cd ttv/

# Install the dependencies
npm install
```

### 3. Start servers

[Setup ngrok][3] to create a local requests URL for development.

```zsh
npm run ngrok
npm run start
```

## Contributing

### Issues and questions

Found a bug or have a question about this project? We'd love to hear from you!
# Muuta tänne omat tiedot
1. Browse to [slackapi/bolt-js/issues][4]
1. Create a new issue
1. Select the `[x] examples` category

See you there and thanks for helping to improve Bolt for everyone!

[1]: https://slack.dev/bolt-js/tutorial/getting-started
[2]: https://slack.dev/bolt-js/
[3]: https://slack.dev/bolt-js/tutorial/getting-started#setting-up-events
[4]: https://github.com/slackapi/bolt-js/issues/new