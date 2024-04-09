export default function MovieDetailsPage({ 
  params,
 }: {
  params: { movieId: string};
 }){

  return (
    <main>
      <h1>dmwaomwdo {params.movieId}</h1>
    </main>
  );
}
