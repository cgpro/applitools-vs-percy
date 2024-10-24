import { useState } from 'react';
import './LoginForm.scss';

interface LoginFormProps {
  className?: string;
}

export const LoginForm = ({ className = '' }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simuliere Login-Versuch
    console.log('Login attempt:', formData);
  };

  return (
    <div className={`login-section card ${className}`}>
      <div className='header'>
        <h2>Login Form Testing</h2>
        <p className='description'>
          This component demonstrates how Applitools and Percy handle form testing, including state
          changes, validation, and visual regressions.
        </p>
      </div>

      <div className='examples'>
        {/* 1. Basic Form Layout */}
        <section className='example-card'>
          <h3>1. Form Layout Comparison</h3>
          <div className='example-content'>
            <div className='bad-example'>
              <h4>❌ Poor Implementation</h4>
              <form className='login-form-basic' onSubmit={handleSubmit}>
                <input
                  type='text'
                  placeholder='Username'
                  value={formData.username}
                  onChange={(e) => setFormData((prev) => ({ ...prev, username: e.target.value }))}
                />
                <input
                  type='password'
                  placeholder='Password'
                  value={formData.password}
                  onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                />
                <button type='submit'>Login</button>
                <code className='code-example'>
                  {`// No labels or ARIA attributes\n`}
                  {`<input placeholder="Username" />\n`}
                  {`<input type="password" />`}
                </code>
                <p className='explanation'>Missing labels and accessibility features</p>
              </form>
            </div>

            <div className='good-example'>
              <h4>✓ Proper Implementation</h4>
              <form className='login-form-accessible' onSubmit={handleSubmit}>
                <div className='form-group'>
                  <label htmlFor='username'>Username</label>
                  <input
                    id='username'
                    type='text'
                    aria-label='Username'
                    value={formData.username}
                    onChange={(e) => setFormData((prev) => ({ ...prev, username: e.target.value }))}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='password'>Password</label>
                  <div className='password-input'>
                    <input
                      id='password'
                      type={showPassword ? 'text' : 'password'}
                      aria-label='Password'
                      value={formData.password}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, password: e.target.value }))
                      }
                    />
                    <button
                      type='button'
                      className='toggle-password'
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>
                <button type='submit' className='submit-button'>
                  Login
                </button>
                <code className='code-example'>
                  {`// Proper labels and ARIA attributes\n`}
                  {`<label htmlFor="username">Username</label>\n`}
                  {`<input id="username" aria-label="Username" />`}
                </code>
                <p className='explanation'>Includes proper labeling and accessibility features</p>
              </form>
            </div>
          </div>
        </section>

        {/* 2. Form States */}
        <section className='example-card'>
          <h3>2. Form States</h3>
          <div className='example-content'>
            <div className='states-grid'>
              <div className='state-example'>
                <h4>Empty State</h4>
                <form className='login-form-accessible'>
                  <div className='form-group'>
                    <label>Username</label>
                    <input type='text' disabled value='' />
                  </div>
                  <div className='form-group'>
                    <label>Password</label>
                    <input type='password' disabled value='' />
                  </div>
                  <button type='button' disabled>
                    Login
                  </button>
                </form>
              </div>

              <div className='state-example'>
                <h4>Filled State</h4>
                <form className='login-form-accessible'>
                  <div className='form-group'>
                    <label>Username</label>
                    <input type='text' disabled value='user@example.com' />
                  </div>
                  <div className='form-group'>
                    <label>Password</label>
                    <input type='password' disabled value='password123' />
                  </div>
                  <button type='button' className='active'>
                    Login
                  </button>
                </form>
              </div>

              <div className='state-example'>
                <h4>Error State</h4>
                <form className='login-form-accessible'>
                  <div className='form-group error'>
                    <label>Username</label>
                    <input type='text' disabled value='invalid@email' />
                    <span className='error-message'>Invalid email format</span>
                  </div>
                  <div className='form-group error'>
                    <label>Password</label>
                    <input type='password' disabled value='123' />
                    <span className='error-message'>Password too short</span>
                  </div>
                  <button type='button' disabled>
                    Login
                  </button>
                </form>
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
              <li>✓ Tests all form states automatically</li>
              <li>✓ Validates accessibility features</li>
              <li>✓ Checks form layout consistency</li>
              <li>✓ Validates error states</li>
            </ul>
          </div>
          <div className='tool'>
            <h4>Percy:</h4>
            <ul>
              <li>❌ Manual state testing required</li>
              <li>❌ No accessibility validation</li>
              <li>❌ Basic layout comparison only</li>
              <li>❌ Limited state management</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
