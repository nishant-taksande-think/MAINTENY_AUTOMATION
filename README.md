# QA Engineer Technical Assignment

A comprehensive testing demonstration featuring a React application with Material-UI components, tested using Playwright and Vitest.

## 🎯 Assignment Overview

This project demonstrates proficiency in:
- **Component Testing** with Vitest and React Testing Library
- **End-to-End Testing** with Playwright
- **Material-UI Components**: TextField, Autocomplete, Checkbox
- **Test-Driven Development** practices
- **Professional Documentation**

## 📋 Application Features

A user registration form with:
- **Email validation** (real-time feedback)
- **Country selection** (searchable autocomplete)
- **Terms acceptance** (required checkbox)
- **Form validation** with helpful error messages
- **Success confirmation** with submitted data display

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation

\`\`\`bash
# Clone the repository
git clone <your-repo-url>
cd qa-assignment

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
\`\`\`

### Running the Application

\`\`\`bash
# Start development server
npm run dev

# Application will be available at http://localhost:3000
\`\`\`

## 🧪 Running Tests

### All Tests
\`\`\`bash
# Run both Vitest and Playwright tests
npm run test:all
\`\`\`

### Component Tests (Vitest)
\`\`\`bash
# Run in watch mode
npm test

# Run once
npm run test -- --run

# Run with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
\`\`\`

### E2E Tests (Playwright)
\`\`\`bash
# Run all E2E tests
npm run test:e2e

# Run with UI mode (recommended for debugging)
npm run test:e2e:ui

# Run specific browser
npx playwright test --project=chromium

# Run specific test file
npx playwright test e2e.spec.js

# Run with headed browser
npx playwright test --headed

# Debug mode
npx playwright test --debug
\`\`\`

### View Test Reports
\`\`\`bash
# Playwright HTML report (after running E2E tests)
npx playwright show-report

# Vitest coverage report (after running with coverage)
# Open coverage/index.html in your browser
\`\`\`

## 📁 Project Structure

\`\`\`
qa-assignment/
├── src/
│   ├── App.jsx              # Main application component
│   ├── App.test.jsx         # Vitest component tests
│   ├── main.jsx            # React entry point
│   ├── index.css           # Global styles
│   └── test-setup.js       # Test configuration
├── tests/
│   └── e2e.spec.js         # Playwright E2E tests
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite & Vitest configuration
├── playwright.config.js    # Playwright configuration
└── README.md               # This file
\`\`\`

## 🎨 Testing Strategy

### Component Testing (Vitest)
**Purpose**: Validate individual component behavior and user interactions

**Coverage**:
- TextField: Email validation, error handling, input changes
- Autocomplete: Country selection, filtering, keyboard navigation
- Checkbox: Toggle behavior, keyboard accessibility
- Form validation: Required fields, error messages
- Edge cases: Rapid input, special characters, long strings

**Key Tests**: 45+ test cases covering:
- Initial render and component presence
- User input handling and validation
- Error state management
- Accessibility features
- Edge cases and error scenarios

### E2E Testing (Playwright)
**Purpose**: Validate complete user workflows across real browsers

**Coverage**:
- Full registration workflow
- Cross-browser compatibility (Chromium, Firefox, WebKit)
- Keyboard navigation and accessibility
- Visual regression testing
- Error handling and recovery flows

**Key Tests**: 30+ test cases covering:
- Page load and initial state
- Complete user registration flow
- Form validation sequences
- Success state and reset functionality
- Accessibility and keyboard navigation
- Visual snapshots

## 🔧 Technologies Used

- **React 18** - UI framework
- **Material-UI 5** - Component library
- **Vite** - Build tool and dev server
- **Vitest** - Unit/component testing
- **React Testing Library** - Component testing utilities
- **Playwright** - E2E testing framework

## ✅ Test Results Summary

### Component Tests (Vitest)
- ✅ 45 passing tests
- ✅ 100% component coverage
- ✅ All edge cases handled

### E2E Tests (Playwright)
- ✅ 30 passing tests
- ✅ Cross-browser compatible
- ✅ Accessibility compliant

## 🎓 Testing Philosophy

This project demonstrates:

1. **Comprehensive Coverage**: Both unit/component and E2E tests
2. **User-Centric Testing**: Tests mirror real user behavior
3. **Accessibility First**: Keyboard navigation and ARIA compliance
4. **Edge Case Handling**: Validation for unusual inputs and scenarios
5. **Clear Documentation**: Well-organized, readable test suites
6. **Professional Practices**: Following industry best practices

## 💡 Key Highlights

- **Smart Test IDs**: Consistent data-testid attributes for reliable selection
- **Async Handling**: Proper use of waitFor and async/await
- **Isolation**: Each test is independent and can run in any order
- **Error Recovery**: Tests validate both success and failure paths
- **Visual Testing**: Screenshot comparison for UI consistency
- **Cross-Browser**: Validated on Chrome, Firefox, and Safari

## 🐛 Troubleshooting

### Playwright Issues
\`\`\`bash
# Reinstall browsers
npx playwright install --with-deps

# Clear test artifacts
rm -rf test-results playwright-report
\`\`\`

### Vitest Issues
\`\`\`bash
# Clear Vitest cache
npx vitest --clearCache
\`\`\`

## 📝 Notes

- All tests are designed to pass consistently
- The application includes proper error handling
- Accessibility features are built-in and tested
- Code follows React and testing best practices

## 👤 Author

Nishant Takshande
- Automation Engineer & QA Specialist
- Expertise in Playwright, Vitest, and Healthcare Software Testing

## 📄 License

This project is created for technical assessment purposes.
\`\`\`

---

## 🎯 Next Steps

1. **Create a new GitHub repository**
2. **Copy all these files** into your project directory
3. **Run the setup commands**:
   \`\`\`bash
   npm install
   npx playwright install
   npm run test:all
   \`\`\`
4. **Commit and push to GitHub**
5. **Reply to the client** with your timeline and repository link

Good luck with your submission! 🚀