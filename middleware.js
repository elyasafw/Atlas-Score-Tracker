import z from "zod";

const scoreSchema = z.object({
    playerName: z.string({ message: "Player name must be a text string" }),
    game: z.enum(
        ["snake", "tetrise", "space-invaders"],
        "Invalid game.. select: snake | tetrise | space-invaders",
    ),
    points: z.number({ message: "Points must be a valid number" }).int(),
    level: z
        .number({ message: "Level must be a valid number" })
        .int()
        .optional(),
    duration: z
        .number({ message: "Duration must be a valid number" })
        .int()
        .optional(),
});

function middleSchema(schema) {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            const errorMessages = result.error.flatten().fieldErrors;
            return res.status(400).json({
                error: "Validation failed",
                fields: errorMessages,
            });
        }
        req.body = result.data;
        next();
    };
}

export { middleSchema, scoreSchema };
