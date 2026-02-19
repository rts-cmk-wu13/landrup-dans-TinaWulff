
  
  export async function getActivities() {
  const response = await fetch("http://localhost:4000/api/v1/activities", { next: { revalidate: 60*60*24 } });
  const data = await response.json();
  console.log(data);
  return data;
  }

export async function getActivityDetails(id) {
    try {
    if (!id) {
        throw new Error({ message: "Missing ID parameter" });
    }
    if (!/^\d+$/.test(id)) {
        throw new Error({ message: "Incorrect ID format"})
    }

    const res = await fetch(`http://localhost:4000/api/v1/activities/${id}`);
    if (!res.ok) {
        throw new Error("Failed to fetch the blog post");
    }

    // if (res.status === 404) {
    //     return notFound();
    // }
    
    if (res.status !== 200) {
        throw new Error({ message: res.statusText });
    }

    if (res.headers.get('content-type')?.includes('application/json')) {
        return await res.json();
    } else {
        throw new Error("Unexpected content type");
    }

} catch (error) {
    console.log("getActivityDetails Error", error);
    
    return {
        succes: false,
        message: "something went wrong on the server, try again later"
    }
}
}

export async function getUserDetails(id) {
  const cookieStore = await cookies();
  const accessTokenCookie = cookieStore.get("IPM_AT");

  if (!accessTokenCookie) {
    // Hvis ingen token, redirect til login
      if (!accessTokenCookie) return null
  }
  const response = await fetch(`http://localhost:4000/api/v1/users/${id}`, {
    headers: {
      'Authorization': `Bearer ${accessTokenCookie.value}`
    }
  });

   const data = await response.json();
  console.log("user:", data);
  
   return {
        succes: false,
        message: "something went wrong on the server, try again later"
    }
}

// Bruges ikke:
/* export async function getAllAssets() {
    try {

    const res = await fetch(`http://localhost:4000/api/v1/assets`);
    if (!res.ok) {
        throw new Error("Failed to fetch the blog post");
    }
    
    if (res.status !== 200) {
        throw new Error({ message: res.statusText });
    }

    if (res.headers.get('content-type')?.includes('application/json')) {
        const data = await res.json();
        console.log("getAllAssets data:", data); // Udskriver dataen i terminalen
        return data;
        //return await res.json();
    } else {
        throw new Error("Unexpected content type");
    }

} catch (error) {
    console.log("getAllAssets Error", error);
    
    return {
        succes: false,
        message: "something went wrong on the server, try again later"
    }
}
} */
