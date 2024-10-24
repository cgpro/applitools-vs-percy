import { useState } from 'react';
import './AccessibilityIssues.scss';

interface AccessibilityIssuesProps {
  className?: string;
}

export const AccessibilityIssues = ({ className = '' }: AccessibilityIssuesProps) => {
  const [count, setCount] = useState(0);

  return (
    <div className={`accessibility-issues card ${className}`}>
      <div className='header'>
        <h2>Accessibility Testing Examples</h2>
        <p className='description'>
          This component demonstrates common accessibility issues and their solutions. Applitools
          can detect these issues automatically, while Percy only checks visual differences.
        </p>
      </div>

      <div className='examples'>
        {/* 1. Image Alt Text */}
        <section className='example-card'>
          <h3>1. Image Alt Text</h3>
          <div className='example-content'>
            <div className='bad-example'>
              <h4>❌ Poor Implementation</h4>
              <div className='image-container'>
                <img src='https://picsum.photos/200/100' />
                <code className='code-example'>{`<img src="image.jpg" />`}</code>
                <p className='explanation'>
                  Missing alt text makes images inaccessible to screen readers
                </p>
              </div>
            </div>

            <div className='good-example'>
              <h4>✓ Proper Implementation</h4>
              <div className='image-container'>
                <img
                  src='https://picsum.photos/200/100'
                  alt='A random placeholder image demonstrating proper alt text usage'
                />
                <code className='code-example'>{`<img src="image.jpg" alt="Description of image" />`}</code>
                <p className='explanation'>
                  Descriptive alt text helps screen readers understand the image
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Form Labels */}
        <section className='example-card'>
          <h3>2. Form Labels</h3>
          <div className='example-content'>
            <div className='bad-example'>
              <h4>❌ Poor Implementation</h4>
              <form className='form-example'>
                <input type='text' placeholder='Enter your name' />
                <input type='email' placeholder='Enter your email' />
                <code className='code-example'>{`<input placeholder="Enter your name" />`}</code>
                <p className='explanation'>Relying only on placeholders is not accessible</p>
              </form>
            </div>

            <div className='good-example'>
              <h4>✓ Proper Implementation</h4>
              <form className='form-example'>
                <div className='form-group'>
                  <label htmlFor='name'>Name:</label>
                  <input type='text' id='name' placeholder='Enter your name' />
                </div>
                <div className='form-group'>
                  <label htmlFor='email'>Email:</label>
                  <input type='email' id='email' placeholder='Enter your email' />
                </div>
                <code className='code-example'>{`<label htmlFor="name">Name:</label>\n<input id="name" ... />`}</code>
                <p className='explanation'>Proper labels improve form accessibility</p>
              </form>
            </div>
          </div>
        </section>

        {/* 3. Color Contrast */}
        <section className='example-card'>
          <h3>3. Color Contrast</h3>
          <div className='example-content'>
            <div className='bad-example'>
              <h4>❌ Poor Implementation</h4>
              <div className='contrast-example poor-contrast'>
                This text has poor contrast with its background
                <code className='code-example'>color: #aaa; background: #fff;</code>
                <p className='explanation'>Low contrast ratio makes text hard to read</p>
              </div>
            </div>

            <div className='good-example'>
              <h4>✓ Proper Implementation</h4>
              <div className='contrast-example good-contrast'>
                This text has good contrast with its background
                <code className='code-example'>color: #2c3e50; background: #fff;</code>
                <p className='explanation'>
                  Good contrast ratio (4.5:1 or higher) ensures readability
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Click Targets */}
        <section className='example-card'>
          <h3>4. Click Target Size</h3>
          <div className='example-content'>
            <div className='bad-example'>
              <h4>❌ Poor Implementation</h4>
              <div className='click-target-example'>
                <p>Counter: {count}</p>
                <button
                  className='small-button'
                  onClick={() => setCount((c) => c + 1)}
                  title='Increment (Poor Accessibility)'
                >
                  +
                </button>
                <code className='code-example'>width: 24px; height: 24px;</code>
                <p className='explanation'>Small click targets are hard to interact with</p>
              </div>
            </div>

            <div className='good-example'>
              <h4>✓ Proper Implementation</h4>
              <div className='click-target-example'>
                <p>Counter: {count}</p>
                <button className='accessible-button' onClick={() => setCount((c) => c + 1)}>
                  Increment
                </button>
                <code className='code-example'>min-width: 44px; min-height: 44px;</code>
                <p className='explanation'>
                  Larger click targets (44x44px minimum) are easier to use
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className='testing-notes'>
        <h3>Visual Testing Comparison</h3>
        <div className='comparison-table'>
          <div className='tool'>
            <h4>Applitools:</h4>
            <ul>
              <li>✓ Detects missing alt text</li>
              <li>✓ Validates form labels</li>
              <li>✓ Checks color contrast</li>
              <li>✓ Identifies small click targets</li>
            </ul>
          </div>
          <div className='tool'>
            <h4>Percy:</h4>
            <ul>
              <li>❌ No accessibility checking</li>
              <li>❌ Only visual differences</li>
              <li>❌ No WCAG compliance testing</li>
              <li>❌ No interaction testing</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
