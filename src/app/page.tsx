import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dockerLogo from './public/images/docker.png';
import kuberLogo from './public/images/kuber.png';
import terraformLogo from './public/images/terraform.png';
import styles from './styles/NavigationCard.module.css';

const NavigationCard = () => {
  const navItems = [
    {
      title: "Docker Commands",
      description: "Explora todos los comandos de Docker y su documentación",
      href: "/docker-commands",
      imageUrl: dockerLogo
    },
    {
      title: "Kubernetes Commands",
      description: "Explora todos los comandos de Kubernetes y su documentación",
      href: "/kuber-commands",
      imageUrl: kuberLogo
    },
    {
      title: "Terraform Commands",
      description: "Explora todos los comandos de Terraform y su documentación",
      href: "/terraform-commands",
      imageUrl: terraformLogo
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>
          cheatsheet
        </h1>
        
        <div className={styles.cardGrid}>
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={styles.cardLink}
            >
              <div className={styles.card}>
                <div className={styles.cardContent}>
                  <div className={styles.imageWrapper}>
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      width={150}
                      height={150}
                      className={styles.image}
                    />
                  </div>
                  <h2 className={styles.cardTitle}>
                    {item.title}
                  </h2>
                  {/* <p className={styles.cardDescription}>
                    {item.description}
                  </p> */}
                  <div className={styles.exploreButton}>
                    <span>Explorar</span>
                    <svg
                      className={styles.arrow}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavigationCard;