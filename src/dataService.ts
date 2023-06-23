export async function fetchData() {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await res.json();
        return data;
    } catch (error) {
        console.log('Error', error);
        throw error;
    }
}

