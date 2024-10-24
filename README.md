# Visual Testing Comparison: Applitools vs Percy

This project demonstrates key differences between Applitools and Percy:

## Key Differences Demonstrated

1. **Dynamic Content Handling**

   - Applitools: Intelligently handles dynamic content using AI-powered matching
   - Percy: Struggles with dynamic content, leading to false positives

2. **A/B Testing Support**

   - Applitools: Supports multiple baselines for A/B testing
   - Percy: Cannot handle multiple variants effectively

3. **Accessibility Testing**

   - Applitools: Includes built-in accessibility testing
   - Percy: No native accessibility testing support

4. **Layout Testing**

   - Applitools: Supports sophisticated layout testing with ignore regions
   - Percy: Limited layout testing capabilities

5. **Root Cause Analysis**
   - Applitools: Provides detailed insights into visual differences
   - Percy: Basic difference highlighting only

## Running the Tests

```bash
# Install dependencies
pnpm install

# Install Playwright
pnpm exec playwright install

# Start the development server
pnpm dev

# Run Applitools tests (make sure pnpm dev is running)
pnpm test:applitools

# Run Percy tests (make sure pnpm dev is running)
pnpm test:percy
```
