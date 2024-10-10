# yoto-config-eslint

This project is a shared copy of our eslint configuration, to provide _some_ consistency across repositories and reduce repetition.

## Making Changes

The repository is auto-versioned during CI using `standard-version`. All commits much conform to the [conventional-changelog](https://github.com/conventional-changelog/commitlint) rules.

Simply create a commit and push. All versioning is done by CI. Example:

```shell
git add -A
git commit -m "chore: add .temp to ignore paths"
git push
```

## Skipping CI

Add `[skip ci]` to your commit message:

```shell
git commit -m "chore: update the readme [skip ci]"
```
