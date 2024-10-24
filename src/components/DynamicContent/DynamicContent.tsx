import { useState, useEffect } from 'react';
import './DynamicContent.scss';

interface DynamicContentProps {
  className?: string;
}

export const DynamicContent = ({ className = '' }: DynamicContentProps) => {
  const [time, setTime] = useState(new Date());
  const [randomNumber, setRandomNumber] = useState(Math.random());
  const [newsItems, setNewsItems] = useState([
    'Breaking News 1',
    'Latest Update 2',
    'Recent Event 3',
  ]);

  // Simuliere dynamische Updates
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
      setRandomNumber(Math.random());
      setNewsItems((prev) => [
        `New Update ${Math.floor(Math.random() * 100)}`,
        ...prev.slice(0, 2),
      ]);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`dynamic-content card ${className}`}>
      <div className='header'>
        <h2>Dynamic Content Testing</h2>
        <p className='description'>
          This component demonstrates how visual testing tools handle dynamic content. Applitools
          uses AI to intelligently handle dynamic content, while Percy may produce false positives.
        </p>
      </div>

      <div className='examples'>
        {/* 1. Timestamp Example */}
        <section className='example-card'>
          <h3>1. Time-Based Content</h3>
          <div className='example-content'>
            <div className='bad-example'>
              <h4>❌ Without Content Layout Matching</h4>
              <div className='time-display'>
                <p>Current Time: {time.toLocaleTimeString()}</p>
                <code className='code-example'>
                  {`// Percy will flag this as different\n`}
                  {`<p>Current Time: {time.toLocaleTimeString()}</p>`}
                </code>
                <p className='explanation'>Percy will report this as a visual difference</p>
              </div>
            </div>

            <div className='good-example'>
              <h4>✓ With Applitools Layout Matching</h4>
              <div className='time-display'>
                <p>Current Time: {time.toLocaleTimeString()}</p>
                <code className='code-example'>
                  {`// Applitools will ignore time changes\n`}
                  {`eyes.check('Time Display',\n`}
                  {`  Target.region('.time-display').layout()\n`}
                  {`);`}
                </code>
                <p className='explanation'>
                  Applitools ignores content changes while verifying layout
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Random Data Example */}
        <section className='example-card'>
          <h3>2. Random Generated Content</h3>
          <div className='example-content'>
            <div className='bad-example'>
              <h4>❌ Unstable Tests</h4>
              <div className='random-content'>
                <p>Random Value: {randomNumber.toFixed(4)}</p>
                <code className='code-example'>
                  {`// Will cause test flakiness\n`}
                  {`<p>Random Value: {Math.random()}</p>`}
                </code>
                <p className='explanation'>Random values cause inconsistent test results</p>
              </div>
            </div>

            <div className='good-example'>
              <h4>✓ Stable Tests</h4>
              <div className='random-content'>
                <p>Random Value: {randomNumber.toFixed(4)}</p>
                <code className='code-example'>
                  {`// Applitools handles dynamic content\n`}
                  {`eyes.check('Random Content',\n`}
                  {`  Target.region('.random-content')\n`}
                  {`    .layout()\n`}
                  {`);`}
                </code>
                <p className='explanation'>Applitools intelligently handles dynamic content</p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Dynamic List Example */}
        <section className='example-card'>
          <h3>3. Dynamic List Updates</h3>
          <div className='example-content'>
            <div className='bad-example'>
              <h4>❌ Content-Based Testing</h4>
              <div className='news-feed'>
                <ul>
                  {newsItems.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                <code className='code-example'>
                  {`// Percy will flag every content update\n`}
                  {`<ul>\n`}
                  {`  {newsItems.map(item => (\n`}
                  {`    <li>{item}</li>\n`}
                  {`  ))}\n`}
                  {`</ul>`}
                </code>
                <p className='explanation'>Content changes trigger false positives</p>
              </div>
            </div>

            <div className='good-example'>
              <h4>✓ Layout-Based Testing</h4>
              <div className='news-feed'>
                <ul>
                  {newsItems.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                <code className='code-example'>
                  {`// Applitools verifies structure\n`}
                  {`eyes.check('News Feed',\n`}
                  {`  Target.region('.news-feed')\n`}
                  {`    .layout()\n`}
                  {`);`}
                </code>
                <p className='explanation'>Layout remains stable despite content updates</p>
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
              <li>✓ AI-powered dynamic content handling</li>
              <li>✓ Layout-based comparison</li>
              <li>✓ Reduced false positives</li>
              <li>✓ Smart region matching</li>
            </ul>
          </div>
          <div className='tool'>
            <h4>Percy:</h4>
            <ul>
              <li>❌ Pixel-perfect comparison only</li>
              <li>❌ Frequent false positives</li>
              <li>❌ Manual ignore regions needed</li>
              <li>❌ No smart content handling</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
