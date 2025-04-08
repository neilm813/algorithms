/* 
From micro1.ai interviewing platform.

Given:
- a list of movies with properties: title, genre, duration
- maxDuration

Optimize the max amount of movies that can be watched in the maxDuration without the same genre appearing
back-to-back.

If multiple answers are available, favor the one with the shortest total duration of the returned movies list.

Return the movies in a linked list.
*/

/** @typedef {{ duration: number, genre: string, title: string }} Movie */

/**
 * @template NodeData
 * @typedef {Object} LinkedListNode
 * @property {NodeData} data - The data stored in the node.
 * @property {LinkedListNode<NodeData> | null} next - Reference to the next node in the list.
 */

/**
 * @template NodeData
 * @typedef {Object} LinkedList
 * @property {LinkedListNode<NodeData> | null} head - The first node of the linked list.
 * @property {function(NodeData): void} addToBack - Function to insert a new node to the back.
 */

/** @type {Movie[]} */
const movies1 = [
  { title: "Edge of Light", duration: 90, genre: "Sci-Fi" },
  { title: "Hearts Apart", duration: 88, genre: "Romance" },
  { title: "Galaxy Drift", duration: 95, genre: "Sci-Fi" },
  { title: "Love and Letters", duration: 92, genre: "Romance" },
  { title: "Silent Streets", duration: 85, genre: "Thriller" },
  { title: "Mythspire", duration: 86, genre: "Fantasy" },
  { title: "Laugh Track", duration: 80, genre: "Comedy" },
  { title: "Dark Alley", duration: 93, genre: "Thriller" },
  { title: "Funny Bones", duration: 89, genre: "Comedy" },
  { title: "Blade Pulse", duration: 94, genre: "Action" },
  { title: "Steel Rush", duration: 91, genre: "Action" },
  { title: "Winds of Eloria", duration: 90, genre: "Fantasy" },
];
const duration1 = 275;

/**
 * @param {Movie[]} movies
 * @param {number} maxDuration
 * @returns {LinkedList<Movie>} A list of the most movies that can be watched in the maxDuration without the same
 *    genre appearing back-to-back.
 */
function optimizeMovieList(movies = [], maxDuration = 0) {}

/*****************************************************************************/

/**
 * @template NodeData
 */
class LinkedListNode {
  /**
   *
   * @param {NodeData} data
   */
  constructor(data = null) {
    this.data = data;
    this.next = null;
  }
}

/**
 * @template NodeData
 */
class LinkedList {
  constructor() {
    this.head = null;
  }

  /**
   * @param {NodeData} data
   * @returns {this}
   */
  addToBack(data = null) {
    if (!this.head) {
      this.head = new LinkedListNode(data);
      return this;
    }

    let current = this.head;

    while (current.next) {
      current = current.next;
    }

    current.next = new LinkedListNode(data);
    return this;
  }

  toList() {
    const items = [];

    let current = this.head;

    while (current) {
      items.push(current.data);
      current = current.next;
    }

    return items;
  }
}

/**
 * @param {Movie[]} movies
 * @param {number} maxDuration
 * @returns {LinkedList<Movie>} A list of the most movies that can be watched in the maxDuration without the same
 *    genre appearing back-to-back.
 */
function optimizeMovieList(movies = [], maxDuration = 0) {
  const sortedMovies = movies.slice().sort((a, b) => a.duration - b.duration);
  let remainingDuration = maxDuration;
  let lastAddedGenre = null;
  const selectedMovies = new LinkedList();
  // Movies that couldn't be added due to no back-to-back genre requirement but are a priority due to
  // low duration (remove from front for lowest duration).
  const dupeGenreMoviesQueue = new Map();

  for (const movie of sortedMovies) {
    if (dupeGenreMoviesQueue.size) {
      const candidateMovie = dupeGenreMoviesQueue.entries().next().value[1];

      if (
        candidateMovie.genre !== lastAddedGenre &&
        remainingDuration - candidateMovie.duration >= 0
      ) {
        selectedMovies.addToBack(candidateMovie);
        lastAddedGenre = candidateMovie.genre;
        remainingDuration -= candidateMovie.duration;
      }
    }

    const candidateMovie = movie;

    if (candidateMovie.genre === lastAddedGenre) {
      dupeGenreMoviesQueue.set(candidateMovie.title, candidateMovie);
    } else if (remainingDuration - candidateMovie.duration >= 0) {
      selectedMovies.addToBack(candidateMovie);
      lastAddedGenre = candidateMovie.genre;
      remainingDuration -= candidateMovie.duration;
    }

    if (remainingDuration === 0) {
      return selectedMovies;
    }
  }

  return selectedMovies;
}

console.log(optimizeMovieList(movies1, duration1).toList());

/**
 * @param {Movie[]} movies
 * @param {number} maxDuration
 * @returns {LinkedList<Movie>} A list of the most movies that can be watched in the maxDuration without the same
 *    genre appearing back-to-back.
 */
// function optimizeMovieList(movies = [], maxDuration = 0) {
//   // Genre to movies sorted by duration desc per genre.
//   const genreMap = new Map();
//   let lastAddedMovie = null;
//   let remainingDuration = maxDuration;
//   const moviesLinkedList = new LinkedList();

//   for (const movie of movies) {
//     const { genre } = movie;

//     const moviesByGenre = genreMap.get(genre);

//     if (moviesByGenre) {
//       moviesByGenre.push(movie);
//     } else {
//       genreMap.set(genre, [movie]);
//     }
//   }

//   for (const [genre, genreMovies] of genreMap) {
//     genreMovies.sort((a, b) => b.duration - a.duration);
//   }

//   while (true) {
//     let movieToAdd = null;

//   }
// }

module.exports = {
  optimizeMovieList,
};
