"use client"
import styles from "./page.module.css";

import SplashScreen from "@/components/SplashScreen/SplashScreen";

import { NorXWestLogo } from "@/components/Icons/NorXwestLogo";

import ThreeColumnText from "@/components/ThreeColumnText/ThreeColumnText";
import BioCard from "@/components/BioCard/BioCard";
import { projects } from "@/lib/Content/Content";
import ProjectCard from "@/components/ProjectCard/ProjectCard";
import { Title } from "@/components/Title/Title";
import ServicesList from "@/components/ServicesList/ServicesList";

export default function Home() {
  return (
    <div className={styles.page}>
      <SplashScreen subtitle={`Your Next Digital Solution Starts Here.`} title={"Nor. X West Designs"} Icon={<NorXWestLogo/>} />
      <BioCard />
      <Title>Why Choose My Web Development Services?</Title>
      <ThreeColumnText />
      <Title>My Recent Work:</Title>
      <div className={styles.projectsWrapper}>
        {projects.map((project, key) => {
          return <ProjectCard {...project} key={key} />
        })}
      </div>
      <Title>Have a Web Project in Mind? Choose an option below to begin</Title>
      <ServicesList />
    </div>
  );
}
