import { useState, useEffect } from 'react';
import './ABTest.scss';

interface ABTestProps {
  className?: string;
}

export const ABTest = ({ className = '' }: ABTestProps) => {
  const [variant, setVariant] = useState<'A' | 'B'>('A');

  // Simuliere A/B Test Zuweisung
  useEffect(() => {
    setVariant(Math.random() > 0.5 ? 'A' : 'B');
  }, []);

  return (
    <div className={`ab-test-component card ${className}`}>
      <div className='ab-test-header'>
        <h2>A/B Testing Example</h2>
        <p className='description'>
          This component demonstrates how Applitools handles A/B testing scenarios compared to
          Percy. Applitools can maintain separate baselines for each variant, while Percy requires
          additional setup.
        </p>
      </div>

      <div className='examples'>
        {/* Beispiel für schlechtes A/B Testing */}
        <div className='example-card'>
          <h3>❌ Poor A/B Testing Implementation</h3>
          <div className='variant-container'>
            {variant === 'A' ? (
              <div className='variant variant-a'>
                <h4>Original Design (A)</h4>
                <p>This is the control version with default styling.</p>
                <button className='btn-default'>Click me!</button>
              </div>
            ) : (
              <div className='variant variant-b'>
                <h4>New Design (B)</h4>
                <p>This is the experimental version with updated styling.</p>
                <button className='btn-new'>Try me!</button>
              </div>
            )}
          </div>
          <p className='explanation'>
            Problem: Single baseline causes false positives in visual testing
          </p>
        </div>

        {/* Beispiel für gutes A/B Testing */}
        <div className='example-card'>
          <h3>✓ Proper A/B Testing Implementation</h3>
          <div className='variant-container'>
            <div className='variant variant-a'>
              <h4>Variant A</h4>
              <p>Control version with baseline A</p>
              <button className='btn-default'>Click me!</button>
            </div>
            <div className='variant variant-b'>
              <h4>Variant B</h4>
              <p>Test version with baseline B</p>
              <button className='btn-new'>Try me!</button>
            </div>
          </div>
          <p className='explanation'>Solution: Separate baselines for each variant in Applitools</p>
        </div>
      </div>

      <div className='testing-notes'>
        <h3>Visual Testing Comparison</h3>
        <div className='comparison-table'>
          <div className='tool'>
            <h4>Applitools:</h4>
            <ul>
              <li>✓ Supports multiple baselines</li>
              <li>✓ Automatic variant detection</li>
              <li>✓ No false positives</li>
            </ul>
          </div>
          <div className='tool'>
            <h4>Percy:</h4>
            <ul>
              <li>❌ Single baseline only</li>
              <li>❌ Manual variant handling</li>
              <li>❌ Potential false positives</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
