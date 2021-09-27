import {User} from "./User";

export type Post  = {
  text?: String,
  id?: String,
  owner: User,
  image?: String,
  creationDate: String,
  title?: String,
  upvotes?: number,
  boosted?: boolean,
}
