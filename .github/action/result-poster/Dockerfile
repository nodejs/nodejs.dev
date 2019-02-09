FROM node:slim

# A bunch of `LABEL` fields for GitHub to index
LABEL "com.github.actions.name"="ResultPoster"
LABEL "com.github.actions.description"="Post a link because it shouldn't be this hard"
LABEL "com.github.actions.icon"="edit"
LABEL "com.github.actions.color"="orange"
LABEL "repository"="http://github.com/nodejs/website-prototype"
LABEL "homepage"="http://github.com/nodejs/website-prototype"
LABEL "maintainer"="Myles Borins (https://github.com/MylesBorins)"

# install
COPY package*.json ./
RUN npm ci --only=production

# start
COPY . .
ENTRYPOINT ["node", "/index.js"]
