

export type Post  = {
    owner: String,
    text: String,
    title: String,
    creationDate?: String,
    id: String,
    boosted?: boolean,
    image: String,
    upvotes?: number
}