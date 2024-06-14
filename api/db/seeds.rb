# Clear existing data
Movie.destroy_all
Actor.destroy_all
Genre.destroy_all

# Create Genres
genres = [
  "Action", "Drama", "Comedy", "Horror", "Sci-Fi", 
  "Thriller", "Romance", "Adventure", "Fantasy", "Mystery"
].map { |name| Genre.create(name: name) }

# Create Actors
actors = [
  "Robert Downey Jr.", "Scarlett Johansson", "Chris Evans", 
  "Chris Hemsworth", "Mark Ruffalo", "Tom Hanks", 
  "Morgan Freeman", "Leonardo DiCaprio", "Jennifer Lawrence", 
  "Emma Stone", "Anne Hathaway", "Denzel Washington",
  "Jamie Lee Curtis", "Anthony Hopkins", "Christian Bale"
].map { |name| Actor.create(name: name) }

# Create Movies
movies = [
  {
    title: "The Avengers",
    release_date: DateTime.new(2012, 5, 4),
    description: "Earth's mightiest heroes must come together and learn to fight as a team...",
    duration: 143,
    genres: [genres[0], genres[8]],
    actors: [actors[0], actors[1], actors[2], actors[3], actors[4]]
  },
  {
    title: "Inception",
    release_date: DateTime.new(2010, 7, 16),
    description: "A thief who steals corporate secrets through the use of dream-sharing technology...",
    duration: 148,
    genres: [genres[4], genres[8]],
    actors: [actors[7], actors[8]]
  },
  {
    title: "Titanic",
    release_date: DateTime.new(1997, 12, 19),
    description: "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard...",
    duration: 195,
    genres: [genres[1], genres[6]],
    actors: [actors[7], actors[9]]
  },
  {
    title: "The Dark Knight",
    release_date: DateTime.new(2008, 7, 18),
    description: "When the menace known as the Joker emerges from his mysterious past...",
    duration: 152,
    genres: [genres[0], genres[1]],
    actors: [actors[10], actors[11]]
  },
  {
    title: "Forrest Gump",
    release_date: DateTime.new(1994, 7, 6),
    description: "The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate...",
    duration: 142,
    genres: [genres[1], genres[6]],
    actors: [actors[5]]
  },
  {
    title: "The Matrix",
    release_date: DateTime.new(1999, 3, 31),
    description: "A computer hacker learns from mysterious rebels about the true nature of his reality...",
    duration: 136,
    genres: [genres[4], genres[8]],
    actors: [actors[0], actors[9]]
  },
  {
    title: "Gladiator",
    release_date: DateTime.new(2000, 5, 5),
    description: "A former Roman General sets out to exact vengeance against the corrupt emperor...",
    duration: 155,
    genres: [genres[0], genres[7]],
    actors: [actors[6], actors[7]]
  },
  {
    title: "The Shawshank Redemption",
    release_date: DateTime.new(1994, 9, 23),
    description: "Two imprisoned men bond over a number of years, finding solace and eventual...",
    duration: 142,
    genres: [genres[1], genres[9]],
    actors: [actors[6], actors[11]]
  },
  {
    title: "Pulp Fiction",
    release_date: DateTime.new(1994, 10, 14),
    description: "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits...",
    duration: 154,
    genres: [genres[0], genres[2]],
    actors: [actors[10], actors[2]]
  },
  {
    title: "Avatar",
    release_date: DateTime.new(2009, 12, 18),
    description: "A paraplegic Marine dispatched to the moon Pandora on a unique mission...",
    duration: 162,
    genres: [genres[4], genres[7]],
    actors: [actors[0], actors[1]]
  },
  {
    title: "Halloween",
    release_date: DateTime.new(1978, 10, 25),
    description: "Fifteen years after murdering his sister on Halloween night, Michael Myers escapes...",
    duration: 91,
    genres: [genres[3], genres[5]],
    actors: [actors[12]]
  },
  {
    title: "The Silence of the Lambs",
    release_date: DateTime.new(1991, 2, 14),
    description: "A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal...",
    duration: 118,
    genres: [genres[3], genres[5]],
    actors: [actors[13], actors[11]]
  },
  {
    title: "American Psycho",
    release_date: DateTime.new(2000, 4, 14),
    description: "A wealthy New York City investment banking executive hides his alternate psychopathic ego...",
    duration: 102,
    genres: [genres[3], genres[5]],
    actors: [actors[14]]
  }
]

# Create movies with associated actors and genres
movies.each do |movie_data|
  movie = Movie.create!(
    title: movie_data[:title],
    release_date: movie_data[:release_date],
    description: movie_data[:description],
    duration: movie_data[:duration]
  )
  movie.genres << movie_data[:genres]
  movie.actors << movie_data[:actors]
end

puts "Seeding done!"
