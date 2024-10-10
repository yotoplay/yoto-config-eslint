# yoto-config-eslint

This project is a shared copy of our eslint configuration, to provide _some_ consistency across repositories and reduce repetition.

## Making Changes

- The repository is auto-versioned during CI using `semantic-release`. All commits must conform to the [conventional-changelog](https://www.conventionalcommits.org/en/v1.0.0/#summary) rules.
- Create a commit and push!
- The semver will increment for `fix:` (patch), `feat:` (minor), `breaking change:` (major)

```shell
git add -A
git commit -m "fix: add .temp to ignore paths"
git push
```
