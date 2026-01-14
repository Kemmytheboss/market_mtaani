# Contributing to Market Mtaani

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone <repo>
   cd <folder name>
   ```

3. **Set up the development environment**:
   ```bash
   pipenv install
   pipenv shell
   cd server
   flask db upgrade
   python seed.py
   ```

## Making Changes

1. **Create a new branch** for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following our code standards

3. **Test your changes** thoroughly

4. **Commit your changes**:
   ```bash
   git add .
   git commit -m "Add: brief description of your changes"
   ```

## Submitting Changes

1. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create a Pull Request** on GitHub

3. **Request reviews** from at least 2 team members

4. **Address review feedback** if needed

## Code Standards

- Follow existing code structure and naming conventions
- Add proper error handling for all routes
- Include validations for user inputs
- Use meaningful commit messages
- Test all CRUD operations before submitting

## Commit Message Format

- `Add:` for new features
- `Fix:` for bug fixes
- `Update:` for modifications to existing features
- `Remove:` for deleted features
- `Docs:` for documentation changes

## Need Help?

Contact the team lead or ask in the project group chat.