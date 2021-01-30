import { FC, useEffect, useState } from 'react';
import { ProjectSearchResponse, RavelryProject } from '../../ravelryApi.model';
import styles from './UsersProjects.module.css';

interface Props {
  ravelryTag: string | undefined;
}

export const UsersProjects: FC<Props> = ({ ravelryTag }) => {
  const [ravelryProjects, setRavelryProjects] = useState<RavelryProject[]>([]);

  useEffect(() => {
    if (ravelryTag) {
      fetch(
        `https://api.ravelry.com/projects/search.json?tag-list=${ravelryTag}&page_size=10`,
        {
          method: 'GET',
          mode: 'cors',
          credentials: 'include',
          headers: new Headers({
            Authorization: `Basic ${btoa(
              process.env.REACT_APP_RAVELRY_TOKEN ?? '',
            )}`,
          }),
        },
      )
        .then((response) => response.json())
        .then((data: ProjectSearchResponse) =>
          setRavelryProjects(data.projects),
        );
    }
  }, [ravelryTag]);

  if (ravelryProjects.length === 0) {
    return null;
  }

  return (
    <>
      <h2>User's Projects</h2>
      <p className={styles.hint}>
        To get featured, tag your Ravelry project with "{ravelryTag}".
      </p>
      <div className={styles.projects}>
        {ravelryProjects.map((project) => (
          <div key={project.id} className={styles.project}>
            <p>
              <a
                href={`https://www.ravelry.com/people/${project.user.username}`}
              >
                {project.user.username}
              </a>
              's <a href={project.links.self.href}>{project.name}</a>
            </p>
            <a href={project.links.self.href}>
              <img
                src={project.first_photo.small_url}
                alt={project.first_photo.caption ?? project.name}
              />
            </a>
          </div>
        ))}
      </div>
    </>
  );
};
