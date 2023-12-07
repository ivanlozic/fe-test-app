import React from 'react';
import styles from './About.module.css';

const About: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>About App Page</h2>
      <p>Welcome to the Pharmacy Products Application!</p>

      <div className={styles.description}>
        <h3>Description</h3>
        <p>
          This application allows you to manage and maintain information about
          pharmacy products. You can easily navigate through the product list,
          add new products, and view detailed information about each product,
          delete product.
        </p>
      </div>

      <div className={styles.creator}>
        <h3>Creator</h3>
        <p>Created by: Ivan Lozic</p>
      </div>

      <div className={styles.technologies}>
        <h3>Technologies Used</h3>
        <p>
          This application is built using modern web technologies:
        </p>
        <ul>
          <li>React: A JavaScript library for building user interfaces.</li>
          <li>
            Vite: A fast build tool that leverages the power of ESBuild for
            bundling.
          </li>
        </ul>
      </div>

      <div className={styles.feedback}>
        <h3>Feedback</h3>
        <p>
          I appreciate your feedback! If you have any suggestions or encounter
          issues while using the application, please reach out to us at{' '}
          <a href="mailto:ivanlozic995@gmail.com">ivanlozic995@gmail.com</a>.
        </p>
      </div>
    </div>
  );
};

export default About;
