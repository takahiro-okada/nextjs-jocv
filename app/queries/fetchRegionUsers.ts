async function fetchRegionUsers(region: string) {
  const res = await fetch(`http://localhost:3000/api/deploymentlocations/${region}/users`, {
    cache: 'no-cache',
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch region users: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export default fetchRegionUsers;
