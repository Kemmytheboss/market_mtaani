# Contributing

This repository uses a branch-per-feature workflow. Keep `main` protected and work on feature branches named using the pattern `feature/Yussuf/<short-description>` (replace `Yussuf` with your brief name when appropriate).

1. Setup (recommended)

   - Create a virtual environment and install dependencies (Pipfile present):

   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   pip install pipenv
   pipenv install --dev
   pipenv run pip install -r <(pipenv lock -r)
   ```

   - Alternatively, install from `Pipfile` using `pipenv` or create a `requirements.txt` and use `pip install -r requirements.txt`.

2. Branching & collaboration

   - Create a new feature branch from the latest `main`:

   ```bash
   git fetch origin
   git checkout main
   git pull origin main
   git checkout -b feature/Yussuf/short-description
   ```

   - Push the branch and set upstream:

   ```bash
   git push -u origin feature/Yussuf/short-description
   ```

   - Update your branch from remote `main` regularly (two options):
     - Rebase (keeps linear history):

     ```bash
     git fetch origin
     git checkout feature/Yussuf/short-description
     git rebase origin/main
     # fix conflicts, then
     git push --force-with-lease
     ```

     - Merge (keeps original commit timestamps):

     ```bash
     git fetch origin
     git checkout feature/Yussuf/short-description
     git merge origin/main
     git push
     ```

   - Open a Pull Request on GitHub (web) or with the GitHub CLI:

   ```bash
   gh pr create --fill
   ```

   - Checkout a collaborator's branch:

   ```bash
   git fetch origin
   git checkout -b their-branch origin/their-branch
   # or for PRs
   gh pr checkout <number>
   ```

   - Delete branches after merge:

   ```bash
   git branch -d feature/Yussuf/short-description   # local
   git push origin --delete feature/Yussuf/short-description  # remote
   ```

3. Common git commands

   - List branches: `git branch` (local), `git branch -r` (remote)
   - Stash work: `git stash` / `git stash pop`
   - Interactive rebase: `git rebase -i origin/main`
   - View history: `git log --oneline --graph --decorate`

4. Database migrations & seeding (exact commands)

   - Export FLASK_APP and run migrations (after activating venv/pipenv):

   ```bash
   export FLASK_APP=server.app
   flask db init           # only once per repo
   flask db migrate -m "initial"
   flask db upgrade
   ```

   - If you update models later:

   ```bash
   export FLASK_APP=server.app
   flask db migrate -m "describe change"
   flask db upgrade
   ```

   - Seed the database (creates sample data):

   ```bash
   # from repo root, with venv/pipenv active
   python server/seed.py
   ```

5. Pull request checklist

   - Branch created from an up-to-date `main`.
   - Code linted and tests passing (if present).
   - Migration created if models changed.
   - Describe changes in the PR body and link any issues.

6. Notes & best practices

   - Use `--force-with-lease` when force-pushing to avoid overwriting others' work.
   - Use small, focused PRs for easier review.
   - When in doubt, open a draft PR and ask for feedback.

If you want, I can also add a `scripts/` helper for common dev commands (venv activation, migrate, seed).
