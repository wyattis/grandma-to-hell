# grandma-to-hell
Ludem Dare 43

## Get started
- Clone repository
    - `git clone https://github.com/wyattis/grandma-to-hell.git`
- install node/npm if not already installed. Easiest with [nvm](https://github.com/creationix/nvm#installation).
- `cd grandma-to-hell`
- `npm install && npm install -g webpack-dev-server webpack-cli` 
- `npm start`

### Pushing changes
Review your changes, add relevant files, make a commit (or multiple) and then push to origin
#### Reviewing
- use `git status` to see which files have changed. `git diff` to see the file differences.
#### Staging
- use `git add {path}` to stage individual files or directories for a commit
- use `git add -A` to stage all files for a commit
- use `git add -u` to only add files that are already part of the project
#### Commit
- use `git commit -m "{message}"` to commit all staged files with a message describing the changes
#### Push
- use `git pull` to get all updates from other people that have been pushed to the server. 
If there are changes, git will attempt to merge them by default. 
Generally if you haven't edited any of the same files as the other dev, there will not be conflicts.
- if there are conflicts, merge them by following the instructions on the screen and then commit the merge. 
More info [here](https://git-scm.com/docs/git-merge).
- use `git push` to push the changes to Github.


## Build process
The build process uses [Webpack 4](https://webpack.js.org/). All configuration is in `webpack.config.js`. 
Dependencies are managed automagically if you use standard JS `import` or `require` syntax. This includes static assets
like images and audio files. [HtmlWebpackPlugin](https://webpack.js.org/plugins/html-webpack-plugin/) is used to inject
our resources into our `index.html` template. No pesky cache issues anymore :).

For development run `npm start` to start the dev server.For production `npm run build` will package all assets into the 
`dist` directory.


### TODO

- Correctly handle all player states
- ~~Allow any interaction with the last grandma to trigger the win screen~~
- Time the music with the intro text
- Floating health bars
- Allow interaction when standing on top of a grandma

### Future

- Destroyable walls
- Exploding grandmas
- Intro scene
- Win scene
- Pause menu on ESC with controls
- Options menu
    - Volume level
    - Music/Effects on/off
- More levels
- Room transitions
- Maybe add the concept of lives?
- Keep states between each room (health, grandmas)
- Grandmas interact with environment
    - Turn around when hitting a wall
    - Maybe talk with each other? ("That Sammy is something else!")
- Sound effects
    - Fire
    - Jump
    - Bounce
    - Die
    - Explosion
    - Wall crumbling
    - Grandma noises ("I made pie!", "So cute, I could just squeeze him to death", etc)
- Main theme?
- Separate entrances and exits

- Consider rewrite with a real engine and a real release on real game platforms?