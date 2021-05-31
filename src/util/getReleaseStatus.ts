import { NodeReleaseVersionData } from '../hooks/useReleaseHistory';

export function getReleaseStatus(release: NodeReleaseVersionData): string {
  const currentDate = new Date();
  const startDate = new Date(release.start);
  const released = startDate <= currentDate;
  if (release.maintenance) {
    const MaintenanceDate = new Date(release.maintenance);
    if (MaintenanceDate < currentDate) return 'Maintenance LTS';
  }
  if (release.lts) {
    const LTSDate = new Date(release.lts);
    if (LTSDate < currentDate) return 'Active LTS';
  }
  if (released) return 'Current';
  return 'Pending';
}
