import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: <>Interactive</>,
    imageUrl: 'img/obi-onyeador-QE0dGP82cLo-unsplash.jpg',
    description: (
      <>
        These are called "workshops" rather than "presentations" because
        they are intended to be interactive.  Participants should be able
        to follow along and reproduce the results.
      </>
    ),
  },
  {
    title: <>Available to All</>,
    imageUrl: 'img/jake-hills-23LET4Hxj_U-unsplash.jpg',
    description: (
      <>
        The workshops were developed to fill skills gaps within our agencies.
        But there is no sensitive information in them; they are available to all.
      </>
    ),
  },
  {
    title: <>Multiple Formats</>,
    imageUrl: 'img/laika-notebooks-l24Db2ApdFM-unsplash.jpg',
    description: (
      <>
        Each workshop is provided as a PDF, as a single web page
        and on this site in a modular format.  Check the links
        in the menu bar for available workshops.
      </>
    ),
  },
];

function Feature({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`${siteConfig.tagline}`}
      description="LA County, ISAB - Workshops Online">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
