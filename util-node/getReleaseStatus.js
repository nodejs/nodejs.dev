function getReleaseStatus(release) {
  const currentDate = new Date();
  const startDate = new Date(release.start);
  const released = startDate <= currentDate;

  if (release.end) {
    const EndOfLifeDate = new Date(release.end);

    if (EndOfLifeDate < currentDate) {
      return 'End-of-life';
    }
  }

  if (release.maintenance) {
    const MaintenanceDate = new Date(release.maintenance);

    if (MaintenanceDate < currentDate) {
      return 'Maintenance LTS';
    }
  }

  if (release.lts) {
    const LTSDate = new Date(release.lts);

    if (LTSDate < currentDate) {
      return 'Active LTS';
    }
  }

  return released ? 'Current' : 'Pending';
}

module.exports = getReleaseStatus;
