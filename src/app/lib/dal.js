
  
  export async function getActivities() {
  const response = await fetch("http://localhost:4000/api/v1/activities", { next: { revalidate: 60*60*24 } });
  const data = await response.json();
  console.log(data);
  return data;
  }