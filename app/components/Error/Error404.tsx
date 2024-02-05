interface Error404Props {
  error: unknown | null;
  errorMessage?: string;
}

const Error404 = ({ error, errorMessage }: Error404Props) => {
  return (
    <div className="flex flex-col items-center">
      <h1>Uh oh ...</h1>
      <img
        src="/images/404-not found.png"
        style={{ width: "400px", height: "400px" }}
        alt="404"
      />
      <p>Something went wrong.</p>
      {error && (error as any).status && (
        <p>Status: {error && (error as any).status}</p>
      )}
      <pre>
        {error && (error as any).data
          ? (error as any).data.message
          : errorMessage}
      </pre>
    </div>

    //     <div>
    //   <h1>Oops</h1>
    //   <p>Status: {error.status}</p>
    //   <p>{error.data.message}</p>
    // </div>
  );
};
export default Error404;
