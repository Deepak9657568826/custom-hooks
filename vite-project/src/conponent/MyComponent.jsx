import useFetch from "../hooks/UseEffect";

export const MyComponent = () => {
    const { data, loading, error } = useFetch("https://api.example.com/data");

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

