import React from 'react';
import { ReleaseData } from '../hooks/useReleaseHistory';

interface Props {
  releases: ReleaseData[];
}

const ReleaseTable = ({ releases }: Props): JSX.Element => {
  return (
    <table>
      <thead>
        <tr>
          <td>Version</td>
          <td>LTS</td>
          <td>Date</td>
          <td>V8</td>
          <td>NPM</td>
          <td>ABI</td>
          <td>SHASUM</td>
        </tr>
      </thead>
      <tbody>
        {releases.map(
          ({ version, date, npm, v8, lts }: ReleaseData): JSX.Element => {
            const majorVersion = version.substring(1).split('.')[0];

            return (
              <tr key={version}>
                <td>{version}</td>
                <td>{lts || ''}</td>
                <td>{date}</td>
                <td>{v8}</td>
                <td>{npm}</td>
                <td>ABI?</td>
                <td>
                  <a
                    href={`https://github.com/nodejs/node/blob/master/doc/changelogs/CHANGELOG_V${majorVersion}.md#${version.substring(
                      1
                    )}`}
                  >
                    Changelog
                  </a>
                </td>
                <td>
                  <a href={`https://nodejs.org/download/release/${version}/`}>
                    Download
                  </a>
                </td>
              </tr>
            );
          }
        )}
      </tbody>
    </table>
  );
};

export default ReleaseTable;
