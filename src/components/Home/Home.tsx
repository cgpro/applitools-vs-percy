import { useNavigate } from 'react-router-dom';
import './Home.scss';

export const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'A/B Testing',
      description: 'Compare how both tools handle multiple variants and baselines.',
      path: '/ab-test',
    },
    {
      title: 'Accessibility Testing',
      description: 'See how accessibility issues are detected and reported.',
      path: '/accessibility',
    },
    {
      title: 'Dynamic Content',
      description: 'Learn about handling dynamic and changing content in visual tests.',
      path: '/dynamic-content',
    },
    {
      title: 'Login Form',
      description: 'Explore form testing and various input states.',
      path: '/login-form',
    },
  ];

  return (
    <div className='home'>
      <p className='description'>
        This application demonstrates the differences between Applitools and Percy in various
        testing scenarios. Choose a section from the navigation to explore:
      </p>

      <div className='features'>
        {features.map((feature) => (
          <div
            key={feature.path}
            className='feature-card'
            onClick={() => navigate(feature.path)}
            role='button'
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                navigate(feature.path);
              }
            }}
          >
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
