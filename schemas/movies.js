const z = require("zod")

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: "Movie title must be a string.",
    required_error: "Movie titlle is required",
  }),
  year: z.number().int().positive().min(1900).max(2025),
  director: z.string({
    invalid_type_error: "Movie director must be a string",
    required_error: "Movie director is required",
  }),
  duration: z.number().positive(),
  poster: z.string().url({
    message: "Poster must be a valid URL",
  }),
  rate: z.number().int().positive().min(0).max(10).default(5),
  genre: z.array(z.enum(["Crime", "Drama", "Sci-Fi", "Terror", "Action"])),
})

function validateMovie(object) {
  return movieSchema.safeParse(object)
}

function validatePartialMovie(object) {
  return movieSchema.partial().safeParse(object)
}

module.exports = {
  validateMovie,
  validatePartialMovie,
}
